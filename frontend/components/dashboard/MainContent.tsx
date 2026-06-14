"use client"

import React, { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { Card } from '@/components/ui/card'

type Message =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'assistant'; aiResponse: { summary: string; keyInsights: string[]; citizenImpact: string; tags: string[] } }

const initialMessages: Message[] = [
  {
    id: 'm1',
    role: 'user',
    text: 'Can you summarise the Education Bill passed last week and how it affects school funding?'
  },
  {
    id: 'm2',
    role: 'assistant',
    aiResponse: {
      summary:
        'The Education Bill increases baseline school funding by 6% and introduces a targeted grant for rural schools to address resource gaps.',
      keyInsights: [
        'Baseline funding rise of 6% across public schools.',
        'Targeted rural grant for infrastructure and teacher training.',
        'Accountability measures require quarterly reporting from districts.'
      ],
      citizenImpact:
        'Families in rural constituencies should see improved classroom resources and teacher support within the next academic year; urban schools will receive incremental funding increases.',
      tags: ['Education', 'Budget', 'Rural']
    }
  }
]

export default function MainContent() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  function handleSend(text: string) {
    const userMessage: Message = { id: String(Date.now()), role: 'user', text }
    setMessages((m) => [...m, userMessage])

    // simulate AI response using mock parliamentary data
    setTimeout(() => {
      const aiResp: Message = {
        id: String(Date.now() + 1),
        role: 'assistant',
        aiResponse: {
          summary: 'The bill includes a 6% funding uplift with a targeted rural grant and stricter reporting requirements.',
          keyInsights: [
            '6% uplift to baseline allocation',
            'New rural grant targets infrastructure and training',
            'Quarterly reporting increases district accountability'
          ],
          citizenImpact:
            'Expect improved resource allocation in rural schools; monitoring will track progress and disbursement over the next 12 months.',
          tags: ['Education', 'Policy', 'Funding']
        }
      }

      setMessages((m) => [...m, aiResp])
    }, 700)
  }

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold">Good afternoon <span aria-hidden>👋</span></h2>
        <p className="text-muted-foreground mt-1">What would you like to understand today?</p>
      </section>

      <section>
        <Card>
          <div className="flex flex-col" style={{ minHeight: 420 }}>
            <div ref={containerRef} className="overflow-auto px-4 py-4 space-y-4" style={{ maxHeight: '56vh' }}>
              {messages.map((m) =>
                m.role === 'user' ? (
                  <ChatMessage key={m.id} role="user" text={m.text} />
                ) : (
                  <ChatMessage
                    key={m.id}
                    role="assistant"
                    aiResponse={m.aiResponse}
                  />
                ),
              )}
            </div>

            <div className="border-t px-4 py-3 bg-background/60">
              <ChatInput onSend={handleSend} />
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
