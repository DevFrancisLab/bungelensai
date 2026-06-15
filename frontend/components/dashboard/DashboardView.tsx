"use client"

import React from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import UploadCard from './UploadCard'
import DocumentCard from './DocumentCard'
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
}: {
  messages: Message[]
  containerRef: React.RefObject<HTMLDivElement>
  suggestion?: string
  setSuggestion: (s?: string) => void
  handleSend: (text: string) => void
  documents: Array<{ id: string; name: string; date: string; status: string; topics: string[] }>
  handleFiles: (files: File[]) => void
}) {
  return (
    <div className="transition-transform duration-200 opacity-100 translate-y-0">
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold">Good afternoon <span aria-hidden>👋</span></h2>
        <p className="text-muted-foreground mt-1 max-w-2xl">What would you like to understand today?</p>
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

      {/* AI conversation area */}
      <section className="space-y-4">
        <Card className="transition-shadow duration-150">
          <div className="flex flex-col" style={{ minHeight: 420 }}>
            <div ref={containerRef} className="overflow-auto px-4 py-4 space-y-4" style={{ maxHeight: '56vh' }}>
              {messages.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">Start the conversation by asking about bills, debates, or members.</div>
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

            <div className="border-t px-4 py-3 bg-background/60">
              <ChatInput onSend={handleSend} suggestion={suggestion} />
            </div>
          </div>
        </Card>

        {/* Unified upload panel (UploadCard + documents list) */}
        <UploadPanel documents={documents} handleFiles={handleFiles} />
      </section>
    </div>
  )
}
