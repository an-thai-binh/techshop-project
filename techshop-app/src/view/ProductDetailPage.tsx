'use client'

import Link from 'next/link'
import { ChevronRightIcon, StarIcon } from '@heroicons/react/24/outline'
import SliderDetailProduct from '@/features/product/components/SliderDetailProduct'
import ProductChoice from '@/features/product/components/ProductChoice'
import ProductDescription from '@/features/product/components/ProductDescription'
import { ProductDetailType } from '@/features/product/types/ProductDetailType'
import { useEffect, useState } from 'react'
import api from '@/utils/APIAxiosConfig'
import { useAppSelector } from '@/shared/redux/hook'
import { selectUserId } from '@/features/user/userSelectors'
import { toast } from 'sonner'

interface Review {
  reviewId: number
  userFullName: string
  rating: number
  content: string
  reviewTime: string
  productName: string
  sku: string
}

interface ReviewableItemDto {
  orderItemId: number
  productName: string
  sku: string
}

interface ProductDetailPageProps {
  productId: number
  productDetail: ProductDetailType | undefined
}

export default function ProductDetailPage({ productId, productDetail }: ProductDetailPageProps) {
  const userId = useAppSelector(selectUserId)
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewableItems, setReviewableItems] = useState<ReviewableItemDto[]>([])
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (productId) {
      api
        .get(`/reviews/product/${productId}`)
        .then((res) => setReviews(res.data.data))
        .catch((err) => console.error('Lỗi tải đánh giá:', err.message))
    }
  }, [productId])

  useEffect(() => {
    if (!userId || !productDetail) return

    api
      .get(`/reviews/user/${userId}/reviewable-items`)
      .then((res) => {
        const filtered = res.data.data.filter((item: ReviewableItemDto) =>
          productDetail.productVariationList.some((pv) => pv.sku === item.sku),
        )
        setReviewableItems(filtered)
      })
      .catch((err) => console.error('Lỗi tải danh sách đánh giá:', err.message))
  }, [userId, productDetail])

  const handleSubmit = async () => {
    if (!content || rating === 0 || !selectedItemId)
      return toast.warning('Vui lòng nhập đủ thông tin.')
    setSubmitting(true)
    try {
      await api.post('/reviews', {
        orderItemId: selectedItemId,
        content,
        rating,
      })
      setContent('')
      setRating(0)
      setSelectedItemId(null)
      setReviewableItems((prev) => prev.filter((item) => item.orderItemId !== selectedItemId))
      const refreshed = await api.get(`/reviews/product/${productId}`)
      setReviews(refreshed.data.data)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Đánh giá thất bại.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-white px-0 text-black dark:bg-gray-900 dark:text-white">
      {/* Breadcrumb */}
      <div className={'flex w-full items-center px-2 py-4'}>
        <div className={'flex items-center gap-2'}>
          <Link href={'/'}>
            <h1 className={'text-xs font-bold'}>Trang chủ</h1>
          </Link>
          <ChevronRightIcon className={'size-3'} strokeWidth={2.5} />
          <Link href={`/categories/${productDetail?.category.id}`}>
            <h1 className={'text-xs font-bold'}>{productDetail?.category.categoryName}</h1>
          </Link>
          <ChevronRightIcon className={'size-3'} strokeWidth={2.5} />
          <h1 className={'w-64 truncate text-xs font-bold'}>{productDetail?.productName}</h1>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className={'container px-2'}>
        <div className={'flex flex-col gap-4 md:flex-row'}>
          {/* Bên trái: hình + chính sách */}
          <div className={'flex w-1/2 flex-col space-y-4'}>
            <div className={'h-[50vh] w-full'}>
              <SliderDetailProduct productDetail={productDetail} />
            </div>
            <hr className={'my-4 border-gray-700'} />
          </div>

          {/* Bên phải: lựa chọn biến thể */}
          <ProductChoice productDetail={productDetail} productId={productId} />
        </div>

        {/* Mô tả sản phẩm */}
        <hr className={'my-8 border-[0.1px] border-gray-700 shadow shadow-blue-500 blur-md'} />
        <div className={'my-4 flex flex-col'}>
          <h1 className={'my-2 text-center text-3xl font-bold text-blue-500'}>MÔ TẢ SẢN PHẨM</h1>
          <ProductDescription productDescription={productDetail?.productDescription} />
        </div>

        {/* Đánh giá sản phẩm */}
        <hr className={'my-8 border-gray-600'} />
        <div className={'my-4 flex flex-col gap-6'}>
          <h1 className={'text-2xl font-bold text-blue-500'}>ĐÁNH GIÁ SẢN PHẨM</h1>

          {reviewableItems.length > 0 && (
            <div className="space-y-4 rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Gửi đánh giá của bạn
              </h2>

              <select
                value={selectedItemId ?? ''}
                onChange={(e) => setSelectedItemId(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">-- Chọn sản phẩm bạn đã mua --</option>
                {reviewableItems.map((item) => (
                  <option key={item.orderItemId} value={item.orderItemId}>
                    {item.productName} - {item.sku}
                  </option>
                ))}
              </select>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon
                    key={i}
                    className={`h-6 w-6 cursor-pointer ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    strokeWidth={2}
                    onClick={() => setRating(i)}
                  />
                ))}
              </div>

              <textarea
                className="w-full rounded-md border border-gray-300 bg-gray-100 p-3 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                rows={4}
                placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              <div className="text-right">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                </button>
              </div>
            </div>
          )}

          {/* Danh sách đánh giá */}
          {reviews.length === 0 ? (
            <p className="italic text-gray-400">Chưa có đánh giá nào cho sản phẩm này.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.reviewId} className="rounded border p-4 shadow-sm dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold">{r.userFullName}</h3>
                    <p className="text-xs text-gray-400">
                      {new Date(r.reviewTime).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm italic text-gray-500">
                    {r.productName} - {r.sku}
                  </p>
                  <div className="my-1 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${i < r.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        strokeWidth={2}
                      />
                    ))}
                  </div>
                  <p className="text-sm">{r.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
