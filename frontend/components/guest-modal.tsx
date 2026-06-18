"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useGuestModal } from '@/context/guest-context'
import { useAuthModal } from '@/context/auth-context'
import { Badge } from '@/components/ui/badge'

export default function GuestModal() {
  const { isOpen, close, startGuestSession } = useGuestModal()
  const { open: openAuth, setAuthMode } = useAuthModal()
  const [loading, setLoading] = useState(false)

  function navigateToDashboard() {
    try {
      window.history.pushState({}, '', '/dashboard')
      window.dispatchEvent(new PopStateEvent('popstate'))
    } catch (e) {
      window.location.href = '/dashboard'
    }
  }

  async function handleGuestContinue() {
    if (loading) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 300))
    setLoading(false)
    // initialize a temporary guest session in frontend state
    startGuestSession()
    close()
    navigateToDashboard()
  }

  function openAuthMode(mode: 'signin' | 'signup') {
    // close guest modal, set the desired auth mode, then open auth modal
    close()
    try { setAuthMode(mode) } catch (e) { /* ignore */ }
    openAuth()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close() }}>
      <DialogContent aria-labelledby="guest-dialog-title" aria-describedby="guest-dialog-desc" className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle id="guest-dialog-title" className="text-2xl md:text-3xl">Try BungeLens AI</DialogTitle>
          <DialogDescription id="guest-dialog-desc">
            Start asking questions about Parliament immediately. Guest conversations are temporary and will not be saved.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="rounded-md border border-border p-3 bg-yellow-50">
            <div className="flex items-start gap-3">
              <div className="text-yellow-700">⚠️</div>
              <div className="text-sm text-foreground">
                Guest sessions do not save: <span className="font-medium">Chat history</span>, <span className="font-medium">Uploaded documents</span>, <span className="font-medium">Personalized preferences</span>. Sign in for a persistent experience.
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <Button onClick={handleGuestContinue} className="w-full" aria-label="Continue as guest" disabled={loading}>
              {loading ? 'Starting…' : 'Continue as Guest'}
            </Button>

            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1" onClick={() => openAuthMode('signin')}>Sign In</Button>
              <Button variant="outline" className="flex-1" onClick={() => openAuthMode('signup')}>Create Account</Button>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button onClick={() => close()} className="text-sm text-muted-foreground underline">Maybe later</button>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="ml-auto">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
