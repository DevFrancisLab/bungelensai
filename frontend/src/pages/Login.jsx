import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '../auth/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const from = location.state?.from?.pathname || '/dashboard'

  async function handleSubmit(e) {
    e.preventDefault()
    if (loading) return
    setError(null)
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    setLoading(true)
    try {
      await login(email, password)
      setLoading(false)
      navigate(from, { replace: true })
    } catch (err) {
      setLoading(false)
      const resp = err?.response?.data
      let msg = 'Sign in failed.'
      if (resp) {
        if (typeof resp === 'string') msg = resp
        else if (resp.detail) msg = resp.detail
        else if (typeof resp === 'object') {
          msg = Object.entries(resp)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
            .join(' | ')
        }
      } else if (err?.message) msg = err.message
      setError(String(msg))
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {error ? <div className="text-destructive text-sm">{error}</div> : null}

        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <><Spinner className="size-4" /> Signing in…</> : 'Sign In'}
          </Button>
        </div>
      </form>
    </div>
  )
}
