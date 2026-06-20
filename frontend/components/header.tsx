'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuthModal } from '@/context/auth-context'
import { useGuestModal } from '@/context/guest-context'

export default function Header() {
  const { open } = useAuthModal()
  const { startGuestSession } = useGuestModal()
  // Avoid importing `next/navigation` under Vite; determine pathname from window
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const isLanding = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')
    if (!isLanding) {
      setScrolled(true)
      return
    }

    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function navigateToDashboard() {
    try {
      window.history.pushState({}, '', '/dashboard')
      window.dispatchEvent(new PopStateEvent('popstate'))
    } catch (e) {
      window.location.href = '/dashboard'
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">B</span>
          </div>
          <span className="font-semibold text-lg text-foreground">BungeLens AI</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-foreground hover:bg-muted" onClick={open} aria-haspopup="dialog">
            Sign In
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => { startGuestSession(); navigateToDashboard() }} aria-haspopup="dialog">
            Try BungeLens
          </Button>
        </div>
      </nav>
    </header>
  )
}
