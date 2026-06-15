"use client"

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Heart, BookOpen, Leaf, Users } from 'lucide-react'

type Topic = {
  key: string
  title: string
  description: string
  status: 'Trending' | 'Live' | 'New'
  impact: string
  Icon?: any
}

const TOPICS: Topic[] = [
  {
    key: 'finance',
    title: 'Finance Bill 2026',
    description: 'Key amendments to tax brackets and allocation to social programs.',
    status: 'Trending',
    impact: 'May affect household taxes and social safety nets across constituencies.',
    Icon: FileText,
  },
  {
    key: 'health',
    title: 'Universal Healthcare',
    description: 'Debate on funding model, phased rollout, and regional pilots.',
    status: 'Live',
    impact: 'Improved primary care access expected in pilot regions within 12–24 months.',
    Icon: Heart,
  },
  {
    key: 'education',
    title: 'Education Reform',
    description: 'Discussions on baseline funding increases and targeted rural grants.',
    status: 'Trending',
    impact: 'Rural schools may receive additional resources and teacher training support.',
    Icon: BookOpen,
  },
  {
    key: 'agriculture',
    title: 'Agricultural Subsidies',
    description: 'Support measures and subsidy targeting for smallholder farmers.',
    status: 'New',
    impact: 'Short-term relief to farm input costs and longer-term productivity programs.',
    Icon: Leaf,
  },
  {
    key: 'youth',
    title: 'Youth Employment Initiatives',
    description: 'Proposals for skills training, apprenticeships, and entrepreneurship grants.',
    status: 'Trending',
    impact: 'Expanded training programs and pilot employment schemes for young people.',
    Icon: Users,
  },
]

export default function TrendingTopicsView() {
  return (
    <section className="space-y-4">
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText />
              <CardTitle>Trending Parliamentary Topics</CardTitle>
            </div>
            <div className="text-sm text-muted-foreground">Overview</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOPICS.map((t) => (
              <Card key={t.key} className="hover:shadow-md transition-shadow duration-150">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-md bg-accent/10 flex items-center justify-center text-accent-foreground">
                      {t.Icon ? <t.Icon className="size-4" /> : <FileText className="size-4" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-medium">{t.title}</div>
                        <Badge variant="outline">{t.status}</Badge>
                      </div>

                      <div className="text-sm text-muted-foreground mt-2">{t.description}</div>

                      <div className="mt-3 text-sm bg-background/50 border border-border rounded-md px-3 py-2">
                        <div className="text-xs text-muted-foreground">Estimated citizen impact</div>
                        <div className="text-sm mt-1">{t.impact}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
