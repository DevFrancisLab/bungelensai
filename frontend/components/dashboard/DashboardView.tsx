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
  return (
    <div className="transition-transform duration-200 opacity-100 translate-y-0 flex flex-col h-full min-h-0">
      {!hasStarted && (
        <>
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold">Good afternoon <span aria-hidden>👋</span></h2>
            <h3 className="text-2xl md:text-3xl font-semibold mt-2">Ask BungeLens AI</h3>
            <p className="text-muted-foreground mt-1 max-w-2xl">Understand parliamentary discussions and policies in plain language.</p>
            <p className="text-muted-foreground mt-3 max-w-2xl">What would you like to understand today?</p>
          </section>

          {/* Suggestion cards */}
          <section>
            <div className="flex flex-wrap gap-3">
              {[
                'What was discussed about healthcare?',
                "Summarize today's proceedings.",
                'Explain the Finance Bill.',
                'What policies affect young people?'
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setSuggestion(s)}
                  className="bg-accent/5 hover:bg-accent/10 transition-colors rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md"
                  aria-label={`Use suggestion: ${s}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {/* AI conversation area */}
      <section className="space-y-4 flex-1">
        <Card className="transition-shadow duration-150 shadow-lg ring-1 ring-accent/10 min-h-[70vh] max-h-[calc(100vh-6rem)]">
          <div className="flex flex-col h-full min-h-0">
            {/* Header removed to avoid placeholder title/content in chat area */}

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
        </Card>

        {/* Uploads removed from dashboard to focus on assistant.
            Upload functionality remains available via the "Upload Documents" sidebar item. */}
      </section>
    </div>
  )
}
