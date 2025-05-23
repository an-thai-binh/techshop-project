'use client'

import Link from 'next/link'
import { login } from './action'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { fetchTokenFromCookie } from '@/features/auth/authThunks'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/redux/hook'
import { selectToken } from '@/features/auth/authSelectors'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTokenFromCookie())
  }, [dispatch])
  const token = useAppSelector(selectToken)
  console.log('token', token)
  async function handleLogin(formData: FormData) {
    const result = await login(formData)

    if (result) {
      router.push('/')
    } else {
      console.log('Login failed')
    }
  }
  return (
    <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md">
      <h2 className="text-center text-2xl font-semibold text-gray-800">Đăng nhập</h2>

      <form action={handleLogin} className="space-y-4">
        <input
          name={'identifier'}
          type="text"
          placeholder="Email / Username"
          className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />
        <input
          name={'password'}
          type="password"
          placeholder="Mật khẩu"
          className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-3 text-white transition hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
          Quên mật khẩu?
        </Link>
      </div>

      <p className="text-center text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <Link href="/auth/register" className="text-blue-600 hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  )
}
