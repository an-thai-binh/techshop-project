import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '@/middleware'
import { API_URL } from '@/api'

export async function getUserProfile() {
  const token = (await cookies()).get('token')?.value
  if (!token) throw new Error('No token found')

  const decoded = jwt.decode(token) as TokenPayload
  const userId = decoded?.sub || decoded?.sub
  console.log(userId)
  if (!userId) throw new Error('Cannot extract user ID from token')

  const res = await fetch(`${API_URL}/user/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('Failed to fetch user profile')

  return res.json()
}
