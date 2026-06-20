import './globals.css'
import React from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Layout used by page components. Providers are mounted once in `src/App.tsx`.
  return <>{children}</>
}
