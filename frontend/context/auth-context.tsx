"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

type AuthMode = 'signin' | 'signup'

type AuthContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  authMode: AuthMode
  setAuthMode: (mode: AuthMode) => void
  isAuthenticated: boolean
  setAuthenticated: (v: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [authMode, setAuthModeState] = useState<AuthMode>('signin')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const setAuthMode = useCallback((mode: AuthMode) => setAuthModeState(mode), [])
  const setAuthenticated = useCallback((v: boolean) => setIsAuthenticated(v), [])

  // Close the auth dialog when the app requests it (programmatic navigation)
  useEffect(() => {
    const onClose = () => setIsOpen(false)
    try {
      window.addEventListener('app:close-dialogs', onClose)
    } catch (e) {}
    return () => {
      try {
        window.removeEventListener('app:close-dialogs', onClose)
      } catch (e) {}
    }
  }, [])

  // Debug: log open state changes to help diagnose overlay issues
  useEffect(() => {
    try { console.debug('[AuthContext] isOpen ->', isOpen) } catch (e) {}
  }, [isOpen])

  return (
    <AuthContext.Provider value={{ isOpen, open, close, authMode, setAuthMode, isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

// (Listener handled inside the provider via useEffect)

export function useAuthModal() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuthModal must be used within AuthProvider")
  return ctx
}

export default AuthContext
