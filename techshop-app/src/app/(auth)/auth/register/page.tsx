// app/auth/register/page.tsx
'use client'

import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md">
      <h2 className="text-center text-2xl font-semibold text-gray-800">Đăng ký tài khoản</h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Họ và tên"
          className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-3 text-white transition hover:bg-blue-700"
        >
          Đăng ký
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Đã có tài khoản?{' '}
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  )
}
