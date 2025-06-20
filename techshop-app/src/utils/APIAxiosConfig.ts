import axios from 'axios'
import { EndpointAPI } from '@/api/EndpointAPI'

let isRefreshing = false
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = []
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

const api = axios.create({
  baseURL: EndpointAPI.BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
api.interceptors.request.use(
  (config) => {
    const token = getCookie('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)
api.interceptors.response.use(
  (response) => {
    const res = response.data
    const success = res?.success
    if (!success) throw new Error(res.message || 'API error')
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      try {
        const token = getCookie('refreshToken')
        if (!token) throw new Error('No access token in cookie')

        const res = await axios.post(
          `${EndpointAPI.BaseUrl}/auth/refresh`,
          { token },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        )

        const { token: accessToken, refreshToken } = res.data.data
        setCookie('token', accessToken)
        setCookie('refreshToken', refreshToken)
        processQueue(null, accessToken)
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        deleteCookie('token')
        console.error(err)
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api

// --- Cookie helpers ---
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie.split(';').map((c) => c.trim())
  const match = cookies.find((c) => c.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=')[1]) : null
}

function setCookie(name: string, value: string, days = 1) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; path=/; expires=${expires}; SameSite=Lax`
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`
}
