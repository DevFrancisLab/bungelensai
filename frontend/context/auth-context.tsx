"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type AuthMode = 'signin' | 'signup'

type AuthContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  authMode: AuthMode
  setAuthMode: (mode: AuthMode) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [authMode, setAuthModeState] = useState<AuthMode>('signin')

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const setAuthMode = useCallback((mode: AuthMode) => setAuthModeState(mode), [])

  return (
    <AuthContext.Provider value={{ isOpen, open, close, authMode, setAuthMode }}>
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
