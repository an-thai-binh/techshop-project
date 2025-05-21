// app/auth/forgot-password/page.tsx
'use client'

import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md">
      <h2 className="text-center text-2xl font-semibold text-gray-800">Quên mật khẩu</h2>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Nhập email để đặt lại mật khẩu"
          className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-3 text-white transition hover:bg-blue-700"
        >
          Gửi yêu cầu
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Quay lại đăng nhập
        </Link>
      </p>
    </div>
  )
}
