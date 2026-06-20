import axios from 'axios'

// Base URL for Django backend API. Use Vite env var `VITE_API_BASE_URL` in browser builds.
const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:8000/api'

// Create axios instance — send cookies with every request so server can read HttpOnly refresh cookie
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Refresh handling state
let isRefreshing = false
let refreshPromise = null
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Request interceptor: do not read localStorage; Authorization header should be set by AuthContext when access token is available in memory.
api.interceptors.request.use((config) => config, (error) => Promise.reject(error))

// Response interceptor: try refreshing tokens on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If no response or not 401, reject
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error)
    }

    // Avoid retrying token refresh endpoint itself
      if (originalRequest.url && originalRequest.url.includes('/auth/token/refresh')) {
        // refresh attempt failed or original request was the refresh endpoint; do not try to refresh again
        return Promise.reject(error)
      }

    if (originalRequest._retry) {
      // already retried
      return Promise.reject(error)
    }

    if (isRefreshing) {
      // queue the request until refresh completes
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
        .catch((err) => Promise.reject(err))
    }

    originalRequest._retry = true
    isRefreshing = true

    // attempt token refresh — server will read HttpOnly cookie and return new access (and set a new refresh cookie)
    refreshPromise = api
      .post('/auth/token/refresh/', {})
      .then((res) => {
        const access = res.data?.access
        if (!access) throw new Error('No access token in refresh response')
        api.defaults.headers.common.Authorization = `Bearer ${access}`
        // notify app that a new access token is available
        try {
          window.dispatchEvent(new CustomEvent('auth:access-updated', { detail: access }))
        } catch (e) {}
        processQueue(null, access)
        return access
      })
      .catch((err) => {
        processQueue(err, null)
        // notify app that refresh failed so it can logout silently
        try {
          window.dispatchEvent(new CustomEvent('auth:refresh-failed'))
        } catch (e) {}
        throw err
      })
      .finally(() => {
        isRefreshing = false
        refreshPromise = null
      })

    try {
      const newAccess = await refreshPromise
      originalRequest.headers = originalRequest.headers || {}
      originalRequest.headers.Authorization = `Bearer ${newAccess}`
      return api(originalRequest)
    } catch (err) {
      return Promise.reject(err)
    }
  },
)

export default api
