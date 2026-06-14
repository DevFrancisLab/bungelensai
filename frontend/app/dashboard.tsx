"use client"

import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, Cpu, BarChart2, FileText } from 'lucide-react'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">B</span>
            </div>
            <div>
              <div className="font-semibold">BungeLens AI</div>
              <div className="text-sm text-muted-foreground">Civic intelligence for everyone</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button aria-label="Notifications" className="rounded-md p-2 hover:bg-accent/10">
              <Bell />
            </button>

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>FL</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="mb-8 grid gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">Welcome to BungeLens AI</h1>
          <p className="text-muted-foreground text-lg">Your AI-powered civic intelligence platform.</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex items-start justify-between px-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Cpu />
                </div>
                <div>
                  <CardTitle>AI Assistant</CardTitle>
                  <CardDescription>Ask questions and get concise civic summaries powered by AI.</CardDescription>
                </div>
              </div>
              <div className="self-start">
                <Badge>Coming Soon</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">An assistant that helps you understand bills, debates, and voting records.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost">Preview</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex items-start justify-between px-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <BarChart2 />
                </div>
                <div>
                  <CardTitle>Parliamentary Insights</CardTitle>
                  <CardDescription>Visual summaries of sessions, members, and trends.</CardDescription>
                </div>
              </div>
              <div className="self-start">
                <Badge>Coming Soon</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Quick insights to help citizens and journalists understand parliamentary activity.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost">Preview</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex items-start justify-between px-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText />
                </div>
                <div>
                  <CardTitle>Document Analysis</CardTitle>
                  <CardDescription>Upload or paste documents for AI-assisted analysis.</CardDescription>
                </div>
              </div>
              <div className="self-start">
                <Badge>Coming Soon</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Extract summaries, timelines, and action items from legislative documents.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost">Preview</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="px-10" onClick={() => { /* UI-only: future action */ }}>
            Start Exploring
          </Button>
        </div>
      </section>
    </main>
  )
}
