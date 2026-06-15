"use client"

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

export default function RecentDiscussions() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Calendar />
          <CardTitle>Recent Discussions</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { time: '2h ago', title: 'Committee on Finance debated tax relief measures', excerpt: 'Members discussed adjusting thresholds for small businesses.' },
            { time: '5h ago', title: 'Health committee hearing on Universal Healthcare rollout', excerpt: 'Panel outlined phased implementation and budgeting.' },
            { time: '1d ago', title: 'Education reform public submissions reviewed', excerpt: 'Stakeholders called for increased rural funding.' },
          ].map((d) => (
            <div key={d.title} className="flex items-start gap-3 group">
              <div className="w-2.5 h-2.5 rounded-full mt-2 bg-accent/80 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-sm font-medium">{d.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{d.excerpt}</div>
                <div className="text-xs text-muted-foreground mt-1">{d.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
