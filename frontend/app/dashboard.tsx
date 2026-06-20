"use client"

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import MainContent from '@/components/dashboard/MainContent'
import RightPanel from '@/components/dashboard/RightPanel'
import ChatInput from '@/components/dashboard/ChatInput'
import GuestBanner from '@/components/guest-banner'
import { useGuestModal } from '@/context/guest-context'
import { useAuthModal } from '@/context/auth-context'
import { useToast } from '@/hooks/use-toast'

export type SectionKey = 'dashboard' | 'trending' | 'upload' | 'history' | 'settings'

export default function Dashboard() {
  const { preservedConversation, setPreservedConversation, endGuestSession } = useGuestModal()
  const { isAuthenticated, setAuthMode, open } = useAuthModal()
  const { toast } = useToast()

  const [activeSection, setActiveSection] = useState<SectionKey>('dashboard')
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [rightVisible, setRightVisible] = useState<boolean>(true)

  // Conversations state (mock-only). Each conversation stores messages and metadata.
  const [conversations, setConversations] = useState<Array<any>>(() => {
    // sample mock conversations
    const now = Date.now()
    return [
      {
        id: 'c1',
        title: 'Finance Bill summary',
        lastUpdated: new Date(now - 1000 * 60 * 30).toISOString(),
        messages: [
          { id: 'm1', role: 'user', text: 'Summarize the Finance Bill' },
          { id: 'm2', role: 'assistant', aiResponse: { summary: 'The Finance Bill focuses...', keyInsights: ['insight1'], citizenImpact: 'Impact...', tags: ['Finance'] } }
        ],
        topics: ['Finance']
      },
      {
        id: 'c2',
        title: 'Healthcare discussion',
        lastUpdated: new Date(now - 1000 * 60 * 60 * 26).toISOString(),
        messages: [
          { id: 'm3', role: 'user', text: 'What was discussed about healthcare?' },
          { id: 'm4', role: 'assistant', aiResponse: { summary: 'Healthcare debate...', keyInsights: ['insight a'], citizenImpact: 'Impact...', tags: ['Healthcare'] } }
        ],
        topics: ['Healthcare']
      }
    ]
  })

  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [hasStarted, setHasStarted] = useState<boolean>(false)

  // helpers
  function newConversation() {
    const id = 'c-' + Date.now()
    const conv = { id, title: 'New conversation', lastUpdated: new Date().toISOString(), messages: [], topics: [] }
    setConversations((c) => [conv, ...c])
    setCurrentConversationId(id)
    setMessages([])
    setHasStarted(false)
    setActiveSection('dashboard')
  }

  function loadConversation(id: string) {
    const conv = conversations.find((c) => c.id === id)
    if (!conv) return
    setCurrentConversationId(id)
    setMessages(conv.messages || [])
    setHasStarted((conv.messages || []).length > 0)
    setActiveSection('dashboard')
  }

  function saveConversationMeta(id: string, updated: any) {
    setConversations((list) => list.map((c) => (c.id === id ? { ...c, ...updated } : c)))
  }

  // whenever messages change, update the current conversation metadata
  useEffect(() => {
    if (!currentConversationId) return
    saveConversationMeta(currentConversationId, { messages, lastUpdated: new Date().toISOString(), title: messages.find((m) => m.role === 'user')?.text?.slice(0, 60) || 'Conversation' , topics: [] })
  }, [messages, currentConversationId])

  // Ensure we have a conversation id when user starts chatting
  useEffect(() => {
    if (hasStarted && !currentConversationId) {
      // create a new conversation and attach current messages
      const id = 'c-' + Date.now()
      const conv = { id, title: messages.find((m: any) => m.role === 'user')?.text?.slice(0,60) || 'Conversation', lastUpdated: new Date().toISOString(), messages: messages || [], topics: [] }
      setConversations((c) => [conv, ...c])
      setCurrentConversationId(id)
    }
  }, [hasStarted, currentConversationId, messages])

  // Prevent the browser window from scrolling while dashboard is mounted.
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [])

  // When the user authenticates (mock), restore any preserved conversation saved before auth
  useEffect(() => {
    if (!isAuthenticated) return
    if (!preservedConversation) return

    const preserved = preservedConversation
    const newId = preserved.id ?? 'c-' + Date.now()
    const conv = {
      id: newId,
      title:
        preserved.title || preserved.messages?.find((m: any) => m.role === 'user')?.text?.slice(0, 60) || 'Conversation',
      lastUpdated: new Date().toISOString(),
      messages: preserved.messages || [],
      topics: [] as string[],
    }

    setConversations((c) => [conv, ...c])
    setCurrentConversationId(newId)
    setMessages(conv.messages)
    // clear preserved conversation and end guest mode
    setPreservedConversation(null)
    try { endGuestSession() } catch (e) { }

    try {
      toast({ title: 'Your conversation is now associated with your account.' })
    } catch (e) { }
  }, [isAuthenticated, preservedConversation, setPreservedConversation, endGuestSession, toast])

  return (
    <main className="h-screen bg-background text-foreground overflow-hidden">
      <section className="max-w-7xl mx-auto px-6 py-6 h-full">
        {/* Guest banner (shown for temporary guest sessions) */}
        <GuestBanner onRequestAuth={(mode) => {
          // preserve the current conversation/messages in guest context before opening auth
          setPreservedConversation({ id: currentConversationId ?? undefined, title: conversations.find(c => c.id === currentConversationId)?.title || undefined, messages: messages })
          try {
            setAuthMode(mode)
            open()
          } catch (e) {
            // no-op
          }
        }} />

        {/* If user completes mock auth and there is a preserved conversation, restore it */}
        {/* Restoration runs in an effect below */}

        <div className="flex flex-col lg:flex-row gap-8 h-full transition-all duration-200 ease-in-out">
          {/* compute responsive column spans */}
          {/**
           * sidebarSpan: 2 when collapsed, otherwise 3
           * rightSpan: 0 when hidden, otherwise 2 when collapsed or 3 when expanded
           * mainSpan: remaining columns
           */}
          {(() => {
            const sidebarSpan = collapsed ? 2 : 3
            const rightSpan = rightVisible ? (collapsed ? 2 : 3) : 0
            const mainSpan = 12 - sidebarSpan - rightSpan

            // map spans to literal class names so Tailwind sees them
            const sidebarClass = collapsed ? 'lg:col-span-2' : 'lg:col-span-3'
            const rightClass = rightVisible ? (collapsed ? 'lg:col-span-2' : 'lg:col-span-3') : ''
            // main span depends on both collapsed and rightVisible
            const mainClass = collapsed
              ? rightVisible
                ? 'lg:col-span-8' // sidebar 2 + right 2
                : 'lg:col-span-10' // sidebar 2 + right 0
              : rightVisible
              ? 'lg:col-span-6' // sidebar 3 + right 3
              : 'lg:col-span-9' // sidebar 3 + right 0

            return (
              <>
                {/* Left sidebar */}
                <div className={`shrink-0 transition-all duration-200 ease-in-out ${collapsed ? 'w-18' : 'w-60'}`}>
                  <Sidebar activeSection={activeSection} onSelect={setActiveSection} collapsed={collapsed} setCollapsed={setCollapsed} onNewConversation={newConversation} />
                </div>

                {/* Main content area (primary) */}
                <div className={`flex-1 min-h-0`}>
                  <MainContent
                    activeSection={activeSection}
                    messages={messages}
                    setMessages={setMessages}
                    hasStarted={hasStarted}
                    setHasStarted={setHasStarted}
                    conversations={conversations}
                    onOpenConversation={(id: string) => loadConversation(id)}
                    onNewConversation={() => newConversation()}
                  />
                </div>

                {/* Right insights panel (render only on large screens) */}
                {rightVisible && activeSection !== 'dashboard' && (
                  <div className="hidden lg:block shrink-0 w-72 transition-all duration-200 ease-in-out">
                    <RightPanel activeSection={activeSection} onClose={() => setRightVisible(false)} />
                  </div>
                )}
              </>
            )
          })()}
        </div>
      </section>
      {/* Fixed chat input for dashboard — dispatches a global event handled by MainContent */}
      {activeSection === 'dashboard' && hasStarted ? (
        <div className="fixed left-0 right-0 bottom-4 z-40 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mx-auto">
              <ChatInput onSend={(text: string) => {
                try {
                  window.dispatchEvent(new CustomEvent('dashboard-send', { detail: { text } }))
                } catch (e) {
                  // fallback: nothing
                }
              }} />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
