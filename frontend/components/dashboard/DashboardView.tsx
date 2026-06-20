"use client"

import React from 'react'
import ChatMessage from './ChatMessage'
import { Card } from '@/components/ui/card'
import ChatInput from './ChatInput'
import { Textarea } from '@/components/ui/textarea'

type Message =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'assistant'; typing?: boolean; aiResponse?: { summary: string; keyInsights: string[]; citizenImpact: string; tags: string[] } }

export default function DashboardView({
  messages,
  containerRef,
  suggestion,
  setSuggestion,
  handleSend,
  documents,
  handleFiles,
  hasStarted,
}: {
  messages: Message[]
  containerRef: React.RefObject<HTMLDivElement>
  suggestion?: string
  setSuggestion: (s?: string) => void
  handleSend: (text: string) => void
  documents: Array<{ id: string; name: string; date: string; status: string; topics: string[] }>
  handleFiles: (files: File[]) => void
  hasStarted?: boolean
}) {
  // Landing state input local state
  const [landingValue, setLandingValue] = React.useState('')
  const landingRef = React.useRef<HTMLTextAreaElement | null>(null)

  function submitLanding(e?: React.FormEvent) {
    e?.preventDefault()
    const text = landingValue.trim()
    if (!text) return
    handleSend(text)
    setLandingValue('')
    setTimeout(() => landingRef.current?.focus(), 0)
  }

  function onLandingKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submitLanding()
    }
  }

  return (
    <div className="transition-transform duration-200 opacity-100 translate-y-0 flex flex-col h-full min-h-0">
      {!hasStarted ? (
        <div className="h-full flex flex-col items-center justify-center px-6">
          <h1 className="text-3xl md:text-4xl font-semibold">Ask BungeLens AI</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-center">Understand parliamentary debates, bills and policies in plain language.</p>

          <form onSubmit={submitLanding} className="w-full max-w-2xl mt-8">
            <div className="flex items-center gap-3 bg-background/70 border border-border rounded-full px-4 py-3 shadow-sm">
              <Textarea
                ref={landingRef}
                aria-label="Ask BungeLens"
                placeholder="Ask about a bill, debate or policy..."
                value={landingValue}
                onChange={(e) => setLandingValue(e.target.value)}
                onKeyDown={onLandingKeyDown}
                className="bg-transparent flex-1 text-lg resize-none max-h-48 overflow-auto border-0 px-3 py-2 focus-visible:ring-0"
                rows={2}
              />
              <button type="submit" className="ml-2 bg-primary text-primary-foreground px-4 py-2 rounded-full">Ask</button>
            </div>

            {/* Landing suggestions removed per UX update */}
          </form>
        </div>
      ) : (
        // Conversational workspace: make the scroll container wrap both messages and the input
        // so the input can be sticky relative to that container instead of the viewport.
        <div className="flex flex-col flex-1 min-h-0">
          <div ref={containerRef} className="relative flex-1 overflow-auto px-6 pt-6 pb-6">
            <div className="space-y-6 pb-24">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">Start the conversation by asking about bills, debates, or members.</div>
              ) : (
                messages.map((m) =>
                  m.role === 'user' ? (
                    <ChatMessage key={m.id} role="user" text={m.text} />
                  ) : (
                    <ChatMessage
                      key={m.id}
                      role="assistant"
                      typing={m.typing}
                      aiResponse={m.aiResponse}
                    />
                  ),
                )
              )}
            </div>

            {/* Chat input rendered inside the same scroll container. Sticky will now be
                relative to `containerRef` (the scrollable element) instead of the viewport. */}
            <div className="sticky bottom-0 left-0 right-0 px-6 pb-6 pt-2 pointer-events-auto z-40 bg-transparent">
              <ChatInput onSend={(text: string) => handleSend(text)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
