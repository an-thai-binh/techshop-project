'use client'
import { useUIContext } from '@/shared/context/UIContext'
import { useAppSelector } from '@/shared/redux/hook'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import DropdownUser from '@/features/user/components/DropdownUser'
import Link from 'next/link'

export default function UserButton() {
  const { state, dispatch } = useUIContext()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const loading = useAppSelector((state) => state.auth.loading)

  return (
    <div className="flex items-center">
      {loading ? (
        <div className="flex items-center gap-2">
          <UserCircleIcon className="size-7 animate-pulse text-gray-500 dark:text-white" />
          <span className="animate-pulse text-blue-500 dark:text-white">. . .</span>
        </div>
      ) : isAuthenticated ? (
        <>
          <button
            onClick={() => {
              if (state.isDropdownVisible && state.dropdownType === 'user') {
                dispatch({ type: 'TOGGLE_DROPDOWN', payload: { dropdownType: 'user' } })
              } else {
                dispatch({ type: 'OPEN_DROPDOWN', payload: { dropdownType: 'user' } })
              }
            }}
            className="rounded-full p-2 hover:bg-gray-500/50"
          >
            <UserCircleIcon
              className="size-7 text-blue-500 dark:text-white"
              fill="transparent"
              strokeWidth={2.0}
            />
          </button>
          {state.isDropdownVisible && state.dropdownType === 'user' && <DropdownUser />}
        </>
      ) : (
        <Link href={'/auth/login'}>
          <button className="rounded-md ring-2 ring-blue-500 hover:ring-gray-500/50">
            <div className="flex items-center">
              <div className="px-2 py-1">
                <UserCircleIcon
                  className="size-7 text-gray-950/50 dark:text-white"
                  fill="transparent"
                  strokeWidth={2.0}
                />
              </div>
              <div className="px-2 py-1">
                <h1 className="animate-pulse font-semibold text-blue-500 dark:text-white">
                  Đăng nhập
                </h1>
              </div>
            </div>
          </button>
        </Link>
      )}
    </div>
  )
}
