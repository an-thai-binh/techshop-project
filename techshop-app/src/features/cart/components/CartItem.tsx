'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { CartItemType } from '@/features/cart/types/CartItemType'
import Image from 'next/image'
import { formatPrice } from '@/utils/CurrentyFormat'
import { useAppDispatch } from '@/shared/redux/hook'
import {
  fetchAddItemCartFromApi,
  fetchDeleteItemCartFromApi,
  fetchSubtractItemCartFromApi,
} from '@/features/cart/cartThunks'
import Link from 'next/link'
import { useUIContext } from '@/shared/context/UIContext'

type CartItemProps = {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const appDispatch = useAppDispatch()
  const { state, dispatch } = useUIContext()
  const isOutOfStock = item.isStock === 0
  const isMaxQuantity = item.quantity >= item.isStock
  const handleClick = () => {
    if (state.isDropdownVisible && state.dropdownType === 'cart') {
      dispatch({
        type: 'CLOSE_DROPDOWN',
      })
    }
  }
  return (
    <Link onClick={() => handleClick()} href={`/product-detail/${item.productId}`}>
      <div className="group relative flex w-full flex-row items-start gap-4 rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
        {/* Overlay khi hết hàng */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/60 text-lg font-bold text-white">
            ĐÃ HẾT HÀNG
          </div>
        )}

        {/* Image */}
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          <Image
            src={item.productImgUrl}
            width={96}
            height={96}
            alt={`Hình ảnh ${item.productName}`}
            className="h-full w-full object-contain p-1"
          />
        </div>

        {/* Info and controls */}
        <div className="flex flex-1 flex-col justify-between">
          {/* Top row: name + delete */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="line-clamp-1 overflow-ellipsis text-base font-semibold text-gray-900 dark:text-white">
                {item.productName}
              </h2>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                SKU: <span className="font-medium">{item.sku}</span>
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                appDispatch(fetchDeleteItemCartFromApi(item.id))
              }}
              className="z-50 rounded-full p-1 text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Bottom row: quantity & price */}
          <div className="mt-4 flex items-center justify-between">
            {/* Quantity control */}
            {!isOutOfStock ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    appDispatch(fetchSubtractItemCartFromApi(item.id))
                  }}
                  className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="min-w-[32px] text-center text-sm font-semibold text-gray-900 dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    if (!isMaxQuantity) {
                      appDispatch(fetchAddItemCartFromApi(item.productVariationId))
                    }
                  }}
                  disabled={isMaxQuantity}
                  className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            ) : (
              <span className="text-sm font-medium text-red-500">Hết hàng</span>
            )}

            <div className="text-right text-base font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(item.productTotalPrice)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
