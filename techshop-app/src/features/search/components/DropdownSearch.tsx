'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSearch } from '@/features/search/hooks/useSearch'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { formatPrice } from '@/utils/CurrentyFormat'

interface DropdownSearchProps {
  inputSearch: string
}

export default function DropdownSearch({ inputSearch }: DropdownSearchProps) {
  const { results, loading } = useSearch(inputSearch)
  const router = useRouter()

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
      {inputSearch.trim() && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0.95 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0.95 }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: 'top' }}
          className="absolute left-0 top-14 z-40 w-full rounded-xl border border-gray-200 bg-white shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="scrollbar-thumb-rounded-full max-h-80 overflow-y-auto p-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
            {loading && (
              <div className="space-y-3 px-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex animate-pulse items-center gap-4 rounded-md px-2 py-2"
                  >
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
