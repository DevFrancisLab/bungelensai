import api from '../api/axios'

// New cookie-based auth flow:
// - Refresh token is stored in an HttpOnly cookie set by the backend.
// - Access token is returned in the response body and should be stored in memory by the app.

async function register(email, password) {
  const payload = { email, password }
  // withCredentials already set on axios instance; backend will set refresh cookie
  const res = await api.post('/auth/register/', payload)
  const data = res.data || {}
  // Expect { user, access }
  return data
}

async function login(email, password) {
  const payload = { email, password }
  const res = await api.post('/auth/login/', payload)
  const data = res.data || {}
  // Expect { access }
  return data
}

async function logout() {
  // Ask backend to clear refresh cookie
  try {
    await api.post('/auth/logout/', {})
  } catch (e) {
    // ignore network errors — still clear client state
  }
}

async function refreshToken() {
  // Call refresh endpoint; backend will read HttpOnly cookie and return new access
  const res = await api.post('/auth/token/refresh/', {})
  const data = res.data || {}
  const access = data.access
  if (!access) throw new Error('Refresh did not return an access token')
  return { access }
}

export default {
  register,
  login,
  logout,
  refreshToken,
}
