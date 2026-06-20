"use client"

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthModal } from '@/context/auth-context'
import { useGuestModal } from '@/context/guest-context'
import { Spinner } from '@/components/ui/spinner'
import { Eye, EyeOff } from 'lucide-react'

export default function AuthenticationModal() {
  const { isOpen, close, authMode, setAuthenticated } = useAuthModal()
  const { preservedConversation } = useGuestModal()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  function navigateToDashboard() {
    try {
      navigate('/dashboard')
    } catch (e) {
      try { window.location.href = '/dashboard' } catch (_) {}
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setError(null)
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    setLoading(true)

    // simulate a short processing delay
    await new Promise((r) => setTimeout(r, 500))

    setLoading(false)
    // mark as authenticated (mock)
    try { setAuthenticated(true) } catch (e) { }
    close()
    navigateToDashboard()
  }

  async function handleCreateAccount() {
    if (loading) return
    setError(null)
    if (!email || !password || !confirmPassword) {
      setError('Please fill all fields.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    setLoading(false)
    try { setAuthenticated(true) } catch (e) { }
    close()
    navigateToDashboard()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close() }}>
      <DialogContent aria-labelledby="auth-dialog-title" aria-describedby="auth-dialog-desc" className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle id="auth-dialog-title" className="text-2xl md:text-3xl">{authMode === 'signup' ? 'Create an account' : 'Welcome to BungeLens'}</DialogTitle>
          <DialogDescription id="auth-dialog-desc">
            {authMode === 'signup' ? 'Create an account to save your chats and preferences.' : 'Sign in or create an account to continue to your dashboard.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4 transition-opacity duration-200 ease-in-out" aria-busy={loading}>
          <form onSubmit={authMode === 'signup' ? (e) => { e.preventDefault(); handleCreateAccount() } : handleSubmit} className="grid gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@email.com" required aria-required="true" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter password" required aria-required="true" aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10" />
                <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {authMode === 'signup' && (
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input id="confirm-password" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Re-enter password" required aria-required="true" aria-label="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pr-10" />
                  <button type="button" aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'} onClick={() => setShowConfirmPassword((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
            )}

            {error ? <div className="text-destructive text-sm">{error}</div> : null}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
              <Button type="submit" className="flex items-center gap-2" disabled={loading} aria-disabled={loading} aria-live="polite">
                {loading ? <Spinner className="size-4" /> : null}
                <span>{loading ? (authMode === 'signup' ? 'Creating…' : 'Signing in…') : (authMode === 'signup' ? 'Create Account' : 'Sign In')}</span>
              </Button>

              {authMode === 'signup' ? null : (
                <Button type="button" variant="ghost" onClick={handleCreateAccount} disabled={loading} aria-disabled={loading}>
                  {loading ? 'Processing…' : 'Create Account'}
                </Button>
              )}
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
