import './globals.css'
import React from 'react'
import { AuthProvider } from '@/context/auth-context'
import { GuestProvider } from '@/context/guest-context'
import AuthenticationModal from '@/components/auth-modal'
import GuestModal from '@/components/guest-modal'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Mount auth/guest providers and their modals so the header/hero buttons
  // can open dialogs or start guest sessions from anywhere in the app.
  return (
    <AuthProvider>
      <GuestProvider>
        <AuthenticationModal />
        <GuestModal />
        {children}
      </GuestProvider>
    </AuthProvider>
  )
}
