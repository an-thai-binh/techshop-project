'use client'

import { useEffect, useState } from 'react'
import { CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface Order {
  id: string
  createdAt: string
  total: number
  status: 'PAID' | 'PENDING' | 'FAILED'
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: 'ORD123456',
          createdAt: '2024-06-01T14:32:00Z',
          total: 1250000,
          status: 'PAID',
        },
        {
          id: 'ORD123457',
          createdAt: '2024-05-28T09:12:00Z',
          total: 450000,
          status: 'PAID',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-1/3 rounded bg-gray-300 dark:bg-gray-700" />
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-2 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="mb-1 h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-600" />
            <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-600" />
          </div>
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return <div className="text-gray-500 dark:text-gray-400">Bạn chưa có đơn hàng nào.</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Lịch sử đơn hàng</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <CreditCardIcon className="h-5 w-5" />
              <span>
                Mã đơn: <strong>{order.id}</strong>
              </span>
            </div>
            {order.status === 'PAID' && (
              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-800/30 dark:text-green-400">
                <CheckCircleIcon className="mr-1 h-4 w-4" />
                Đã thanh toán
              </span>
            )}
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
          </div>
          <div className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-100">
            Tổng tiền: {order.total.toLocaleString('vi-VN')} ₫
          </div>
        </div>
      ))}
    </div>
  )
}
