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
  typing,
}: {
  role: 'user' | 'assistant'
  text?: string
  aiResponse?: AIResponse
  typing?: boolean
}) {
  const isAssistant = role === 'assistant'

  return (
    <div className={cn('flex gap-4 items-start py-2', isAssistant ? 'flex-row' : 'flex-row-reverse')}>
      <div className="shrink-0">
        <Avatar>
          <AvatarFallback />
        </Avatar>
      </div>

      <div className="flex-1 min-w-0">
        <Card className={cn(isAssistant ? 'bg-card' : 'bg-primary/5', 'min-w-0') }>
          <div className={cn('px-5 py-4')}> 
            {/* User text bubble */}
            {text && (
              <p className={cn('text-sm md:text-base whitespace-pre-wrap break-words break-all max-w-full', isAssistant ? 'text-muted-foreground' : 'text-foreground')}>
                {text}
              </p>
            )}

            {/* Typing indicator */}
            {typing && (
              <div className="mt-3 flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-muted-foreground/30" />
                <div className="text-sm text-muted-foreground">BungeLens is typing…</div>
              </div>
            )}

            {/* Structured AI response */}
            {aiResponse && (
              <div className="mt-4 space-y-4">
                <div>
                  <div className="font-semibold">Summary</div>
                  <p className="text-sm md:text-base text-muted-foreground mt-1 whitespace-pre-wrap break-words break-all max-w-full">{aiResponse.summary}</p>
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
                  <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap break-words break-all max-w-full">{aiResponse.citizenImpact}</p>
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
