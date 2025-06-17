'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import ToggleThemeButton from '@/component/button/ToggleThemeButton'
import { BanknotesIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAppDispatch } from '@/shared/redux/hook'
import { removeTokenFromCookie } from '@/features/auth/authThunks'
import Link from 'next/link'
import { useUIContext } from '@/shared/context/UIContext'
import React from 'react'
import ModalFrame from '@/component/common/ModalFrame'

export default function DropdownUser() {
  const appDispatch = useAppDispatch()
  const { state, dispatch } = useUIContext()
  const handleClick = () => {
    if (state.isDropdownVisible && state.dropdownType === 'user') {
      dispatch({
        type: 'CLOSE_DROPDOWN',
      })
    }
  }
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scaleY: 0.95 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        className="absolute right-10 top-16 z-50 w-[280px] rounded-md border border-white/20 bg-white/90 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80"
      >
        <div className="flex flex-col gap-3 p-4 text-sm text-gray-800 dark:text-white">
          {/* Header */}
          <div className="flex items-center justify-center pb-1">
            <h1 className="text-lg font-bold tracking-wide">TÀI KHOẢN</h1>
          </div>

          <div className="space-y-1.5">
            {/* Cài đặt & Theme Toggle */}
            <div className="flex items-center justify-between rounded-md bg-gray-100/50 px-3 py-2 transition hover:bg-gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-700">
              <span className="font-medium">Giao diện</span>
              <ToggleThemeButton />
            </div>

            {/* Thông tin cá nhân */}
            <Link onClick={() => handleClick()} href="/profile/info">
              <div className="group relative flex items-center justify-between rounded-md px-3 py-2 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="font-medium transition-transform group-hover:translate-x-1">
                  Thông tin cá nhân
                </span>
                <UserIcon className="h-5 w-5 text-gray-500 group-hover:text-blue-500" />
              </div>
            </Link>

            {/* Lịch sử thanh toán */}
            <Link onClick={() => handleClick()} href={'/profile/orders'}>
              <div className="group relative flex items-center justify-between rounded-md px-3 py-2 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="font-medium transition-transform group-hover:translate-x-1">
                  Lịch sử thanh toán
                </span>
                <BanknotesIcon className="h-5 w-5 text-gray-500 group-hover:text-green-500" />
              </div>
            </Link>
          </div>

          {/* Đăng xuất */}
          <div className="pt-2">
            <button
              onClick={() => dispatch({ type: 'OPEN_MODAL', payload: { modalType: 'logout' } })}
              className="w-full rounded-md bg-gradient-to-r from-red-600 to-red-500 px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90 active:scale-95"
            >
              Đăng xuất
            </button>
            {state.isModalVisible && state.modalType === 'logout' && (
              <ModalFrame
                open={true}
                onClose={() => dispatch({ type: 'CLOSE_ALL' })}
                onConfirm={() => appDispatch(removeTokenFromCookie())}
                title={'Đăng xuất'}
                description={'Bạn có chắc chắn muốn đăng xuất?'}
              />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
