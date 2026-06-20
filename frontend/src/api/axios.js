import axios from 'axios'

// Base URL for Django backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'

// Local storage keys (changeable in one place)
const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

function getAccessToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function getRefreshToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

function setTokens({ access, refresh }) {
  if (typeof window === 'undefined') return
  if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access)
  if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
}

function clearTokens() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
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

// Request interceptor: attach access token when available
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

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
      // refresh attempt failed -> clear tokens and reject
      clearTokens()
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

    const refreshToken = getRefreshToken()

    if (!refreshToken) {
      clearTokens()
      isRefreshing = false
      return Promise.reject(error)
    }

    // attempt token refresh
    refreshPromise = api
      .post('/auth/token/refresh/', { refresh: refreshToken })
      .then((res) => {
        const { access, refresh } = res.data || {}
        if (!access) throw new Error('No access token in refresh response')
        setTokens({ access, refresh })
        api.defaults.headers.common.Authorization = `Bearer ${access}`
        processQueue(null, access)
        return access
      })
      .catch((err) => {
        processQueue(err, null)
        clearTokens()
        throw err
      })
      .finally(() => {
        isRefreshing = false
        refreshPromise = null
      })

    try {
      const newAccess = await refreshPromise
      originalRequest.headers.Authorization = `Bearer ${newAccess}`
      return api(originalRequest)
    } catch (err) {
      return Promise.reject(err)
    }
  },
)

export default api
