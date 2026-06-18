"use client"

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import MainContent from '@/components/dashboard/MainContent'
import RightPanel from '@/components/dashboard/RightPanel'

export type SectionKey = 'dashboard' | 'trending' | 'upload' | 'saved' | 'settings'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<SectionKey>('dashboard')
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [rightVisible, setRightVisible] = useState<boolean>(true)

  // Prevent the browser window from scrolling while dashboard is mounted.
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [])

  return (
    <main className="h-screen bg-background text-foreground overflow-hidden">
      <section className="max-w-7xl mx-auto px-6 py-6 h-full">
        <div className="flex flex-col lg:flex-row gap-8 h-full transition-all duration-200 ease-in-out">
          {/* compute responsive column spans */}
          {/**
           * sidebarSpan: 2 when collapsed, otherwise 3
           * rightSpan: 0 when hidden, otherwise 2 when collapsed or 3 when expanded
           * mainSpan: remaining columns
           */}
          {(() => {
            const sidebarSpan = collapsed ? 2 : 3
            const rightSpan = rightVisible ? (collapsed ? 2 : 3) : 0
            const mainSpan = 12 - sidebarSpan - rightSpan

            // map spans to literal class names so Tailwind sees them
            const sidebarClass = collapsed ? 'lg:col-span-2' : 'lg:col-span-3'
            const rightClass = rightVisible ? (collapsed ? 'lg:col-span-2' : 'lg:col-span-3') : ''
            // main span depends on both collapsed and rightVisible
            const mainClass = collapsed
              ? rightVisible
                ? 'lg:col-span-8' // sidebar 2 + right 2
                : 'lg:col-span-10' // sidebar 2 + right 0
              : rightVisible
              ? 'lg:col-span-6' // sidebar 3 + right 3
              : 'lg:col-span-9' // sidebar 3 + right 0

            return (
              <>
                {/* Left sidebar */}
                <div className={`shrink-0 transition-all duration-200 ease-in-out ${collapsed ? 'w-[72px]' : 'w-60'}`}>
                  <Sidebar activeSection={activeSection} onSelect={setActiveSection} collapsed={collapsed} setCollapsed={setCollapsed} />
                </div>

                {/* Main content area (primary) */}
                <div className={`flex-1 min-h-0`}>
                  <MainContent activeSection={activeSection} />
                </div>

                {/* Right insights panel (render only on large screens) */}
                {rightVisible && (
                  <div className="hidden lg:block shrink-0 w-72 transition-all duration-200 ease-in-out">
                    <RightPanel activeSection={activeSection} onClose={() => setRightVisible(false)} />
                  </div>
                )}
              </>
            )
          })()}
        </div>
      </section>
    </main>
  )
}
