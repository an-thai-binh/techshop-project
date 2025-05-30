import Link from 'next/link'
import { register } from './action'

type Props = {
  searchParams: {
    [key: string]: string | undefined
  }
}

export default async function RegisterPage({ searchParams }: Props) {
  const next = searchParams?.next || '/auth/login'

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white/50 p-8 shadow-lg backdrop-blur-sm transition hover:shadow-xl">
        <h2 className="text-center text-3xl font-bold text-gray-800">Tạo tài khoản mới</h2>
        <p className="text-center text-sm text-gray-500">Điền đầy đủ thông tin để đăng ký</p>

        <form action={register} className="space-y-4">
          <input type="hidden" name="next" value={next} />

          <input
            name="username"
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full rounded border border-gray-300 bg-gray-50 p-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded border border-gray-300 bg-gray-50 p-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            className="w-full rounded border border-gray-300 bg-gray-50 p-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
          <input
            name="fullName"
            type="text"
            placeholder="Họ và tên"
            className="w-full rounded border border-gray-300 bg-gray-50 p-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
          <input
            name="phoneNumber"
            type="text"
            placeholder="Số điện thoại"
            className="w-full rounded border border-gray-300 bg-gray-50 p-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            name="birthYear"
            type="number"
            placeholder="Năm sinh"
            className="w-full rounded border border-gray-300 bg-gray-50 p-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select
            name="gender"
            className="w-full rounded border border-gray-300 bg-gray-50 p-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>

          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Đăng ký
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
