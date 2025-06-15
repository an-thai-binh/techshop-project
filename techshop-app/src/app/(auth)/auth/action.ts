'use server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '@/middleware'
import { API_URL } from '@/api'

interface LoginState {
  message: string
  success: boolean
  userId?: string
  isVerified?: boolean
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

    const body = await res.json().catch(() => null)
    console.log(body)
    if (body?.data && !body.data.isVerified && body.data.userId) {
      return {
        success: false,
        message: body.message || 'Tài khoản chưa xác minh.',
        userId: body.data.userId,
        isVerified: body.data.isVerified,
        redirectTo: '',
      }
    }

    if (!res.ok) {
      return {
        success: false,
        message: body?.message || `Đăng nhập thất bại: ${res.status}`,
      }
    }

    const { data } = body
    ;(await cookies()).set('token', data.token, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    })
    ;(await cookies()).set('refreshToken', data.refreshToken, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
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
interface RegisterState {
  success: boolean
  message: string
  userId?: string
  redirectTo?: string
}

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
      userId: data.id,
    }
  } catch {
    return {
      success: false,
      message: 'Lỗi hệ thống. Vui lòng thử lại.',
    }
  }
}

// Phương thức forgotPassword
interface ForgotPasswordState {
  success: boolean
  message: string
}

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
  // console.log(userId)
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
  const token = (await cookies()).get('token')?.value
  if (!token) throw new Error('No token found')

  const decoded = jwt.decode(token) as TokenPayload
  const userId = decoded?.sub || decoded?.sub
  // console.log(userId)
  if (!userId) throw new Error('Cannot extract user ID from token')
  const payload = {
    fullName: formData.get('fullName'),
    phoneNumber: formData.get('phoneNumber'),
    birthYear: Number(formData.get('birthYear')),
    gender: formData.get('gender'),
  }

  const res = await fetch(`http://localhost:8080/techshop/user/updateInfo/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
    userId,
  }
}

// export async function changePassword(formData: FormData) {
//   const token = (await cookies()).get('token')?.value
//   if (!token) return { success: false, message: 'Không tìm thấy token' }
//
//   const decoded = jwt.decode(token) as TokenPayload
//   const userId: string = decoded?.sub
//   if (!userId) return { success: false, message: 'Không thể lấy user ID từ token' }
//
//   const newPassword = formData.get('newPassword') as string
//   const confirmPassword = formData.get('confirmPassword') as string
//   const otp = formData.get('otp') as string
//
//   if (!newPassword || !confirmPassword || !otp) {
//     return { success: false, message: 'Thiếu thông tin bắt buộc.' }
//   }
//
//   if (newPassword !== confirmPassword) {
//     return { success: false, message: 'Mật khẩu xác nhận không khớp.' }
//   }
//
//   const res = await fetch(
//     `http://localhost:8080/techshop/user/${userId}/changePassword?newPassword=${newPassword}&otp=${otp}`,
//     {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   )
//
//   const result = await res.json().catch(() => null)
//
//   if (!res.ok) {
//     return {
//       success: false,
//       message: result?.message || `Đổi mật khẩu thất bại (${res.status})`,
//     }
//   }
//
//   return {
//     success: true,
//     message: result?.message || 'Đổi mật khẩu thành công!',
//     userId,
//   }
// }
//
// export async function changeEmailAction(formData: FormData) {
//   const token = (await cookies()).get('token')?.value
//
//   if (!token) return { success: false, message: 'Không tìm thấy token' }
//
//   const decoded = jwt.decode(token) as TokenPayload
//   const userId = decoded?.sub
//   if (!userId) return { success: false, message: 'Không thể lấy user ID từ token' }
//
//   const newEmail = formData.get('newEmail') as string
//   const otp = formData.get('otp') as string
//
//   if (!newEmail || !otp) {
//     return { success: false, message: 'Thiếu email hoặc mã OTP.' }
//   }
//
//   const res = await fetch(
//     `http://localhost:8080/techshop/user/${userId}/changeEmail?newEmail=${encodeURIComponent(newEmail)}&otp=${otp}`,
//     {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   )
//
//   const result = await res.json().catch(() => null)
//
//   if (!res.ok) {
//     return {
//       success: false,
//       message: result?.message || `Thay đổi email thất bại (${res.status})`,
//     }
//   }
//
//   return {
//     success: true,
//     message: result?.message || 'Email đã được thay đổi thành công!',
//   }
// }
export async function getUserId() {
  const token = (await cookies()).get('token')?.value
  if (!token) throw new Error('No token found')

  const decoded = jwt.decode(token) as TokenPayload
  const userId = decoded?.sub || decoded?.sub
  if (!userId) throw new Error('Cannot extract user ID from token')

  return userId as unknown as number
}
