"use client"

import React, { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import UploadCard from './UploadCard'
import DocumentCard from './DocumentCard'
import { Spinner } from '@/components/ui/spinner'
import { Card } from '@/components/ui/card'

type Message =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'assistant'; typing?: boolean; aiResponse?: { summary: string; keyInsights: string[]; citizenImpact: string; tags: string[] } }

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
  const [suggestion, setSuggestion] = useState<string | undefined>(undefined)
  const [documents, setDocuments] = useState<Array<{ id: string; name: string; date: string; status: string; topics: string[] }>>([])

  function handleFiles(files: File[]) {
    // Add each file to documents with status 'Uploaded' then simulate processing and analysis
    files.forEach((file) => {
      const id = String(Date.now()) + '-' + file.name
      const doc = { id, name: file.name, date: new Date().toLocaleString(), status: 'Uploaded', topics: [] }
      setDocuments((d) => [doc, ...d])

      // simulate processing
      setTimeout(() => {
        setDocuments((d) => d.map((x) => x.id === id ? { ...x, status: 'Processing' } : x))

        // simulate AI analysis
        setTimeout(() => {
          const topics = ['Education', 'Budget', 'Healthcare'].slice(0, Math.max(1, Math.floor(Math.random() * 3)))
          setDocuments((d) => d.map((x) => x.id === id ? { ...x, status: 'Complete', topics } : x))
        }, 1200)
      }, 600)
    })
  }

  useEffect(() => {
    const el = containerRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  function handleSend(text: string) {
    const userMessage: Message = { id: String(Date.now()), role: 'user', text }
    setMessages((m) => [...m, userMessage])
    // append a typing indicator message
    const typingId = 'typing-' + Date.now()
    const typingMessage: Message = { id: typingId, role: 'assistant', typing: true }
    setMessages((m) => [...m, typingMessage])

    // generate a realistic, keyword-based mock response
    const query = text.toLowerCase()
    const responseDelay = 700 + Math.floor(Math.random() * 800)

    setTimeout(() => {
      const aiResponse = generateMockResponse(query)

      // replace typing message with actual response
      setMessages((m) => m.map((msg) => (msg.id === typingId ? { id: String(Date.now()), role: 'assistant', aiResponse } : msg)))
    }, responseDelay)
  }


  function generateMockResponse(query: string) {
    // Default fallback
    const fallback = {
      summary: 'Summary: Key points and outcomes summarized from parliamentary records.',
      keyInsights: [
        'High-level overview of the debated measures',
        'Stakeholder positions highlighted',
        'Implementation timelines outlined by ministries'
      ],
      citizenImpact: 'Citizens can expect clearer timelines and targeted support measures where applicable.',
      tags: ['Parliament', 'Policy']
    }

    if (/health|healthcare|hospital|medical/.test(query)) {
      return {
        summary: 'The healthcare policy discussion focused on funding models and phased rollout of universal coverage.',
        keyInsights: [
          'Proposed funding through reallocation of existing health budgets',
          'Pilot rollout planned in three regions first',
          'Emphasis on primary care and workforce training'
        ],
        citizenImpact: 'Improved access to primary care for underserved regions within 12–24 months; monitoring to follow.',
        tags: ['Healthcare', 'Policy', 'Access']
      }
    }

    if (/finance|budget|tax|revenue|fiscal/.test(query)) {
      return {
        summary: 'The Finance Bill proposes targeted tax changes and reallocations to support social programs.',
        keyInsights: [
          'Adjustments to tax brackets to increase revenue',
          'New allocations for social safety nets',
          'Measures to improve transparency of spending'
        ],
        citizenImpact: 'Some households may see marginal tax changes; social programs receive additional funding.',
        tags: ['Finance', 'Budget', 'Tax']
      }
    }

    if (/education|schools|students|universit/.test(query)) {
      return {
        summary: 'Education reforms emphasize increased baseline funding and targeted rural grants.',
        keyInsights: [
          '6% baseline funding increase proposed',
          'Targeted grants for rural infrastructure and teacher training',
          'New reporting for accountability at district level'
        ],
        citizenImpact: 'Rural students should experience gradual improvements in resources and teacher support.',
        tags: ['Education', 'Funding', 'Rural']
      }
    }

    if (/youth|young people|youth initiative|youth programs/.test(query)) {
      return {
        summary: 'Youth initiatives under discussion include employment programs and skills training.',
        keyInsights: [
          'Funding earmarked for youth employment schemes',
          'Vocational training partnerships proposed',
          'Monitoring frameworks for program outcomes'
        ],
        citizenImpact: 'Young people may gain access to new training and employment programs in pilot regions.',
        tags: ['Youth', 'Employment', 'Skills']
      }
    }

    return fallback
  }

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold">Good afternoon <span aria-hidden>👋</span></h2>
        <p className="text-muted-foreground mt-1">What would you like to understand today?</p>
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

      <section className="space-y-4">
        <UploadCard onFiles={handleFiles} />

        <div className="grid grid-cols-1 gap-3">
          {documents.length === 0 ? null : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}

        </div>

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
              <ChatInput onSend={handleSend} suggestion={suggestion} />
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
