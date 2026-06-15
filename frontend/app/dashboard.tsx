"use client"

import React, { useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import MainContent from '@/components/dashboard/MainContent'
import RightPanel from '@/components/dashboard/RightPanel'

export type SectionKey = 'dashboard' | 'trending' | 'upload' | 'saved' | 'settings'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<SectionKey>('dashboard')
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">B</span>
            </div>
            <div>
              <div className="font-semibold">BungeLens AI</div>
              <div className="text-sm text-muted-foreground">Civic intelligence for everyone</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {/* Placeholder for utilities (notifications, avatar) */}
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-5rem)] transition-all duration-200 ease-in-out">
          {/* Left sidebar */}
          <div className={`lg:col-span-3 ${collapsed ? 'lg:col-span-2' : ''}`}>
            <Sidebar activeSection={activeSection} onSelect={setActiveSection} collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>

          {/* Main content area */}
          <div className={`lg:col-span-6 ${collapsed ? 'lg:col-span-8' : ''}`}>
            <MainContent activeSection={activeSection} />
          </div>

          {/* Right insights panel */}
          <div className={`lg:col-span-3 ${collapsed ? 'lg:col-span-2' : ''}`}>
            <RightPanel activeSection={activeSection} />
          </div>
        </div>
      </section>
    </main>
  )
}
