"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type AuthContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <AuthContext.Provider value={{ isOpen, open, close }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthModal() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuthModal must be used within AuthProvider")
  return ctx
}

export default AuthContext
