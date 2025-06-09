'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useAppSelector } from '@/shared/redux/hook'
import { Loader2, ShieldCheck } from 'lucide-react'
import clsx from 'clsx'

export type OtpAction = 'VERIFY_ACCOUNT' | 'CHANGE_PASSWORD' | 'CHANGE_EMAIL'

interface OtpVerificationModalProps {
  userId: string | number
  action: OtpAction
  newPassword?: string
  newEmail?: string
  onVerified: () => void
}

export default function OtpVerificationModal({
  userId,
  action,
  newPassword,
  newEmail,
  onVerified,
}: OtpVerificationModalProps) {
  const token = useAppSelector((state) => state.auth.token)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    if (!otp) return toast.warning('Vui lòng nhập mã OTP')
    setLoading(true)

    try {
      let verifyRes
      if (action === 'VERIFY_ACCOUNT') {
        verifyRes = await fetch(
          `http://localhost:8080/techshop/user/verify?userId=${userId}&otp=${otp}`,
          { method: 'POST' },
        )
      } else if (action === 'CHANGE_PASSWORD') {
        verifyRes = await fetch(
          `http://localhost:8080/techshop/user/${userId}/changePassword?newPassword=${newPassword}&otp=${otp}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
      } else if (action === 'CHANGE_EMAIL') {
        verifyRes = await fetch(
          `http://localhost:8080/techshop/user/${userId}/changeEmail?newEmail=${newEmail}&otp=${otp}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
      }

      const result = await verifyRes?.json().catch(() => null)

      if (verifyRes?.ok) {
        toast.success(result?.message || 'Xác minh thành công!')
        onVerified()
      } else {
        toast.error(result?.message || 'Mã OTP không đúng hoặc đã hết hạn.')
      }
    } catch {
      toast.error('Lỗi mạng khi xác minh OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `http://localhost:8080/techshop/otp/generate?action=${action}&userId=${userId}`,
        { method: 'POST' },
      )

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      res.ok ? toast.success('Mã OTP đã được gửi lại.') : toast.error('Không thể gửi lại OTP.')
    } catch {
      toast.error('Lỗi mạng khi gửi lại OTP.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-col items-center text-center">
          <ShieldCheck className="mb-2 h-10 w-10 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Xác minh OTP</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Vui lòng nhập mã OTP đã gửi đến email của bạn.
          </p>
        </div>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mt-5 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-center text-lg font-semibold tracking-widest text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="123456"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className={clsx(
            'mt-5 flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50',
          )}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang xác minh...
            </span>
          ) : (
            'Xác nhận'
          )}
        </button>

        <button
          onClick={handleResend}
          disabled={loading}
          className="mt-3 w-full text-center text-sm font-medium text-blue-600 hover:underline disabled:opacity-50"
        >
          Gửi lại mã OTP
        </button>
      </div>
    </div>
  )
}
