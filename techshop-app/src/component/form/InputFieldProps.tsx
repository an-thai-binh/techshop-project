import React, { forwardRef } from 'react'
import { UserForm } from '@/app/(main)/profile/info/page'

export type InputFieldProps = {
  name: keyof UserForm
  label: string
  value?: string
  setValue: React.Dispatch<React.SetStateAction<UserForm>>
  type?: string
  hint?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ name, label, value, setValue, type = 'text', hint, ...rest }, ref) => {
    return (
      <div>
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300"
          title={hint}
        >
          {label}
        </label>
        <input
          id={name}
          name={name}
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => setValue((f) => ({ ...f, [name]: e.target.value }))}
          className="w-full rounded border border-gray-300 bg-gray-50 p-3 text-sm text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          {...rest}
        />
      </div>
    )
  },
)

InputField.displayName = 'InputField'
export default InputField
