'use client'

import { useEffect, useState } from 'react'
import {
  CreditCardIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { useAppSelector } from '@/shared/redux/hook'
import { selectUserId } from '@/features/user/userSelectors'
import api from '@/utils/APIAxiosConfig'
import { toast } from 'sonner'

interface Order {
  id: number
  orderTime: string
  totalAmount: number
  status: string
}

interface OrderItemDetailResponse {
  id: number
  productName: string
  quantity: number
  total: number
}

interface OrderDetailResponse {
  id: number
  userId: string
  orderTime: string
  totalAmount: number
  status: string
  orderItemList: OrderItemDetailResponse[]
}

interface UserReview {
  orderItemId: number
  content: string
  rating: number
}

export default function OrdersPage() {
  const userId = useAppSelector(selectUserId)
  const [orders, setOrders] = useState<Order[]>([])
  const [userReviews, setUserReviews] = useState<UserReview[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)
  const [orderDetails, setOrderDetails] = useState<Record<number, OrderDetailResponse>>({})
  const [reviewContent, setReviewContent] = useState('')
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!userId) return

    const fetchOrdersAndReviews = async () => {
      try {
        const [ordersRes, reviewsRes] = await Promise.all([
          api.get(`/order/user/${userId}`),
          api.get(`/reviews/user/${userId}/reviews`),
        ])
        const filteredOrders = ordersRes.data.data.filter(
          (order: { status: string }) => order.status !== 'INVALID',
        )
        setOrders(filteredOrders)
        setUserReviews(reviewsRes.data.data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error('Lỗi tải dữ liệu đơn hàng hoặc đánh giá.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrdersAndReviews()
  }, [userId])

  const handleExpandOrder = async (orderId: number) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null)
      return
    }

    setExpandedOrderId(orderId)

    if (!orderDetails[orderId]) {
      try {
        const res = await api.get(`/order/detail/${orderId}`)
        setOrderDetails((prev) => ({ ...prev, [orderId]: res.data.data }))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error('Không thể tải chi tiết đơn hàng.')
      }
    }
  }

  const getStatusBadge = (status: string) => {
    const base = 'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium'
    switch (status) {
      case 'SUCCESS':
        return (
          <span
            className={`${base} bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400`}
          >
            <CheckCircleIcon className="mr-1 h-4 w-4" /> Đã giao
          </span>
        )
      case 'PENDING':
        return (
          <span
            className={`${base} bg-yellow-100 text-yellow-700 dark:bg-yellow-800/30 dark:text-yellow-400`}
          >
            <ClockIcon className="mr-1 h-4 w-4" /> Đang xử lý
          </span>
        )
      case 'FAILED (quá hạn thanh toán)':
      case 'INVALID':
        return (
          <span className={`${base} bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-400`}>
            <XCircleIcon className="mr-1 h-4 w-4" /> Hủy (quá hạn thanh toán)
          </span>
        )
      default:
        return null
    }
  }

  const hasReviewedOrderItem = (orderItemId: number) =>
    userReviews.some((r) => r.orderItemId === orderItemId)

  const getUserReview = (orderItemId: number) =>
    userReviews.find((r) => r.orderItemId === orderItemId)

  const handleReviewSubmit = async (orderItemId: number) => {
    if (!reviewContent || rating === 0) return toast.warning('Vui lòng nhập đủ nội dung và số sao.')

    setSubmitting(true)
    try {
      await api.post('/reviews', {
        orderItemId,
        content: reviewContent,
        rating,
      })
      toast.success('Đánh giá đã được gửi!')
      setReviewContent('')
      setRating(0)
      setUserReviews((prev) => [...prev, { orderItemId, content: reviewContent, rating }])
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Đánh giá thất bại.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-1/3 rounded bg-gray-300 dark:bg-gray-700" />
        {[...Array(2)].map((_, i) => (
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
                Mã đơn: <strong>ORD{order.id.toString().padStart(6, '0')}</strong>
              </span>
            </div>
            {getStatusBadge(order.status)}
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Ngày đặt: {new Date(order.orderTime).toLocaleDateString('vi-VN')}
          </div>
          <div className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-100">
            Tổng tiền: {Math.round(order.totalAmount).toLocaleString('vi-VN')} ₫
          </div>

          {order.status === 'SUCCESS' && (
            <button
              onClick={() => handleExpandOrder(order.id)}
              className="mt-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {expandedOrderId === order.id ? 'Ẩn chi tiết' : 'Xem chi tiết & Đánh giá'}
            </button>
          )}

          {expandedOrderId === order.id && orderDetails[order.id] && (
            <div className="mt-4 space-y-4">
              {orderDetails[order.id].orderItemList.map((item) => {
                const reviewed = hasReviewedOrderItem(item.id)
                const review = getUserReview(item.id)

                return (
                  <div key={item.id} className="rounded border p-3 dark:border-gray-600">
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      {item.productName})
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Số lượng: <span className={'font-semibold'}>{item.quantity}</span>
                    </div>

                    {reviewed && review ? (
                      <div className="mt-2 rounded bg-gray-100 p-2 dark:bg-gray-900">
                        <div className="mb-1 flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${i <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-200">
                          {review.content}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 space-y-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <StarIcon
                              key={i}
                              className={`h-5 w-5 cursor-pointer ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              onClick={() => setRating(i)}
                            />
                          ))}
                        </div>
                        <textarea
                          rows={2}
                          value={reviewContent}
                          onChange={(e) => setReviewContent(e.target.value)}
                          placeholder="Viết đánh giá..."
                          className="w-full rounded border bg-gray-100 p-2 text-sm dark:bg-gray-800 dark:text-white"
                        />
                        <button
                          onClick={() => handleReviewSubmit(item.id)}
                          disabled={submitting}
                          className="rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-600 disabled:opacity-50"
                        >
                          {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
