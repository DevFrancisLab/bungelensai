"use client"

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function SettingsView() {
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [breakingAlerts, setBreakingAlerts] = useState(true)
  const [weeklySummaries, setWeeklySummaries] = useState(false)

  const [interests, setInterests] = useState<Record<string, boolean>>({
    Healthcare: true,
    Education: true,
    Finance: false,
    Youth: true,
    Agriculture: false,
  })

  const [appearance, setAppearance] = useState<'system' | 'light' | 'dark'>('system')

  function toggleInterest(key: string) {
    setInterests((s) => ({ ...s, [key]: !s[key] }))
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">Settings</h2>
        <div className="text-sm text-muted-foreground">Manage preferences and account</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Preferences */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="px-4 py-3">
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Updates</div>
                <div className="text-sm text-muted-foreground">Receive general updates and alerts by email.</div>
              </div>
              <Switch checked={emailUpdates} onCheckedChange={(v) => setEmailUpdates(Boolean(v))} aria-label="Email Updates" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Breaking Policy Alerts</div>
                <div className="text-sm text-muted-foreground">Get notified for important policy changes and urgent updates.</div>
              </div>
              <Switch checked={breakingAlerts} onCheckedChange={(v) => setBreakingAlerts(Boolean(v))} aria-label="Breaking Alerts" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Weekly Summaries</div>
                <div className="text-sm text-muted-foreground">A weekly digest of top parliamentary activity.</div>
              </div>
              <Switch checked={weeklySummaries} onCheckedChange={(v) => setWeeklySummaries(Boolean(v))} aria-label="Weekly Summaries" />
            </div>
          </CardContent>
        </Card>

        {/* Interest Areas */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="px-4 py-3">
            <CardTitle>Interest Areas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(interests).map((k) => (
                <label key={k} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/5 transition-colors cursor-pointer">
                  <Checkbox checked={Boolean(interests[k])} onCheckedChange={() => toggleInterest(k)} aria-label={`Interest ${k}`} />
                  <div>
                    <div className="font-medium">{k}</div>
                    <div className="text-sm text-muted-foreground">{k === 'Youth' ? 'Programs and employment for young people' : `Updates related to ${k.toLowerCase()}`}</div>
                  </div>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="px-4 py-3">
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <RadioGroup value={appearance} onValueChange={(v) => setAppearance(v as any)}>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="system" />
                      <div>
                        <div className="font-medium">Use System Theme</div>
                        <div className="text-sm text-muted-foreground">Follow the device theme setting.</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="light" />
                      <div>
                        <div className="font-medium">Light Mode</div>
                        <div className="text-sm text-muted-foreground">Always use light appearance.</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="dark" />
                      <div>
                        <div className="font-medium">Dark Mode</div>
                        <div className="text-sm text-muted-foreground">Always use dark appearance.</div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="px-4 py-3">
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>BF</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">BungeLens User</div>
                  <div className="text-sm text-muted-foreground">user@example.org</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost">Sign Out</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
