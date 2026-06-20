import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import authService from './authService'
import api from '../api/axios'

const AuthContext = createContext(undefined)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null))
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!(typeof window !== 'undefined' && localStorage.getItem('accessToken')))
  const [loading, setLoading] = useState(true)

  // helper to set tokens in memory + axios defaults
  const applyTokens = useCallback((tokens) => {
    if (!tokens) return
    const { access } = tokens
    if (access) {
      setAccessToken(access)
      api.defaults.headers.common.Authorization = `Bearer ${access}`
      setIsAuthenticated(true)
    }
  }, [])

  // Attempt to load session from storage on mount
  useEffect(() => {
    async function init() {
      try {
        const storedAccess = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
        const storedRefresh = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null
        if (storedAccess) {
          // set axios header for initial requests
          api.defaults.headers.common.Authorization = `Bearer ${storedAccess}`
          setAccessToken(storedAccess)
          setIsAuthenticated(true)

          // Optionally, try to fetch user profile if you have an endpoint (not required)
          try {
            const resp = await api.get('/auth/profile/')
            setUser(resp.data)
          } catch (err) {
            // profile endpoint may not exist; ignore silently
          }
        } else if (storedRefresh) {
          // try refresh once
          try {
            const tokens = await authService.refreshToken()
            applyTokens(tokens)
          } catch (e) {
            // refresh failed
            authService.clearAuthTokens && authService.clearAuthTokens()
            setIsAuthenticated(false)
            setUser(null)
          }
        }
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [applyTokens])

  // register wrapper
  async function register(email, password) {
    const data = await authService.register(email, password)
    if (data.tokens) {
      applyTokens({ access: data.tokens.access })
    }
    if (data.user) setUser(data.user)
    return data
  }

  // login wrapper
  async function login(email, password) {
    const data = await authService.login(email, password)
    if (data.tokens) {
      applyTokens({ access: data.tokens.access })
    }
    // If backend returns user, store it; otherwise try to fetch profile
    if (data.user) setUser(data.user)
    else {
      try {
        const resp = await api.get('/auth/profile/')
        setUser(resp.data)
      } catch (e) {
        // ignore
      }
    }
    return data
  }

  // logout wrapper
  function logout() {
    authService.logout()
    setUser(null)
    setAccessToken(null)
    setIsAuthenticated(false)
    delete api.defaults.headers.common.Authorization
  }

  const value = {
    user,
    accessToken,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
