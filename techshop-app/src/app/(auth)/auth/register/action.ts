'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function register(formData: FormData) {
  const callbackUrl = formData.get('next')?.toString() || '/'

  const res = await fetch('http://localhost:8080/techshop/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username: formData.get('username'),
      password: formData.get('password'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      fullName: formData.get('fullName'),
      birthYear: parseInt(formData.get('birthYear') as string, 10),
      gender: formData.get('gender'),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(error?.message || `Đăng ký thất bại (${res.status})`)
  }

  const { data } = await res.json()

  // Nếu backend trả token ngay sau đăng ký
  if (data?.token) {
    ;(await cookies()).set('token', data.token, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    })
  }

  redirect(callbackUrl)
}
