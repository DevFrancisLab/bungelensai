import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/app/page'
import Dashboard from '@/app/dashboard'
import { AuthProvider } from '@/context/auth-context'
import AuthenticationModal from '@/components/auth-modal'
import { GuestProvider } from '@/context/guest-context'
import GuestModal from '@/components/guest-modal'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GuestProvider>
          <AuthenticationModal />
          <GuestModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </GuestProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
