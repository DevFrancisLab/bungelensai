"use client"

import React, { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Home, TrendingUp, Upload, Bookmark, Settings, ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  activeSection: 'dashboard' | 'trending' | 'upload' | 'saved' | 'settings'
  onSelect: (v: 'dashboard' | 'trending' | 'upload' | 'saved' | 'settings') => void
  collapsed?: boolean
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ activeSection, onSelect, collapsed = false, setCollapsed }: Props) {
  // Support both controlled (parent provides setCollapsed) and uncontrolled usage.
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(collapsed)
  const controlled = typeof setCollapsed === 'function'
  useEffect(() => {
    if (!controlled) return
    // keep internal in sync when parent controls collapsed
    setInternalCollapsed(collapsed)
  }, [collapsed, controlled])

  const isCollapsed = controlled ? collapsed : internalCollapsed

  function toggle() {
    if (controlled) setCollapsed && setCollapsed((s) => !s)
    else setInternalCollapsed((s) => !s)
  }

  return (
    <aside className={`lg:sticky lg:top-6 lg:self-start transition-all duration-200`}> 
      <nav
        role="navigation"
        aria-label="Dashboard sidebar"
        className={`relative w-full flex flex-col justify-between px-3 lg:h-[calc(100vh-6rem)] lg:overflow-auto transition-all duration-200`}
      >
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-lg bg-primary flex items-center justify-center shadow-sm ${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'}`}>
                <span className="text-primary-foreground font-bold">B</span>
              </div>
              <div className={`ml-3 transition-all duration-200 ${isCollapsed ? 'opacity-0 max-w-0 overflow-hidden' : 'opacity-100 max-w-full'}`}>
                <div className="font-semibold">BungeLens AI</div>
                <div className="text-sm text-muted-foreground">Dashboard</div>
              </div>

            {/* Toggle positioned absolutely so it's always visible */}
            <button
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={toggle}
              className="absolute right-3 top-3 rounded-full p-1 hover:bg-accent/5 transition-colors z-20"
            >
              {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
            </button>
          </div>

          <ul className="space-y-2">
            {[
              { key: 'dashboard', label: 'Dashboard', Icon: Home },
              { key: 'trending', label: 'Trending Topics', Icon: TrendingUp },
              { key: 'upload', label: 'Upload Documents', Icon: Upload },
              { key: 'saved', label: 'Saved Insights', Icon: Bookmark },
              { key: 'settings', label: 'Settings', Icon: Settings },
            ].map((item) => {
              const isActive = activeSection === (item.key as Props['activeSection'])
              return (
                <li key={item.key}>
                  <button
                    title={item.label}
                    onClick={() => onSelect(item.key as Props['activeSection'])}
                    aria-current={isActive || undefined}
                    className={
                      `w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 text-foreground px-3 py-2 rounded-md transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-accent/40 ` +
                      (isActive ? 'bg-accent/10 font-semibold shadow-sm' : 'hover:bg-accent/10 hover:shadow-sm')
                    }
                  >
                    <item.Icon className="size-4" />
                    <span className={`transition-all duration-200 ${isCollapsed ? 'opacity-0 max-w-0 overflow-hidden' : 'opacity-100 max-w-full ml-2 text-sm md:text-base'}`}>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {!isCollapsed && (
          <div className="mt-6">
            <div className="text-sm font-medium mb-3">My Interests</div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Healthcare</Badge>
              <Badge variant="outline">Education</Badge>
              <Badge variant="outline">Youth</Badge>
              <Badge variant="outline">Employment</Badge>
            </div>
          </div>
        )}
      </nav>
    </aside>
  )
}
