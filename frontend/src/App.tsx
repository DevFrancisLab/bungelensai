import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/app/page'
import Dashboard from '@/app/dashboard'
import { AuthProvider } from './auth/AuthContext'
import AuthenticationModal from '@/components/auth-modal'
import { AuthProvider as ModalAuthProvider } from '../context/auth-context'
import { GuestProvider } from '@/context/guest-context'
import GuestModal from '@/components/guest-modal'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalAuthProvider>
          <GuestProvider>
            <AuthenticationModal />
            <GuestModal />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
          </GuestProvider>
        </ModalAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
