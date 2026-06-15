"use client"

import React, { useState, useRef, useEffect } from 'react'
import TrendingTopicsView from './TrendingTopicsView'
import SavedInsightsView from './SavedInsightsView'
import SettingsView from './SettingsView'
import DashboardView from './DashboardView'
import UploadDocumentsView from './UploadDocumentsView'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import UploadCard from './UploadCard'
import DocumentCard from './DocumentCard'
import { Spinner } from '@/components/ui/spinner'
import { Card } from '@/components/ui/card'

type Message =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'assistant'; typing?: boolean; aiResponse?: { summary: string; keyInsights: string[]; citizenImpact: string; tags: string[] } }

const initialMessages: Message[] = []

type SectionKey = 'dashboard' | 'trending' | 'upload' | 'saved' | 'settings'

export default function MainContent({ activeSection = 'dashboard' }: { activeSection?: SectionKey }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [suggestion, setSuggestion] = useState<string | undefined>(undefined)
  const [started, setStarted] = useState<boolean>(false)
  const [documents, setDocuments] = useState<Array<{ id: string; name: string; date: string; status: string; topics: string[] }>>([])
  const [viewVisible, setViewVisible] = useState(true)

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
    // mark conversation as started when user sends their first message
    setStarted(true)
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

  // Small entrance animation when switching sections
  useEffect(() => {
    setViewVisible(false)
    const t = setTimeout(() => setViewVisible(true), 20)
    return () => clearTimeout(t)
  }, [activeSection])


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
    <div className="relative h-full overflow-hidden min-h-0">
      {/* Dashboard (assistant) */}
      <div className={
        `absolute inset-0 h-full transition-all duration-250 ease-in-out transform ${activeSection === 'dashboard' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 -translate-y-2 pointer-events-none z-0'}`
      } aria-hidden={activeSection !== 'dashboard'}>
          <DashboardView
          messages={messages}
          containerRef={containerRef}
          suggestion={suggestion}
          setSuggestion={(s) => {
            setSuggestion(s)
            if (s) setStarted(true)
          }}
          handleSend={handleSend}
          documents={documents}
          handleFiles={handleFiles}
          hasStarted={started}
        />
      </div>

      {/* Trending */}
      <div className={
        `absolute inset-0 h-full transition-all duration-250 ease-in-out transform ${activeSection === 'trending' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 -translate-y-2 pointer-events-none z-0'}`
      } aria-hidden={activeSection !== 'trending'}>
        <TrendingTopicsView />
      </div>

      {/* Upload */}
      <div className={
        `absolute inset-0 h-full transition-all duration-250 ease-in-out transform ${activeSection === 'upload' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 -translate-y-2 pointer-events-none z-0'}`
      } aria-hidden={activeSection !== 'upload'}>
        <UploadDocumentsView documents={documents} handleFiles={handleFiles} />
      </div>

      {/* Saved */}
      <div className={
        `absolute inset-0 h-full transition-all duration-250 ease-in-out transform ${activeSection === 'saved' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 -translate-y-2 pointer-events-none z-0'}`
      } aria-hidden={activeSection !== 'saved'}>
        <SavedInsightsView />
      </div>

      {/* Settings */}
      <div className={
        `absolute inset-0 h-full transition-all duration-250 ease-in-out transform ${activeSection === 'settings' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 -translate-y-2 pointer-events-none z-0'}`
      } aria-hidden={activeSection !== 'settings'}>
        <SettingsView />
      </div>
    </div>
  )
}
