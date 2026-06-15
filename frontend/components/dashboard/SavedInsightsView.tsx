"use client"

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Insight = {
  id: string
  title: string
  summary: string
  dateSaved: string
  topics: string[]
}

const SAMPLE_INSIGHTS: Insight[] = [
  {
    id: 'ins-1',
    title: 'Education Bill: Funding Summary',
    summary:
      'Summary of the Education Bill focusing on the 6% baseline increase and targeted rural grants, with accountability milestones and timelines.',
    dateSaved: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    topics: ['Education', 'Budget', 'Rural'],
  },
  {
    id: 'ins-2',
    title: 'Healthcare Rollout: Pilot Regions',
    summary:
      'Notes from the healthcare committee debate highlighting phased rollout plans, pilot regions, and proposed funding sources for primary care.',
    dateSaved: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    topics: ['Healthcare', 'Policy'],
  },
  {
    id: 'ins-3',
    title: 'Youth Employment Programs Overview',
    summary:
      'Overview of proposed youth employment initiatives including apprenticeships, vocational programs, and targeted grants to stimulate jobs for young people.',
    dateSaved: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    topics: ['Youth', 'Employment', 'Skills'],
  },
]

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString()
  } catch (e) {
    return iso
  }
}

export default function SavedInsightsView({ insights = SAMPLE_INSIGHTS }: { insights?: Insight[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">Saved Insights</h2>
        <div className="text-sm text-muted-foreground">Your archived AI summaries</div>
      </div>

      {(!insights || insights.length === 0) ? (
        <Card className="p-6 text-center">
          <div className="text-lg font-medium">No saved insights yet</div>
          <div className="text-sm text-muted-foreground mt-2">Save AI summaries to revisit them later.</div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {insights.map((ins) => (
            <Card key={ins.id} className="hover:shadow-md transition-shadow duration-150">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{ins.title}</div>
                      <div className="text-xs text-muted-foreground">Saved {formatDate(ins.dateSaved)}</div>
                    </div>

                    <div className="text-sm text-muted-foreground mt-3">{ins.summary}</div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {ins.topics.map((t) => (
                        <Badge key={t} variant="outline">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
