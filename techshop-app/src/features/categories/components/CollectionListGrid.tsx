'use client'
import { useEffect, useState } from 'react'
import CardProduct from '../../product/components/CardProduct'
import { ProductType } from '@/features/product/types/ProductType'
import { CategoryType } from '@/features/categories/types/CategoriesType'
import AnimationMotion from '@/component/AnimationMotion'
import api from '@/utils/APIAxiosConfig'
import { EndpointAPI } from '@/api/EndpointAPI'
import { useAppSelector } from '@/shared/redux/hook'
import { selectToken } from '@/features/auth/authSelectors'

type CollectionProductProps = {
  category: CategoryType | undefined
  items: ProductType[] // dữ liệu ban đầu (nếu có)
}

export default function CollectionListGrid(_props: CollectionProductProps) {
  const [products, setProducts] = useState<ProductType[]>(_props.items)
  const [page, setPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [sort, setSort] = useState<string>('createdAt')
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc')
  const pageSize = 20
  const token = useAppSelector(selectToken)

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams({
        categoryId: String(_props.category?.id || ''),
        page: String(page),
        size: String(pageSize),
        sort,
        direction,
      })

      const response = await fetch(
        `${EndpointAPI.BaseUrl}/product/display/getByCategory?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          credentials: 'include', // Cho phép gửi cookie
        },
      )

      const res = await response.json()

      if (!res.success) {
        throw new Error(res.message || 'API error')
      }

      setProducts(res.data.content)
      setTotalPages(res.data.totalPages)
    } catch (err) {
      console.error('Lỗi fetch sản phẩm:', err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [page, sort, direction, _props.category?.id, fetchProducts])

  return (
    <div className="flex size-full min-h-screen justify-center px-2">
      <div className="flex w-full flex-col gap-2 px-2 py-1">
        <div className="flex w-full items-center justify-center rounded-md">
          <div className="dar:bg-gray-800 flex w-full justify-between gap-2 rounded-md bg-white px-4 py-2">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-bold">{_props.category?.categoryName}</h1>
              <h1 className="text-md">
                <span className="text-md font-bold">{products.length}</span> sản phẩm
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2">
              <label htmlFor="sort-product">Sắp xếp</label>
              <select
                id="sort-product"
                value={`${sort}-${direction}`}
                onChange={(e) => {
                  const [newSort, newDir] = e.target.value.split('-')
                  setSort(newSort)
                  setDirection(newDir as 'asc' | 'desc')
                  setPage(0) // reset về trang đầu khi đổi sắp xếp
                }}
                className="rounded-md bg-gray-300 px-2 py-1 dark:bg-gray-700"
              >
                <option value="createdAt-desc">Mới nhất</option>
                <option value="createdAt-asc">Cũ nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
              </select>
            </div>
          </div>
        </div>

        <div className="container">
          <AnimationMotion className="grid grid-cols-2 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <CardProduct key={product.id} item={product} className="bg-white dark:bg-gray-800" />
            ))}
          </AnimationMotion>

          {/* Phân trang đơn giản */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                className="rounded bg-gray-300 px-3 py-1 disabled:opacity-50 dark:bg-gray-600"
              >
                Trang trước
              </button>
              <span>
                Trang <b>{page + 1}</b> / {totalPages}
              </span>
              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded bg-gray-300 px-3 py-1 disabled:opacity-50 dark:bg-gray-600"
              >
                Trang sau
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
