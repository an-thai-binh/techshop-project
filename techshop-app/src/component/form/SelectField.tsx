import { Gender, UserForm } from '@/app/(main)/profile/page'
import React from 'react'

export const SelectField = ({
  name,
  label,
  value,
  setValue,
}: {
  name: keyof UserForm
  label: string
  value: Gender
  setValue: React.Dispatch<React.SetStateAction<UserForm>>
}) => (
  <div>
    <label
      htmlFor={name}
      className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={(e) => setValue((f) => ({ ...f, [name]: e.target.value as Gender }))}
      className="w-full rounded border border-gray-300 bg-gray-50 p-3 text-sm text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
    >
      <option value="">Chọn giới tính</option>
      <option value="Male">Nam</option>
      <option value="Female">Nữ</option>
      <option value="other">Khác</option>
    </select>
  </div>
)
