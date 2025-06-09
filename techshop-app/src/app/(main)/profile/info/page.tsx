'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
import { toast } from 'sonner'
import { getUserProfile, updateUserProfile } from '@/app/(auth)/auth/action'
import InputField from '@/component/form/InputFieldProps'
import { SelectField } from '@/component/form/SelectField'
import { Loader2 } from 'lucide-react'

export type Gender = 'male' | 'female' | 'other' | ''

export type UserForm = {
  username?: string
  email?: string
  newEmail?: string
  password?: string
  newPassword?: string
  confirmPassword?: string
  fullName: string
  phoneNumber: string
  birthYear: string
  gender: Gender
}
export type User = {
  username: string
  email: string
  phoneNumber?: string
  fullName?: string
  birthYear?: number
  gender?: Gender
}

export default function InfoPage() {
  const [user, setUser] = useState<User | null>(null)
  const [form, setForm] = useState<UserForm>({
    fullName: '',
    phoneNumber: '',
    birthYear: '',
    gender: '',
  })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function fetchData() {
      const res = await getUserProfile()
      const data: User = res?.data
      if (data) {
        setUser(data)
        setForm({
          fullName: data.fullName ?? '',
          phoneNumber: data.phoneNumber ?? '',
          birthYear: data.birthYear?.toString() ?? '',
          gender: data.gender ?? '',
        })
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (firstInputRef.current) firstInputRef.current.focus()
  }, [loading])

  const isFormChanged =
    user &&
    JSON.stringify(form) !==
      JSON.stringify({
        fullName: user.fullName ?? '',
        phoneNumber: user.phoneNumber ?? '',
        birthYear: user.birthYear?.toString() ?? '',
        gender: user.gender ?? '',
      })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setUpdating(true)

    if (!form.fullName.trim()) {
      toast.warning('Vui lòng nhập họ và tên.')
      setUpdating(false)
      return
    }

    if (form.birthYear && isNaN(Number(form.birthYear))) {
      toast.warning('Năm sinh phải là số.')
      setUpdating(false)
      return
    }

    const formData = new FormData()
    formData.append('fullName', form.fullName)
    formData.append('phoneNumber', form.phoneNumber)
    formData.append('birthYear', form.birthYear)
    formData.append('gender', form.gender)
    const res = await updateUserProfile(formData)
    setUpdating(false)

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    res.success ? toast.success(res.message) : toast.error(res.message)
  }

  if (loading) {
    return (
      <div className="flex size-full items-center justify-center bg-white/70 px-4 py-10 dark:bg-gray-900">
        <div className="w-full max-w-4xl animate-pulse space-y-6 rounded-xl border border-gray-200 bg-white/50 px-6 py-8 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-6">
            <div className="h-24 w-24 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="mt-4 h-6 w-32 rounded bg-gray-300 dark:bg-gray-700 sm:mt-0" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <div className="h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-700" />
                <div className="h-10 w-full rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            ))}
          </div>

          <div className="flex w-full items-center justify-center pt-4">
            <div className="h-10 w-40 rounded bg-blue-300 dark:bg-blue-800" />
          </div>
        </div>
      </div>
    )
  }
  if (!user) return <div className="p-10 text-center text-red-500">Không thể tải người dùng.</div>

  return (
    <div className="flex size-full items-start justify-center bg-white/70 px-4 py-10 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl space-y-6 rounded-xl border border-gray-200 bg-white/50 px-6 py-8 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50"
      >
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600 shadow-inner dark:bg-blue-900/20 dark:text-blue-300">
            {user.fullName?.[0] || user.username[0]}
          </div>
          <div className="mt-4 text-center sm:mt-0 sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.username}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ReadOnlyField label="Tên đăng nhập" value={user.username} />
          <ReadOnlyField label="Email" value={user.email} />
          <InputField
            name="fullName"
            label="Họ và tên"
            value={form.fullName}
            setValue={setForm}
            ref={firstInputRef}
            hint="Thông tin này sẽ hiển thị trên hóa đơn."
          />
          <InputField
            name="phoneNumber"
            label="Số điện thoại"
            value={form.phoneNumber}
            setValue={setForm}
          />
          <InputField
            name="birthYear"
            label="Năm sinh"
            value={form.birthYear}
            setValue={setForm}
            type="text"
          />
          <SelectField name="gender" label="Giới tính" value={form.gender} setValue={setForm} />
        </div>

        <div className="flex w-full items-center justify-center pt-4">
          <button
            type="submit"
            disabled={updating || !isFormChanged}
            className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {updating ? 'Đang cập nhật...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  )
}

const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">{label}</p>
    <input
      value={value}
      disabled
      className="w-full rounded border border-gray-300 bg-gray-100 p-3 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
    />
  </div>
)
