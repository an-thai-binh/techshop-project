'use client'

import { createPortal } from 'react-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'

type ModalFrameProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

export default function ModalFrame({
  open,
  onClose,
  title,
  description,
  onConfirm,
  confirmText = 'Xác nhận',
  cancelText = 'Huỷ',
  loading = false,
}: ModalFrameProps) {
  if (!open) return null

  return createPortal(
    <div onClick={onClose} className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute z-10 w-[90%] max-w-sm rounded-xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur dark:border-white/10 dark:bg-gray-950/80 dark:text-white">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-red-500"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-semibold tracking-tight text-black dark:text-white">{title}</h2>

        {description && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{description}</p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : confirmText}
          </button>
        </div>
      </div>
    </div>,

    document.body,
  )
}
