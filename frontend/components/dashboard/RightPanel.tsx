"use client"

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Home, FileText, BarChart2, BookOpen, Heart, Leaf } from 'lucide-react'

type Props = {
  activeSection?: 'dashboard' | 'trending' | 'upload' | 'saved' | 'settings'
  onClose?: () => void
}

export default function RightPanel({ activeSection = 'dashboard', onClose }: Props) {
  const showTrending = activeSection !== 'dashboard'

  return (
    <aside className="h-full lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-auto">
      <div className="space-y-4">
        {/* Trending in Parliament (hidden on Dashboard home to keep assistant primary) */}
        {showTrending && (
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Home />
                  <CardTitle>Trending in Parliament</CardTitle>
                </div>
                <div className="text-sm text-muted-foreground">Live</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: 'Finance Bill 2026', snippet: 'Key amendments to tax brackets and allocation.', icon: FileText },
                { title: 'Universal Healthcare', snippet: 'Debate on funding model and rollout timeline.', icon: Heart },
                { title: 'Education Reform', snippet: 'Discussions on funding and rural access.', icon: BookOpen },
                { title: 'Agricultural Subsidies', snippet: 'Support measures for smallholder farmers.', icon: Leaf },
              ].map((t) => (
                <div key={t.title} className="flex items-start gap-3 p-2 rounded-md hover:bg-accent/5 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center text-accent-foreground">
                    <t.icon className="size-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{t.title}</div>
                      <Badge variant="outline">Trending</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{t.snippet}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Parliamentary Activity (closable) */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart2 />
              <CardTitle>Parliamentary Activity</CardTitle>
            </div>
            <div>
              <button aria-label="Close panel" onClick={() => onClose && onClose()} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Close</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-background rounded-md">
                <div className="text-2xl font-semibold">24</div>
                <div className="text-sm text-muted-foreground">Bills Discussed</div>
              </div>
              <div className="p-3 bg-background rounded-md">
                <div className="text-2xl font-semibold">6</div>
                <div className="text-sm text-muted-foreground">Committees Active</div>
              </div>
              <div className="p-3 bg-background rounded-md">
                <div className="text-2xl font-semibold">112</div>
                <div className="text-sm text-muted-foreground">Questions Raised</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Discussions extracted to `RecentDiscussions.tsx` for reuse elsewhere */}
      </div>
    </aside>
  )
}
