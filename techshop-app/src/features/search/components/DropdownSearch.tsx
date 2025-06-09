'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSearch } from '@/features/search/hooks/useSearch'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { formatPrice } from '@/utils/CurrentyFormat'
import { useEffect, useState } from 'react'

interface DropdownSearchProps {
  inputSearch: string
  onSelectKeyword?: (keyword: string) => void
}

const MAX_HISTORY = 5
export default function DropdownSearch({ inputSearch, onSelectKeyword }: DropdownSearchProps) {
  const { results, loading } = useSearch(inputSearch)
  const router = useRouter()
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('search-history')
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    const keyword = inputSearch.trim()
    if (!keyword || loading || results.length === 0) return

    setHistory((prev) => {
      const updated = [keyword, ...prev.filter((k) => k !== keyword)].slice(0, MAX_HISTORY)
      localStorage.setItem('search-history', JSON.stringify(updated))
      return updated
    })
  }, [results, loading])

  const highlight = (text: string) => {
    const regex = new RegExp(`(${inputSearch})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="rounded-sm bg-blue-100 px-0.5 font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300"
        >
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      ),
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scaleY: 0.95 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0.95 }}
        transition={{ duration: 0.2 }}
        style={{ transformOrigin: 'top' }}
        className="absolute left-0 top-12 z-40 w-full rounded-b-xl border border-gray-200 bg-gray-100 shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-gray-900"
      >
        {/* Scrollable search results */}
        <div className="max-h-72 overflow-y-auto border-b border-gray-200 p-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
          <h4 className="px-2 pb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
            Kết quả tìm kiếm
          </h4>

          {loading && (
            <div className="space-y-3 px-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex animate-pulse items-center gap-4 rounded-md px-2 py-2">
                  <div className="h-14 w-14 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && results.length === 0 && (
            <p className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              Không tìm thấy sản phẩm
            </p>
          )}

          {!loading &&
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/product-detail/${item.id}`)}
                className="group flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Image
                    src={item.productImgUrl}
                    alt={item.productName}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:underline dark:text-white">
                    {highlight(item.productName)}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.categoryName}
                  </span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(item.productBasePrice)}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* Lịch sử tìm kiếm - KHÔNG scroll */}
        {history.length > 0 && (
          <div className="p-3">
            <h4 className="px-2 pb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
              Lịch sử tìm kiếm gần đây
            </h4>
            <div className="flex flex-wrap gap-2 px-2">
              {history.map((keyword, i) => (
                <button
                  key={i}
                  onClick={() => onSelectKeyword?.(keyword)}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
