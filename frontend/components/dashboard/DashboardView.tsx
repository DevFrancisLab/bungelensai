"use client"

import React from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { Card } from '@/components/ui/card'

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

  function submitLanding(e?: React.FormEvent) {
    e?.preventDefault()
    const text = landingValue.trim()
    if (!text) return
    handleSend(text)
    setLandingValue('')
  }

  return (
    <div className="transition-transform duration-200 opacity-100 translate-y-0 flex flex-col h-full min-h-0">
      {!hasStarted ? (
        <div className="h-full flex flex-col items-center justify-center px-6">
          <h1 className="text-3xl md:text-4xl font-semibold">Ask BungeLens AI</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-center">Understand parliamentary debates, bills and policies in plain language.</p>

          <form onSubmit={submitLanding} className="w-full max-w-2xl mt-8">
            <div className="flex items-center gap-3 bg-background/70 border border-border rounded-full px-4 py-4 shadow-sm">
              <input
                aria-label="Ask BungeLens"
                placeholder="Ask about a bill, debate or policy..."
                value={landingValue}
                onChange={(e) => setLandingValue(e.target.value)}
                className="bg-transparent flex-1 outline-none text-lg"
              />
              <button type="submit" className="ml-2 bg-primary text-primary-foreground px-4 py-2 rounded-full">Ask</button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Explain the Finance Bill',
                "Summarize today's proceedings",
                'What was discussed about healthcare?',
                'Show recent education debates',
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="w-full text-left rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors px-4 py-3 text-sm font-medium"
                >
                  {s}
                </button>
              ))}
            </div>
          </form>
        </div>
      ) : (
        // Conversational workspace
        <div className="flex flex-col h-full min-h-[70vh]">
          <div ref={containerRef} className="flex-1 min-h-0 overflow-auto px-6 py-6 space-y-6">
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

          <div className="border-t px-6 py-4 bg-background/60">
            <ChatInput onSend={handleSend} suggestion={suggestion} />
          </div>
        </div>
      )}
    </div>
  )
}
