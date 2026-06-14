"use client"

import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type AIResponse = {
  summary: string
  keyInsights: string[]
  citizenImpact: string
  tags: string[]
}

export default function ChatMessage({
  role,
  text,
  aiResponse,
}: {
  role: 'user' | 'assistant'
  text?: string
  aiResponse?: AIResponse
}) {
  const isAssistant = role === 'assistant'

  return (
    <div className={cn('flex gap-3 items-start', isAssistant ? 'flex-row' : 'flex-row-reverse')}>
      <div className="flex-shrink-0">
        <Avatar>
          <AvatarFallback>{isAssistant ? 'BL' : 'YOU'}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1">
        <Card className={isAssistant ? 'bg-card' : 'bg-primary/5'}>
          <div className={cn('px-4 py-3')}> 
            {text && <p className={cn('text-sm', isAssistant ? 'text-muted-foreground' : 'text-foreground')}>{text}</p>}

            {aiResponse && (
              <div className="mt-3 space-y-3">
                <div>
                  <div className="font-semibold">Summary</div>
                  <p className="text-sm text-muted-foreground mt-1">{aiResponse.summary}</p>
                </div>

                <div>
                  <div className="font-semibold">Key Insights</div>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                    {aiResponse.keyInsights.map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-semibold">Citizen Impact</div>
                  <p className="text-sm text-muted-foreground mt-1">{aiResponse.citizenImpact}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {aiResponse.tags.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
