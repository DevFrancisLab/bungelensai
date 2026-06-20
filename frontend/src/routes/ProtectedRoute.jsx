import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useGuestModal } from '@/context/guest-context'
import { Spinner } from '@/components/ui/spinner'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const { guestActive } = useGuestModal()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="size-8" />
      </div>
    )
  }

  // Allow access when authenticated or when a guest session is active
  if (!isAuthenticated && !guestActive) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Support either an explicit child element or nested routes via <Outlet />
  return children ? children : <Outlet />
}
