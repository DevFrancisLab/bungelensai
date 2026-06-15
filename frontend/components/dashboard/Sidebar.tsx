"use client"

import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Home, TrendingUp, Upload, Bookmark, Settings, ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  activeSection: 'dashboard' | 'trending' | 'upload' | 'saved' | 'settings'
  onSelect: (v: 'dashboard' | 'trending' | 'upload' | 'saved' | 'settings') => void
}

export default function Sidebar({ activeSection, onSelect }: Props) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`lg:sticky lg:top-20 lg:self-start transition-all duration-200`}> 
      <nav
        role="navigation"
        aria-label="Dashboard sidebar"
        className={`w-full max-w-xs sm:max-w-sm flex flex-col justify-between px-3 lg:h-[calc(100vh-5rem)] lg:overflow-auto transition-all duration-200 ${collapsed ? 'lg:max-w-[72px]' : 'lg:max-w-[280px]'}`}
      >
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg bg-primary flex items-center justify-center shadow-sm ${collapsed ? 'w-10 h-10' : 'w-12 h-12'}`}>
                <span className="text-primary-foreground font-bold">B</span>
              </div>
              {!collapsed && (
                <div>
                  <div className="font-semibold">BungeLens AI</div>
                  <div className="text-sm text-muted-foreground">Dashboard</div>
                </div>
              )}
            </div>

            <button
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={() => setCollapsed((s) => !s)}
              className="ml-2 rounded-full p-1 hover:bg-accent/5 transition-colors"
            >
              {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
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
                    onClick={() => onSelect(item.key as Props['activeSection'])}
                    aria-current={isActive || undefined}
                    className={
                      `w-full flex items-center gap-3 text-foreground px-3 py-2 rounded-md transition-shadow duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-accent/40 ` +
                      (isActive ? 'bg-accent/10 font-semibold shadow-sm' : 'hover:bg-accent/10 hover:shadow-sm')
                    }
                  >
                    <item.Icon className="size-4" />
                    <span className={`${collapsed ? 'hidden' : 'text-sm md:text-base'}`}>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {!collapsed && (
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
