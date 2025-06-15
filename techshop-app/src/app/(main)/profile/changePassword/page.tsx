'use client'

import React, { useState, useTransition } from 'react'
import { toast } from 'sonner'
import OtpVerificationModal from '@/component/common/OtpModal'
import InputField from '@/component/form/InputFieldProps'
import { getUserId } from '@/app/(auth)/auth/action'
import { UserForm } from '@/app/(main)/profile/info/page'

type UserFormForPassword = Pick<UserForm, 'newPassword' | 'confirmPassword'>

export default function ChangePasswordPage() {
  const [form, setForm] = useState<UserFormForPassword>({
    newPassword: '',
    confirmPassword: '',
  })
  const [showOtp, setShowOtp] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSendOtp = () => {
    const { newPassword, confirmPassword } = form

    if (!newPassword || !confirmPassword) {
      toast.warning('Vui lòng nhập đầy đủ mật khẩu.')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.warning('Mật khẩu xác nhận không khớp.')
      return
    }

    startTransition(async () => {
      try {
        const uid = userId ?? (await getUserId())
        setUserId(uid)

        const res = await fetch(
          `http://localhost:8080/techshop/otp/generate?action=CHANGE_PASSWORD&userId=${uid}`,
          { method: 'POST' },
        )

        if (res.ok) {
          toast.success('Mã OTP đã được gửi đến email của bạn.')
          setShowOtp(true)
        } else {
          toast.error('Không thể gửi OTP.')
        }
      } catch {
        toast.error('Lỗi hệ thống. Vui lòng thử lại.')
      }
    })
  }

  return (
    <div className="flex min-h-full w-full items-center justify-center bg-white px-4 py-10 dark:bg-gray-900">
      <div className="w-full max-w-4xl space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl backdrop-blur dark:border-gray-700 dark:bg-gray-800/60">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Đổi mật khẩu</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Nhập mật khẩu mới và xác nhận bằng OTP
          </p>
        </div>

        <InputField
          name="newPassword"
          label="Mật khẩu mới"
          value={form.newPassword}
          setValue={setForm as React.Dispatch<React.SetStateAction<UserForm>>}
          type="password"
          placeholder="••••••••"
        />
        <InputField
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          value={form.confirmPassword}
          setValue={setForm as React.Dispatch<React.SetStateAction<UserForm>>}
          type="password"
          placeholder="••••••••"
        />
        <div className={'flex w-full items-center justify-center'}>
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={isPending || !form.newPassword || !form.confirmPassword}
            className="w-fit rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <h1 className={'text-sm font-bold'}>{isPending ? 'Đang gửi OTP...' : 'Gửi mã OTP'}</h1>
          </button>
        </div>
      </div>
      {showOtp && userId && (
        <OtpVerificationModal
          userId={userId}
          action="CHANGE_PASSWORD"
          newPassword={form.newPassword}
          onVerified={() => {
            toast.success('Đổi mật khẩu thành công!')
            setShowOtp(false)
            setForm({ newPassword: '', confirmPassword: '' })
          }}
        />
      )}
    </div>
  )
}
