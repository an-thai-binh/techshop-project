'use client'

import Link from 'next/link'
import { MailIcon } from '@heroui/shared-icons'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { useActionState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { login } from '@/app/(auth)/auth/action'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const next = searchParams.next
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [state, formAction, isPending] = useActionState(login, {
    message: '',
    success: false,
  })

  useEffect(() => {
    if (state.success) {
      router.push(state.redirectTo || '/')
      toast.success(state.message || 'Đăng nhập thành công!')
    } else if (state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white/50 p-8 shadow-lg backdrop-blur-sm transition hover:shadow-xl">
        <h2 className="text-center text-3xl font-bold text-gray-800">Chào mừng trở lại</h2>
        <p className="text-center text-sm text-gray-500">Vui lòng đăng nhập để tiếp tục</p>

        <form action={formAction} ref={formRef} className="space-y-4">
          <input type="hidden" name="next" defaultValue={next} />

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MailIcon className="h-5 w-5" />
            </span>
            <input
              name="identifier"
              type="text"
              placeholder="Email hoặc Tên đăng nhập"
              className="w-full rounded border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              autoComplete="username"
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <LockClosedIcon className="h-5 w-5" />
            </span>
            <input
              name="password"
              type="password"
              placeholder="Mật khẩu"
              className="w-full rounded border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
            Quên mật khẩu?
          </Link>
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  )
}
