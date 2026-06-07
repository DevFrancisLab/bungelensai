'use client'

import { Button } from '@/components/ui/button'

export default function CTASection() {
  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA Content */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-12 md:p-16 text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Make Governance Understandable for Everyone
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of citizens using BungeLens AI to understand parliament, stay informed, and engage with governance in a meaningful way.
          </p>

          {/* Button */}
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 text-base font-semibold">
            Get Started
          </Button>

          {/* Trust message */}
          <p className="text-sm text-muted-foreground mt-8">
            No credit card required. Start free today.
          </p>
        </div>
      </div>
    </section>
  )
}
