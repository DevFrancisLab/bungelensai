"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type GuestContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  guestActive: boolean
  startGuestSession: () => void
  endGuestSession: () => void
  preservedConversation: { id?: string; title?: string; messages?: any[] } | null
  setPreservedConversation: (c: { id?: string; title?: string; messages?: any[] } | null) => void
}

const GuestContext = createContext<GuestContextType | undefined>(undefined)

export const GuestProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [guestActive, setGuestActive] = useState(false)
  const [preservedConversation, setPreservedConversation] = useState<{ id?: string; title?: string; messages?: any[] } | null>(null)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const startGuestSession = useCallback(() => setGuestActive(true), [])
  const endGuestSession = useCallback(() => setGuestActive(false), [])
  const setPreservedConversationFn = useCallback((c: { id?: string; title?: string; messages?: any[] } | null) => setPreservedConversation(c), [])

  return (
    <GuestContext.Provider value={{ isOpen, open, close, guestActive, startGuestSession, endGuestSession, preservedConversation, setPreservedConversation: setPreservedConversationFn }}>
      {children}
    </GuestContext.Provider>
  )
}

export function useGuestModal() {
  const ctx = useContext(GuestContext)
  if (!ctx) throw new Error("useGuestModal must be used within GuestProvider")
  return ctx
}

export default GuestContext
