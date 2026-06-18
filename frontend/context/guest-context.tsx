"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type GuestContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  guestActive: boolean
  startGuestSession: () => void
  endGuestSession: () => void
}

const GuestContext = createContext<GuestContextType | undefined>(undefined)

export const GuestProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [guestActive, setGuestActive] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const startGuestSession = useCallback(() => setGuestActive(true), [])
  const endGuestSession = useCallback(() => setGuestActive(false), [])

  return (
    <GuestContext.Provider value={{ isOpen, open, close, guestActive, startGuestSession, endGuestSession }}>
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
