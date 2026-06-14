"use client"

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Bell, FileText } from 'lucide-react'

export default function RightPanel() {
  return (
    <aside className="w-full">
      <div className="space-y-4">
        <Card>
          <CardHeader className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell />
                <CardTitle>Notifications</CardTitle>
              </div>
              <div className="text-sm text-muted-foreground">0</div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No notifications — you'll see updates here.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-4 py-3">
            <div className="flex items-center gap-3">
              <FileText />
              <CardTitle>Recent Documents</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No uploaded documents yet.</p>
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}
