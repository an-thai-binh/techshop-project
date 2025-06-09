'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import React from 'react'
import { UserCircleIcon, KeyIcon, ClockIcon } from '@heroicons/react/24/outline'
import { MailIcon } from '@heroui/shared-icons'

const sidebarItems = [
  { label: 'Thông tin cá nhân', href: '/profile/info', icon: UserCircleIcon },
  { label: 'Đổi mật khẩu', href: '/profile/changePassword', icon: KeyIcon },
  { label: 'Đổi Email', href: '/profile/changeEmail', icon: MailIcon },
  { label: 'Lịch sử đơn hàng', href: '/profile/orders', icon: ClockIcon },
]

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-[80vh] w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Left Sidebar */}
      <aside className="w-full max-w-xs border-r border-gray-200 bg-white p-6 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">Tài khoản của tôi</h2>
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md dark:bg-blue-500'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-auto rounded-l-sm bg-white p-6 shadow-inner backdrop-blur-sm dark:bg-gray-900/50 md:p-10">
        {children}
      </main>
    </div>
  )
}
