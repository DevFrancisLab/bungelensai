"use client"

import React, { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MessageSquare, TrendingUp, Upload, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useAuthModal } from '@/context/auth-context'
import { useGuestModal } from '@/context/guest-context'
import { useAuth } from '../../src/auth/AuthContext'

type Props = {
  activeSection: 'dashboard' | 'trending' | 'upload' | 'history' | 'settings'
  onSelect: (v: 'dashboard' | 'trending' | 'upload' | 'history' | 'settings') => void
  collapsed?: boolean
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>
  onNewConversation?: () => void
}

function Sidebar({ activeSection, onSelect, collapsed = false, setCollapsed }: Props) {
  // Support both controlled (parent provides setCollapsed) and uncontrolled usage.
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(collapsed)
  const controlled = typeof setCollapsed === 'function'
  useEffect(() => {
    if (!controlled) return
    // keep internal in sync when parent controls collapsed
    setInternalCollapsed(collapsed)
  }, [collapsed, controlled])

  const isCollapsed = controlled ? collapsed : internalCollapsed

  // auth + guest helpers for profile actions
  const auth = useAuthModal()
  const guest = useGuestModal()
  const { user, logout, accessToken } = useAuth()

  function getInitials(u: any) {
    if (!u) return 'U'
    // Prefer first/last name initials
    const first = (u.first_name || u.name || '').toString().trim()
    const last = (u.last_name || '').toString().trim()
    if (first && last) return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    if (first) {
      const parts = first.split(' ').filter(Boolean)
      if (parts.length >= 2) return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()
      return `${first.charAt(0)}`.toUpperCase()
    }
    // fallback to email local-part first+last char
    const email = (u.email || '').toString()
    const local = email.split('@')[0] || email
    if (local.length >= 2) return `${local.charAt(0)}${local.charAt(local.length - 1)}`.toUpperCase()
    return (email.charAt(0) || 'U').toUpperCase()
  }

  function getDisplayName(u: any) {
    if (!u) return 'You'
    const first = (u.first_name || u.name || '').toString().trim()
    const last = (u.last_name || '').toString().trim()
    if (first && last) return `${first} ${last}`
    if (first) return first.split(' ')[0]
    if (u.email) return u.email.split('@')[0]
    return 'You'
  }

  // Try to recover a minimal user object from the in-memory access token when `user` is not yet populated.
  function getUserFromToken(token?: string) {
    if (!token) return null
    try {
      const parts = token.split('.')
      if (parts.length < 2) return null
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
      // Common claim names: email, username
      const email = payload.email || payload.username || null
      if (email) return { email }
      // fallback to user_id if present
      if (payload.user_id) return { id: payload.user_id }
      return null
    } catch (e) {
      return null
    }
  }

  const displayUser = user || getUserFromToken(accessToken)

  function toggle() {
    if (controlled) setCollapsed && setCollapsed((s) => !s)
    else setInternalCollapsed((s) => !s)
  }

  return (
    <aside className={`lg:sticky lg:top-6 lg:self-start transition-all duration-200 border-r border-accent/10`}>
      <nav
        role="navigation"
        aria-label="Dashboard sidebar"
        className={`relative w-full flex flex-col justify-start gap-y-6 px-3 lg:h-[calc(100vh-6rem)] lg:overflow-auto transition-all duration-200`}
      >
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-lg bg-primary flex items-center justify-center shadow-sm ${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'}`}>
                <span className="text-primary-foreground font-bold">B</span>
            </div>
            <button
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={toggle}
              className="ml-auto rounded-full p-1 hover:bg-accent/5 transition-colors z-20"
            >
              {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
            </button>
          </div>

          <ul className="space-y-2">
            {[
              { key: 'dashboard', label: 'New Chat', Icon: MessageSquare },
              { key: 'trending', label: 'Trending Topics', Icon: TrendingUp },
              { key: 'upload', label: 'Upload Documents', Icon: Upload },
              { key: 'history', label: 'Chat History', Icon: Bookmark },
            ].map((item) => {
              const isActive = activeSection === (item.key as Props['activeSection'])
              return (
                <li key={item.key}>
                  <button
                    title={item.label}
                    onClick={() => onSelect(item.key as Props['activeSection'])}
                    aria-current={isActive || undefined}
                    className={
                      `w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 text-foreground px-3 py-2 rounded-md transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-accent/40 ` +
                      (isActive ? 'bg-accent/10 font-semibold shadow-sm' : 'hover:bg-accent/10 hover:shadow-sm')
                    }
                  >
                    <item.Icon className="size-4" />
                    <span className={`transition-all duration-200 ${isCollapsed ? 'opacity-0 max-w-0 overflow-hidden' : 'opacity-100 max-w-full ml-2 text-sm md:text-base'}`}>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Profile / Interests area - varies by guest state */}
        <div className="mt-6">
          {guest.guestActive ? (
            <div className="mb-4">
              <button
                onClick={() => {
                  try { auth.setAuthMode('signin') } catch (e) {}
                  try { auth.open() } catch (e) {}
                }}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 text-foreground px-3 py-2 rounded-md transition-all duration-200 ease-in-out border border-accent/10 hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-accent/40`}
              >
                <Avatar className="w-9 h-9">
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Guest</span>
                    <span className="text-xs text-muted-foreground">Sign in to save</span>
                  </div>
                )}
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-haspopup="menu"
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 text-foreground px-3 py-2 rounded-md transition-all duration-200 ease-in-out border border-accent/10 hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-accent/40`}
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarFallback>{getInitials(displayUser)}</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{getDisplayName(displayUser)}</span>
                        <span className="text-xs text-muted-foreground">View profile</span>
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => onSelect('settings')}>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => {
                        try {
                          // Use global auth logout to clear tokens, user state and axios header
                          logout && logout()
                        } catch (e) {}
                        try {
                          guest.endGuestSession()
                        } catch (e) {}
                        try {
                          // navigate home after logout
                          window.location.href = '/'
                        } catch (e) {}
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* only show interests when not guest and not collapsed */}
          {!isCollapsed && !guest.guestActive && (
            <div>
              <div className="text-sm font-medium mb-3">My Interests</div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Healthcare</Badge>
                <Badge variant="outline">Education</Badge>
                <Badge variant="outline">Youth</Badge>
                <Badge variant="outline">Employment</Badge>
              </div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  )
}

export default React.memo(Sidebar)
