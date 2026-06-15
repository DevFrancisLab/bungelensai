"use client"

import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Calendar } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

export default function DocumentCard({
  doc,
}: {
  doc: { id: string; name: string; date: string; status: string; topics: string[] }
}) {
  const processing = doc.status !== 'Complete'

  return (
    <Card className="p-3 hover:shadow-md transition-shadow duration-150">
      <CardHeader className="px-2 py-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-medium truncate">{doc.name}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2"><Calendar className="size-3" />{doc.date}</div>
          </div>

          <div className="text-right">
            <div className={cn('text-sm font-semibold', doc.status === 'Complete' ? 'text-primary' : 'text-muted-foreground')}>{doc.status}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {processing ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Spinner className="size-4" />Processing</div>
              ) : (
                doc.topics.map((t) => (
                  <Badge key={t} variant="outline">{t}</Badge>
                ))
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 py-2 text-sm text-muted-foreground">
        <div>Summary: {doc.status === 'Complete' ? 'AI analysis generated' : 'Processing...'}</div>
      </CardContent>
    </Card>
  )
}
