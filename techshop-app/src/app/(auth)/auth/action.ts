'use server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '@/middleware'
import { API_URL } from '@/api'

interface ForgotPasswordState {
  success: boolean
  message: string
}

interface LoginState {
  message: string
  success: boolean
  redirectTo?: string
}

interface RegisterState {
  success: boolean
  message: string
  redirectTo?: string
}

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const callbackUrl = formData.get('next')?.toString() || '/'
  const identifier = formData.get('identifier')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  try {
    const res = await fetch('http://localhost:8080/techshop/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const error = await res.json().catch(() => null)
      return {
        success: false,
        message: error?.message || `Đăng nhập thất bại: ${res.status}`,
      }
    }

    const { data } = await res.json()
    ;(await cookies()).set('token', data.token, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    })

    return {
      success: true,
      message: 'Đăng nhập thành công!',
      redirectTo: callbackUrl,
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return {
      success: false,
      message: 'Lỗi hệ thống. Vui lòng thử lại.',
    }
  }
}

// Phương thức đăng kí
export async function register(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const callbackUrl = formData.get('next')?.toString() || '/auth/login'

  const payload = {
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    fullName: formData.get('fullName'),
    birthYear: parseInt(formData.get('birthYear') as string, 10),
    gender: formData.get('gender'),
  }

  try {
    const res = await fetch('http://localhost:8080/techshop/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const error = await res.json().catch(() => null)
      return {
        success: false,
        message: error?.message || `Đăng ký thất bại (${res.status})`,
      }
    }

    const { data } = await res.json()

    // Nếu có token trả về sau đăng ký
    if (data?.token) {
      ;(await cookies()).set('token', data.token, {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      })
    }

    return {
      success: true,
      message: 'Đăng ký thành công!',
      redirectTo: callbackUrl,
    }
  } catch {
    return {
      success: false,
      message: 'Lỗi hệ thống. Vui lòng thử lại.',
    }
  }
}

// Phương thức forgotPassword
export async function forgotPassword(
  prevState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const email = formData.get('email')?.toString()

  if (!email) {
    return {
      success: false,
      message: 'Vui lòng nhập email hợp lệ.',
    }
  }

  try {
    const res = await fetch('http://localhost:8080/techshop/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const error = await res.json().catch(() => null)
      return {
        success: false,
        message: error?.message || `Không gửi được email (${res.status})`,
      }
    }

    return {
      success: true,
      message: 'Đã gửi email hướng dẫn đặt lại mật khẩu!',
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return {
      success: false,
      message: 'Lỗi hệ thống. Vui lòng thử lại.',
    }
  }
}

// Phương thức getUserProfile
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

// phương thức updateUserProfile
export async function updateUserProfile(formData: FormData) {
  const payload = {
    fullName: formData.get('fullName'),
    phoneNumber: formData.get('phoneNumber'),
    birthYear: Number(formData.get('birthYear')),
    gender: formData.get('gender'),
  }

  const res = await fetch('http://localhost:8080/techshop/user/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    return {
      success: false,
      message: error?.message || `Cập nhật thất bại (${res.status})`,
    }
  }

  return {
    success: true,
    message: 'Cập nhật thành công!',
  }
}
