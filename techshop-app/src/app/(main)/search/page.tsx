'use client'
import { useSearch } from '@/features/search/hooks/useSearch'
import { useSearchParams } from 'next/navigation'
import AnimationMotion from '@/component/AnimationMotion'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')?.trim() || ''
  const shouldSearch = q.length > 0
  const { results, loading } = useSearch(shouldSearch ? q : '')

  const isEmpty = useMemo(
    () => !loading && shouldSearch && results.length === 0,
    [loading, shouldSearch, results],
  )
  return (
    <AnimationMotion className="container mx-auto flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/">Trang chủ</Link>
        <ChevronRightIcon className="size-3" />
        <span className="font-semibold">Tìm kiếm</span>
      </div>

      <h1 className="text-xl font-bold text-black dark:text-white">
        {shouldSearch ? (
          <>
            Kết quả cho: <span className="text-blue-600 dark:text-blue-400">&#34;{q}&#34;</span>
          </>
        ) : (
          'Vui lòng nhập từ khóa tìm kiếm.'
        )}
      </h1>

      <div className="min-h-[40vh]">
        {loading && <p className={'text-black dark:text-white'}>Đang tải...</p>}

        {isEmpty && (
          <p className={'text-black dark:text-white'}>Không tìm thấy sản phẩm phù hợp.</p>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((item) => (
              <Link
                key={item.id}
                href={`/product-detail/${item.id}`}
                className="rounded-md border p-2 shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <img
                  src={item.productImgUrl}
                  alt={item.productName}
                  className="h-40 w-full object-contain"
                />
                <div className="mt-2">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.productName}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.categoryName}</p>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {item.productBasePrice.toLocaleString()}₫
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AnimationMotion>
  )
}
