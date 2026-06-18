"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useGuestModal } from '@/context/guest-context'

type Props = {
  onRequestAuth?: (mode: 'signin' | 'signup') => void
}

export default function GuestBanner({ onRequestAuth }: Props) {
  const { guestActive } = useGuestModal()
  const [dismissed, setDismissed] = useState(false)

  if (!guestActive || dismissed) return null

  return (
    <div className="mb-4 rounded-md border border-border bg-muted/60 p-4 flex items-start justify-between gap-4">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h3 className="font-semibold">Guest Session</h3>
          <span className="text-sm text-muted-foreground">Your conversations won't be saved. Sign in to access chat history and continue conversations across devices.</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => onRequestAuth?.('signin')} aria-haspopup="dialog">Sign In</Button>
        <Button variant="outline" onClick={() => onRequestAuth?.('signup')}>Create Account</Button>
        <button aria-label="Dismiss guest banner" className="text-muted-foreground hover:text-foreground" onClick={() => setDismissed(true)}>✕</button>
      </div>
    </div>
  )
}
