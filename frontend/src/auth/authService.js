import api from '../api/axios'

// Token storage keys must match those used by the axios instance
const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

function setAuthTokens({ access, refresh }) {
  if (typeof window === 'undefined') return
  if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access)
  if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
}

function clearAuthTokens() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

function getRefreshToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

async function register(email, password) {
  const payload = { email, password }
  const res = await api.post('/auth/register/', payload)
  // Expecting { user, tokens: { access, refresh } }
  const data = res.data || {}
  if (data.tokens) {
    setAuthTokens({ access: data.tokens.access, refresh: data.tokens.refresh })
  }
  return data
}

async function login(email, password) {
  const payload = { email, password }
  const res = await api.post('/auth/login/', payload)
  const data = res.data || {}
  // Login endpoint returns { tokens: { access, refresh } }
  if (data.tokens) {
    setAuthTokens({ access: data.tokens.access, refresh: data.tokens.refresh })
  }
  return data
}

function logout() {
  // Clear tokens locally. Server-side logout (token blacklist) can be added later.
  clearAuthTokens()
}

async function refreshToken() {
  const refresh = getRefreshToken()
  if (!refresh) throw new Error('No refresh token available')

  const res = await api.post('/auth/token/refresh/', { refresh })
  const data = res.data || {}
  // SimpleJWT TokenRefreshView returns { access }
  // Our axios implementation expects { access, refresh } optionally
  const access = data.access || data.tokens?.access
  const newRefresh = data.refresh || data.tokens?.refresh || refresh

  if (!access) throw new Error('Refresh did not return an access token')

  setAuthTokens({ access, refresh: newRefresh })
  return { access, refresh: newRefresh }
}

export default {
  register,
  login,
  logout,
  refreshToken,
  setAuthTokens,
  clearAuthTokens,
}
