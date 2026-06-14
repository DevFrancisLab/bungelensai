"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthModal } from '@/context/auth-context'
import { Spinner } from '@/components/ui/spinner'

export default function AuthenticationModal() {
  const { isOpen, close } = useAuthModal()
  const [loading, setLoading] = useState(false)

  function navigateToDashboard() {
    try {
      window.history.pushState({}, '', '/dashboard')
      window.dispatchEvent(new PopStateEvent('popstate'))
    } catch (e) {
      window.location.href = '/dashboard'
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)

    // simulate a short processing delay
    await new Promise((r) => setTimeout(r, 500))

    setLoading(false)
    close()
    navigateToDashboard()
  }

  async function handleCreateAccount() {
    if (loading) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    setLoading(false)
    close()
    navigateToDashboard()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close() }}>
      <DialogContent aria-labelledby="auth-dialog-title" aria-describedby="auth-dialog-desc" className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle id="auth-dialog-title" className="text-2xl md:text-3xl">Welcome to BungeLens</DialogTitle>
          <DialogDescription id="auth-dialog-desc">
            Sign in or create an account to continue to your dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4 transition-opacity duration-200 ease-in-out" aria-busy={loading}>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@email.com" required aria-required="true" aria-label="Email" />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter password" required aria-required="true" aria-label="Password" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
              <Button type="submit" className="flex items-center gap-2" disabled={loading} aria-disabled={loading} aria-live="polite">
                {loading ? <Spinner className="size-4" /> : null}
                <span>{loading ? 'Signing in…' : 'Sign In'}</span>
              </Button>

              <Button type="button" variant="ghost" onClick={handleCreateAccount} disabled={loading} aria-disabled={loading}>
                {loading ? 'Processing…' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="pt-1">
            <Button variant="outline" className="w-full justify-center" onClick={() => { /* UI-only: simulate social */ }} disabled={loading}>
              Continue with Google
            </Button>
          </div>
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
