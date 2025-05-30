export const API_URL = 'http://localhost:8080/techshop'

export interface apiResponse<T> {
  success: true
  data: T
}
// utils/fetchClient.ts
export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = document.cookie
    .split(';')
    .map((r) => r.trim())
    .find((r) => r.startsWith('token'))
    ?.trim()
    .split('=')[1]
  const res = await fetch(`${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: 'include',
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'API Error')
  }
  return res.json()
}
