'use client'

import Link from 'next/link'
import { MailIcon } from '@heroui/shared-icons'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { forgotPassword } from '@/app/(auth)/auth/action'

export default function ForgotPasswordPage() {
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
              placeholder="Email"
              className="w-full rounded border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
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
