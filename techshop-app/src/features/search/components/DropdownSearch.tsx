'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearch } from '@/features/search/hooks/useSearch'
import { useRouter } from 'next/navigation'

interface DropdownSearchProps {
  inputSearch: string
}
export default function DropdownSearch(_props: DropdownSearchProps) {
  const { results, loading } = useSearch(_props.inputSearch)
  const router = useRouter()
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.2 }}
        style={{ transformOrigin: 'top' }}
        className="absolute left-0 top-14 z-40 w-full rounded-md bg-white shadow-lg dark:bg-gray-800"
      >
        <div className="max-h-60 overflow-y-auto p-4">
          {loading && <p className="text-sm text-gray-500">Đang tìm kiếm...</p>}

          {!loading && results.length === 0 && (
            <p className="text-sm text-gray-500">Không tìm thấy sản phẩm</p>
          )}

          {!loading &&
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`product-detail/${item.id}`)}
                className="flex cursor-pointer items-center gap-2 rounded px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                <div className="text-sm font-medium text-gray-800 dark:text-white">
                  {item.productName}
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
