"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import MainContent from '@/components/dashboard/MainContent'
import RightPanel from '@/components/dashboard/RightPanel'
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
  const mainRef = React.useRef<HTMLDivElement | null>(null)

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

  const handleRequestAuth = useCallback((mode: 'signin' | 'signup') => {
    setPreservedConversation({ id: currentConversationId ?? undefined, title: conversations.find(c => c.id === currentConversationId)?.title || undefined, messages: messages })
    try {
      setAuthMode(mode)
      open()
    } catch (e) {
      // no-op
    }
  }, [currentConversationId, conversations, messages, setPreservedConversation, setAuthMode, open])
  // helpers
  const newConversation = useCallback(() => {
    const id = 'c-' + Date.now()
    const conv = { id, title: 'New conversation', lastUpdated: new Date().toISOString(), messages: [], topics: [] }
    setConversations((c) => [conv, ...c])
    // group state updates logically; React will batch these in event handlers
    setCurrentConversationId(id)
    setMessages([])
    setHasStarted(false)
    setActiveSection('dashboard')
  }, [setConversations, setCurrentConversationId, setMessages, setHasStarted, setActiveSection])

  const loadConversation = useCallback((id: string) => {
    const conv = conversations.find((c) => c.id === id)
    if (!conv) return
    setCurrentConversationId(id)
    setMessages(conv.messages || [])
    setHasStarted((conv.messages || []).length > 0)
    setActiveSection('dashboard')
  }, [conversations, setCurrentConversationId, setMessages, setHasStarted, setActiveSection])

  const saveConversationMeta = useCallback((id: string, updated: any) => {
    setConversations((list) => list.map((c) => (c.id === id ? { ...c, ...updated } : c)))
  }, [setConversations])

  // whenever messages change, update the current conversation metadata
  useEffect(() => {
    if (!currentConversationId) return
    // compute title once to avoid creating a new object every render
    const title = messages.find((m) => (m as any).role === 'user')?.text?.slice(0, 60) || 'Conversation'
    saveConversationMeta(currentConversationId, { messages, lastUpdated: new Date().toISOString(), title, topics: [] })
  }, [messages, currentConversationId, saveConversationMeta])

  // Ensure we have a conversation id when user starts chatting
  useEffect(() => {
    if (hasStarted && !currentConversationId) {
      // create a new conversation and attach current messages
      const id = 'c-' + Date.now()
      const conv = { id, title: messages.find((m: any) => (m as any).role === 'user')?.text?.slice(0,60) || 'Conversation', lastUpdated: new Date().toISOString(), messages: messages || [], topics: [] }
      setConversations((c) => [conv, ...c])
      setCurrentConversationId(id)
    }
    // intentionally only depending on hasStarted, currentConversationId and messages length
  }, [hasStarted, currentConversationId, messages.length])

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
        preserved.title || preserved.messages?.find((m: any) => (m as any).role === 'user')?.text?.slice(0, 60) || 'Conversation',
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

  // No portal: ChatInput is rendered inside the dashboard layout (DashboardView)

  return (
    <main className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <section className="max-w-7xl mx-auto px-6 py-6 flex-1 min-h-0">
        {/* Guest banner (shown for temporary guest sessions) */}
        <GuestBanner onRequestAuth={handleRequestAuth} />

        {/* If user completes mock auth and there is a preserved conversation, restore it */}
        {/* Restoration runs in an effect below */}

        <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0 transition-all duration-200 ease-in-out">
          {/* compute responsive column spans */}
          {/**
           * sidebarSpan: 2 when collapsed, otherwise 3
           * rightSpan: 0 when hidden, otherwise 2 when collapsed or 3 when expanded
           * mainSpan: remaining columns
           */}
          {useMemo(() => {
            const sidebar = (
              <div className={`shrink-0 transition-all duration-200 ease-in-out ${collapsed ? 'w-18' : 'w-60'}`}>
                <Sidebar activeSection={activeSection} onSelect={setActiveSection} collapsed={collapsed} setCollapsed={setCollapsed} onNewConversation={newConversation} />
              </div>
            )

            const main = (
              <div ref={mainRef} className={`flex-1 min-h-0`}>
                <MainContent
                  activeSection={activeSection}
                  messages={messages}
                  setMessages={setMessages}
                  hasStarted={hasStarted}
                  setHasStarted={setHasStarted}
                  conversations={conversations}
                  onOpenConversation={loadConversation}
                  onNewConversation={newConversation}
                />
              </div>
            )

            const right = rightVisible && activeSection !== 'dashboard' ? (
              <div className="hidden lg:block shrink-0 w-72 transition-all duration-200 ease-in-out">
                <RightPanel activeSection={activeSection} onClose={() => setRightVisible(false)} />
              </div>
            ) : null

            return (
              <>
                {sidebar}
                {main}
                {right}
              </>
            )
          // depend on the minimal set of values that cause re-renders
          }, [collapsed, activeSection, newConversation, setActiveSection, setCollapsed, messages, setMessages, hasStarted, setHasStarted, conversations, loadConversation, rightVisible])}
        </div>
      </section>
      {/* ChatInput is rendered inside `DashboardView` so no portal is needed. */}
    </main>
  )
}
