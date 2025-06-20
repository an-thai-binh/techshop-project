'use client'

import Link from 'next/link'
import { MailIcon } from '@heroui/shared-icons'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { forgotPassword } from '@/app/(auth)/auth/action'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ.' }),
})

function useCheckEmail(email: string) {
  const [available, setAvailable] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (!email || email.length < 5) {
      setAvailable(null)
      return
    }

    const timeout = setTimeout(async () => {
      setChecking(true)
      try {
        const res = await fetch(
          `http://localhost:8080/techshop/user/checkEmail?email=${encodeURIComponent(email)}`,
        )
        const data = await res.json()
        setAvailable(!data.success) // success = true nếu email tồn tại
      } catch {
        setAvailable(false)
      } finally {
        setChecking(false)
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [email])

  return { available, checking }
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const { available, checking } = useCheckEmail(email)

  const [state, formAction, isPending] = useActionState(forgotPassword, {
    success: false,
    message: '',
  })

  useEffect(() => {
    if (state.message) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      state.success ? toast.success(state.message) : toast.error(state.message)
    }
  }, [state])

  // ✅ Kiểm tra Zod format
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    const result = forgotPasswordSchema.safeParse({ email: value })
    if (!result.success) {
      setEmailError(result.error.format().email?._errors?.[0] || 'Email không hợp lệ')
    } else {
      setEmailError('')
    }
  }

  const disableButton = isPending || !!emailError || available === false

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white/50 p-8 shadow-lg backdrop-blur-sm transition hover:shadow-xl">
        <h2 className="text-center text-3xl font-bold text-gray-800">Quên mật khẩu</h2>
        <p className="text-center text-sm text-gray-500">
          Nhập email để nhận hướng dẫn đặt lại mật khẩu
        </p>

        <form action={formAction} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MailIcon className="h-5 w-5" />
            </span>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full rounded border bg-gray-50 py-3 pl-10 pr-4 text-sm font-semibold text-black focus:outline-none focus:ring-1 ${
                emailError || available === false
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              required
            />
            {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
            {!emailError && available === false && (
              <p className="mt-1 text-sm text-red-500">Email không tồn tại trong hệ thống.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={disableButton}
            className="w-full rounded bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Đang gửi...' : 'Gửi yêu cầu đặt lại mật khẩu'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            ← Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}
