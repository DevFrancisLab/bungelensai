"use client"

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Home, TrendingUp, Upload, Bookmark, Settings } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="h-full sticky top-20 self-start">
      <nav className="w-64 lg:w-72 xl:w-80 flex flex-col justify-between h-[calc(100vh-5rem)]">
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
            <li>
              <button className="w-full flex items-center gap-3 text-foreground px-3 py-2 rounded-md hover:bg-accent/10 transition-colors">
                <Home className="size-4" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 text-foreground px-3 py-2 rounded-md hover:bg-accent/10 transition-colors">
                <TrendingUp className="size-4" />
                <span>Trending Topics</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 text-foreground px-3 py-2 rounded-md hover:bg-accent/10 transition-colors">
                <Upload className="size-4" />
                <span>Upload Documents</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 text-foreground px-3 py-2 rounded-md hover:bg-accent/10 transition-colors">
                <Bookmark className="size-4" />
                <span>Saved Insights</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 text-foreground px-3 py-2 rounded-md hover:bg-accent/10 transition-colors">
                <Settings className="size-4" />
                <span>Settings</span>
              </button>
            </li>
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
