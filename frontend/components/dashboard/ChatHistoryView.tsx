"use client"

import React, { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function formatTime(iso: string) {
  try { return new Date(iso).toLocaleString() } catch(e) { return iso }
}

export default function ChatHistoryView({ conversations = [], onOpen }: { conversations?: any[], onOpen?: (id: string) => void }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query) return conversations
    return conversations.filter((c: any) => (c.title || '').toLowerCase().includes(query.toLowerCase()) || (c.topics || []).some((t: string) => t.toLowerCase().includes(query.toLowerCase())))
  }, [conversations, query])

  // group by date
  const groups = useMemo(() => {
    const now = new Date()
    const today = [] as any[]
    const yesterday = [] as any[]
    const last7 = [] as any[]
    const older = [] as any[]

    filtered.forEach((c: any) => {
      const d = c.lastUpdated ? new Date(c.lastUpdated) : new Date()
      const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 *24)
      if (d.toDateString() === now.toDateString()) today.push(c)
      else if (diff < 2) yesterday.push(c)
      else if (diff <= 7) last7.push(c)
      else older.push(c)
    })

    return { today, yesterday, last7, older }
  }, [filtered])

  function renderList(list: any[]) {
    if (!list || list.length === 0) return null
    return (
      <div className="space-y-3">
        {list.map((c) => (
          <Card key={c.id} className="hover:shadow-lg transition-shadow duration-150 cursor-pointer" onClick={() => onOpen && onOpen(c.id)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{c.messages?.length ?? 0} messages • {formatTime(c.lastUpdated)}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    {(c.topics || []).slice(0,3).map((t: string) => (<Badge key={t} variant="outline">{t}</Badge>))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">Chat History</h2>
        <div className="text-sm text-muted-foreground">Your recent AI conversations</div>
      </div>

      <div className="flex gap-3 items-center">
        <input aria-label="Search conversations" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search chats or topics..." className="flex-1 bg-background border border-border rounded-md px-3 py-2" />
      </div>

      <div className="space-y-6">
        {renderList(groups.today)}
        {renderList(groups.yesterday)}
        {renderList(groups.last7)}
        {renderList(groups.older)}
      </div>
    </section>
  )
}
