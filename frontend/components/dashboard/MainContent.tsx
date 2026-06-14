"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Cpu, BarChart2, FileText } from 'lucide-react'

export default function MainContent() {
  return (
    <div className="space-y-8">
      <section className="bg-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Welcome to BungeLens AI</h1>
            <p className="text-muted-foreground mt-2">Your AI-powered civic intelligence platform.</p>
          </div>

          <div>
            <Button size="lg" className="px-8 shadow-sm hover:shadow-md transition-shadow">Start Exploring</Button>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex items-start gap-4 px-6">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Cpu />
              </div>
              <div>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Ask questions and get concise civic summaries.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Placeholder for assistant preview.</p>
            </CardContent>
            <CardFooter>
              <div className="ml-auto">
                <Button variant="ghost">Coming Soon</Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex items-start gap-4 px-6">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <BarChart2 />
              </div>
              <div>
                <CardTitle>Parliamentary Insights</CardTitle>
                <CardDescription>Visual summaries of sessions and trends.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Placeholder for insights preview.</p>
            </CardContent>
            <CardFooter>
              <div className="ml-auto">
                <Button variant="ghost">Coming Soon</Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex items-start gap-4 px-6">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <FileText />
              </div>
              <div>
                <CardTitle>Document Analysis</CardTitle>
                <CardDescription>Extract summaries and action items from docs.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Placeholder for document tools.</p>
            </CardContent>
            <CardFooter>
              <div className="ml-auto">
                <Button variant="ghost">Coming Soon</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
