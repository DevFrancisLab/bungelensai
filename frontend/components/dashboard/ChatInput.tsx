"use client"

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ChatInput({ onSend, suggestion }: { onSend: (text: string) => void; suggestion?: string }) {
  const [value, setValue] = useState('')
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (suggestion && suggestion !== value) {
      setValue(suggestion)
      // focus the input when a suggestion is selected
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [suggestion])

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
        <Input ref={inputRef} aria-label="Type your message" placeholder="Ask BungeLens about a bill, debate or member..." value={value} onChange={(e) => setValue(e.target.value)} />
        <Button type="submit" className="whitespace-nowrap">Send</Button>
      </div>
    </form>
  )
}
