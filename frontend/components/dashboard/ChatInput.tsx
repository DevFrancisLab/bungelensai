"use client"

import React, { useState, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ChatInput({ onSend, suggestion }: { onSend: (text: string) => void; suggestion?: string }) {
  const [value, setValue] = useState('')
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (suggestion && suggestion !== value) {
      setValue(suggestion)
      // focus the input when a suggestion is selected
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [suggestion])

  function submit(e?: React.FormEvent | KeyboardEvent) {
    e?.preventDefault()
    const text = value.trim()
    if (!text) return
    onSend(text)
    setValue('')
    // return focus to textarea
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends message, Shift+Enter inserts newline
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form onSubmit={submit} className="bg-background/70 backdrop-blur-sm py-3 px-4 rounded-md z-10">
      <div className="flex gap-3 items-end">
        <Textarea
          ref={inputRef}
          aria-label="Type your message"
          placeholder="Ask BungeLens about a bill, debate or member..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 resize-none max-h-48 overflow-auto border-0 px-3 py-2 focus-visible:ring-0"
          rows={2}
        />
        <Button type="submit" className="whitespace-nowrap">Send</Button>
      </div>
    </form>
  )
}
