 'use client'

import { Button } from '@/components/ui/button'
import { useGuestModal } from '@/context/guest-context'

export default function HeroSection() {
  const { startGuestSession } = useGuestModal()
  function navigateToDashboard() {
    try {
      window.history.pushState({}, '', '/dashboard')
      window.dispatchEvent(new PopStateEvent('popstate'))
    } catch (e) {
      window.location.href = '/dashboard'
    }
  }
  return (
    <section className="relative min-h-screen w-full pt-20 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Kenyan_Parliament.jpeg"
          alt="Kenyan Parliament Building"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        {/* AI glow element */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
            Understand Parliament.{' '}
            <span className="text-accent">Instantly.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto text-balance leading-relaxed">
            AI-powered civic intelligence that simplifies governance and policy information for every citizen.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 text-base font-semibold shadow-sm hover:shadow-md transition-shadow focus-visible:ring-2" onClick={() => { startGuestSession(); navigateToDashboard() }} aria-haspopup="dialog">
              Try BungeLens
            </Button>
          </div>
        </div>

        {/* Decorative floating nodes */}
        <div className="absolute top-1/4 left-10 w-12 h-12 border-2 border-accent/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-10 w-8 h-8 border-2 border-accent/20 rounded-full animate-pulse animation-delay-1000"></div>
      </div>
    </section>
  )
}
