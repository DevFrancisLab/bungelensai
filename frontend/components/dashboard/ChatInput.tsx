"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState('')

  function submit(e?: React.FormEvent) {
    e?.preventDefault()
    const text = value.trim()
    if (!text) return
    onSend(text)
    setValue('')
  }

  return (
    <form onSubmit={submit} className="sticky bottom-0 bg-background/50 backdrop-blur-sm py-3 px-4 rounded-md">
      <div className="flex gap-3">
        <Input aria-label="Type your message" placeholder="Ask BungeLens about a bill, debate or member..." value={value} onChange={(e) => setValue(e.target.value)} />
        <Button type="submit" className="whitespace-nowrap">Send</Button>
      </div>
    </form>
  )
}
