"use client"

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Home, TrendingUp, Upload, Bookmark, Settings } from 'lucide-react'

type Props = {
  activeSection: 'dashboard' | 'trending' | 'upload' | 'saved' | 'settings'
  onSelect: (v: 'dashboard' | 'trending' | 'upload' | 'saved' | 'settings') => void
}

export default function Sidebar({ activeSection, onSelect }: Props) {
  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <nav
        role="navigation"
        aria-label="Dashboard sidebar"
        className="w-full max-w-xs sm:max-w-sm lg:max-w-md flex flex-col justify-between px-1 lg:h-[calc(100vh-5rem)] lg:overflow-auto"
      >
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">B</span>
            </div>
            <div>
              <div className="font-semibold">BungeLens AI</div>
              <div className="text-sm text-muted-foreground">Dashboard</div>
            </div>
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
                      `w-full flex items-center gap-3 text-foreground px-3 py-2 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent/40 ` +
                      (isActive ? 'bg-accent/10 font-semibold' : 'hover:bg-accent/10')
                    }
                  >
                    <item.Icon className="size-4" />
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-6">
          <div className="text-sm font-medium mb-3">My Interests</div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Healthcare</Badge>
            <Badge variant="outline">Education</Badge>
            <Badge variant="outline">Youth</Badge>
            <Badge variant="outline">Employment</Badge>
          </div>
        </div>
      </nav>
    </aside>
  )
}
