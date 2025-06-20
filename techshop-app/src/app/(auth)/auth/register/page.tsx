'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { register } from '@/app/(auth)/auth/action'
import OtpVerificationModal from '@/component/common/OtpModal'
import { z } from 'zod'

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Tên đăng nhập quá ngắn')
    .max(30, 'Tên đăng nhập tối đa 30 ký tự')
    .regex(/^[a-zA-Z0-9_]+$/, 'Tên đăng nhập chỉ chứa chữ, số, gạch dưới'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự').max(100, 'Mật khẩu quá dài'),
  fullName: z.string().min(1, 'Vui lòng nhập họ tên').max(50, 'Họ tên quá dài'),
  phoneNumber: z
    .string()
    .regex(/^0\d{9}$/, 'Số điện thoại không hợp lệ')
    .optional(),
  birthYear: z
    .string()
    .regex(/^(19|20)\d{2}$/, 'Năm sinh phải từ 1900 trở đi')
    .optional(),
  gender: z.enum(['Male', 'Female', 'other'], { errorMap: () => ({ message: 'Chọn giới tính' }) }),
})

function useCheckAvailability(value: string, type: 'email' | 'username') {
  const [available, setAvailable] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (!value || value.length < 3) {
      setAvailable(null)
      return
    }

    const timeout = setTimeout(async () => {
      setChecking(true)
      try {
        const url =
          type === 'email'
            ? `http://localhost:8080/techshop/user/checkEmail?email=${value}`
            : `http://localhost:8080/techshop/user/checkUsername?username=${value}`

        const res = await fetch(url)
        const data = await res.json()
        setAvailable(data.success)
      } catch {
        setAvailable(false)
      } finally {
        setChecking(false)
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [value, type])

  return { available, checking }
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const next = searchParams?.next || '/auth/login'
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const { available: emailAvailable } = useCheckAvailability(email, 'email')
  const { available: usernameAvailable } = useCheckAvailability(username, 'username')

  const [formValid, setFormValid] = useState(false)

  const [state, formAction, isPending] = useActionState(register, {
    success: false,
    message: '',
    userId: '',
  })

  const [showOtpModal, setShowOtpModal] = useState(false)

  useEffect(() => {
    const formData = new FormData(formRef.current!)
    const values = Object.fromEntries(formData.entries())
    const parsed = registerSchema.safeParse(values)
    setFormValid(parsed.success && emailAvailable !== false && usernameAvailable !== false)
  }, [email, username, emailAvailable, usernameAvailable])

  useEffect(() => {
    if (state.success) {
      toast.success(state.message)
      setShowOtpModal(true)

      const sendOtp = async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/techshop/otp/generate?action=verify&userId=${state.userId}`,
            { method: 'POST' },
          )
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          res.ok ? toast.success('Mã OTP đã được gửi.') : toast.error('Không thể gửi lại OTP.')
        } catch {
          toast.error('Lỗi mạng khi gửi OTP.')
        }
      }

      sendOtp()
    } else if (state.message) {
      toast.error(state.message)
    }
  }, [state])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(formRef.current!)
    const values = Object.fromEntries(formData.entries())
    const parsed = registerSchema.safeParse(values)

    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message)
      return
    }

    if (emailAvailable === false) {
      toast.error('Email này đã được sử dụng.')
      return
    }

    if (usernameAvailable === false) {
      toast.error('Tên đăng nhập đã tồn tại.')
      return
    }

    formAction(formData)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white/50 p-8 shadow-lg backdrop-blur-sm transition hover:shadow-xl">
        <h2 className="text-center text-3xl font-bold text-gray-800">Tạo tài khoản mới</h2>
        <p className="text-center text-sm text-gray-500">Điền đầy đủ thông tin để đăng ký</p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="next" value={next} />

          <div>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tên đăng nhập"
              className={`w-full rounded border bg-gray-50 px-4 py-3 text-sm font-semibold text-black focus:outline-none focus:ring-1 ${
                usernameAvailable === false
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              required
            />
            {usernameAvailable === false && (
              <p className="mt-1 text-sm text-red-500">Tên đăng nhập đã tồn tại.</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`w-full rounded border bg-gray-50 px-4 py-3 text-sm font-semibold text-black focus:outline-none focus:ring-1 ${
                emailAvailable === false
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              required
            />
            {emailAvailable === false && (
              <p className="mt-1 text-sm text-red-500">Email này đã được sử dụng.</p>
            )}
          </div>

          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />

          <input
            name="fullName"
            type="text"
            placeholder="Họ và tên"
            className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />

          <input
            name="phoneNumber"
            type="text"
            placeholder="Số điện thoại"
            className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <input
            name="birthYear"
            type="number"
            placeholder="Năm sinh"
            className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <select
            name="gender"
            className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-semibold text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="other">Khác</option>
          </select>

          <button
            type="submit"
            disabled={isPending || !formValid}
            className="w-full rounded bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      {showOtpModal && state.userId && (
        <OtpVerificationModal
          userId={state.userId}
          onVerified={() => {
            setShowOtpModal(false)
            router.push('/auth/login')
          }}
          action="VERIFY_ACCOUNT"
        />
      )}
    </div>
  )
}
