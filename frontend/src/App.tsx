import React, { useEffect, useState } from 'react'
import Home from '@/app/page'
import Dashboard from '@/app/dashboard'
import { AuthProvider } from '@/context/auth-context'
import AuthenticationModal from '@/components/auth-modal'

export default function App() {
  const [path, setPath] = useState<string>(typeof window !== 'undefined' ? window.location.pathname : '/')

  useEffect(() => {
    const onLocation = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onLocation)
    return () => window.removeEventListener('popstate', onLocation)
  }, [])

  return (
    <AuthProvider>
      <AuthenticationModal />
      {path === '/dashboard' ? <Dashboard /> : <Home />}
    </AuthProvider>
  )
}
