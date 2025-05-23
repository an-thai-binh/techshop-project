'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const res = await fetch(`http://localhost:8080/techshop/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      identifier: formData.get('identifier'),
      password: formData.get('password'),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error(res.status.toString())
  }
  const { data } = await res.json()
  cookies().set('token', data.token, {
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 ngày
  })
  return { success: true }
}
export async function getUserProfile() {
  const token = cookies().get('token')?.value

  const res = await fetch(`${process.env.BACKEND_URL}/api/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store', // tránh cache auth
  })

  if (!res.ok) throw new Error('Failed to fetch')

  return res.json()
}
