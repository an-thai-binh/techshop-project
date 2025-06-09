'use client'

import CartItem from '@/features/cart/components/CartItem'
import { selectCartItems } from '@/features/cart/cartSelectors'
import { useAppSelector } from '@/shared/redux/hook'
import { useEffect, useState } from 'react'

export default function CartListItem() {
  const items = useAppSelector(selectCartItems)
  const [loading, setLoading] = useState(true)

  // 🔁 Giả lập loading
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [])

  const isEmpty = !items || items.length === 0

  return (
    <div className="flex grow items-center justify-center overflow-hidden py-0 pl-1">
      <div className="size-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
        <div className="mx-1 flex flex-col justify-start gap-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonItem key={i} />)
          ) : isEmpty ? (
            <p className="py-4 text-center text-gray-500 dark:text-gray-400">Giỏ hàng trống</p>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>
      </div>
    </div>
  )
}

function SkeletonItem() {
  return (
    <div className="flex animate-pulse gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-20 w-20 rounded bg-gray-300 dark:bg-gray-700" />
      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="h-4 w-2/3 rounded bg-gray-300 dark:bg-gray-600" />
        <div className="h-3 w-1/3 rounded bg-gray-300 dark:bg-gray-600" />
        <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}
