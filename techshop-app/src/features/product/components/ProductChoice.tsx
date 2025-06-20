'use client'

import { useEffect, useState } from 'react'
import { ProductDetailType } from '@/features/product/types/ProductDetailType'
import { formatPrice } from '@/utils/AppFormatter'
import { ProductVariationType } from '@/features/product/types/ProductVariationType'
import { useAppDispatch, useAppSelector } from '@/shared/redux/hook'
import {
  fetchAddItemCartFromApi,
  fetchAddWithQuantityItemCartFromApi,
} from '@/features/cart/cartThunks'
import { round } from '@floating-ui/utils'
import { fetchChoiceGetByProductIdFromApi } from '@/features/product/productThunks'
import { selectChoices, selectSelectedChoices } from '@/features/product/productSelectors'
import {
  setProductsDetail,
  setSelectedChoice,
  setActiveChoiceValueIds,
} from '@/features/product/productSlice'
import { MinusIcon } from '@heroicons/react/24/solid'
import { PlusIcon } from '@heroicons/react/20/solid'

interface ProductChoiceProps {
  productId: number
  productDetail?: ProductDetailType
}

export default function ProductChoice({ productId, productDetail }: ProductChoiceProps) {
  const dispatch = useAppDispatch()
  const choice = useAppSelector(selectChoices)
  const selectedChoices = useAppSelector(selectSelectedChoices)
  const [quantity, setQuantity] = useState<number>(1)
  const [productVariation, setProductVariation] = useState<ProductVariationType | null>(null)
  const [groupPrice, setGroupPrice] = useState<{
    finalPrice: number | undefined
    percentDiscount: number
  }>()
  const [stockError, setStockError] = useState<string | null>(null)
  useEffect(() => {
    setProductVariation(null)
    setGroupPrice(undefined)
    setStockError(null)
    dispatch(setSelectedChoice({}))
    dispatch(setActiveChoiceValueIds([]))
    dispatch(fetchChoiceGetByProductIdFromApi(productId))
  }, [productId, dispatch])
  useEffect(() => {
    dispatch(fetchChoiceGetByProductIdFromApi(productId))
    if (productDetail) {
      dispatch(setProductsDetail(productDetail))
    }
  }, [productId, productDetail, dispatch])

  useEffect(() => {
    const choiceValueIds = Object.values(selectedChoices).sort((a, b) => a - b)
    let matchedVariation = null

    if (productDetail?.productVariationList?.length === 1 && choice.length === 0) {
      matchedVariation = productDetail.productVariationList[0]
    } else {
      matchedVariation = productDetail?.productVariationList.find((r) => {
        const sorted = [...r.choiceValueIds].sort((a, b) => a - b)
        if (sorted.length !== choiceValueIds.length) return false
        return sorted.every((id, i) => id === choiceValueIds[i])
      })
    }

    if (matchedVariation && productDetail) {
      const finalPrice = productDetail.productBasePrice + matchedVariation.variationPriceChange
      const percentDiscount = round(
        (matchedVariation.variationPriceChange / productDetail.productBasePrice) * 100,
      )
      setProductVariation(matchedVariation)
      setGroupPrice({ finalPrice, percentDiscount })

      if (matchedVariation.quantity <= 0) {
        setStockError('Sản phẩm bạn chọn hiện đã hết hàng.')
      } else {
        setStockError(null)
      }

      dispatch(setActiveChoiceValueIds(matchedVariation.choiceValueIds))
    } else {
      setProductVariation(null)
      setGroupPrice({
        finalPrice: productDetail?.productBasePrice,
        percentDiscount: 0,
      })
      setStockError(null)
    }
  }, [productDetail, selectedChoices, choice, dispatch])

  const isFullySelected =
    choice.length === 0 || choice.every((c) => selectedChoices.hasOwnProperty(c.id))
  const isOutOfStock = productVariation?.quantity !== undefined && productVariation.quantity <= 0

  return (
    <div className="flex w-full flex-col md:w-1/2">
      <div className="flex w-full flex-col justify-center gap-2 px-2">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">{productDetail?.productName}</h1>
        </div>
        <div className="flex items-center justify-between py-2">
          <h2 className="text-sm font-medium text-gray-400">No. {productDetail?.id}</h2>
          <h2 className="text-sm font-medium text-gray-400">
            Danh mục:{' '}
            <span className="font-bold text-blue-500">{productDetail?.category.categoryName}</span>
          </h2>
        </div>

        {/* Choice Section */}
        {choice.length > 0 &&
          choice.map((choice) => (
            <div key={choice.id} className="flex w-full items-center">
              <div className="w-[20%] font-semibold">{choice.choiceName}</div>
              <div className="flex w-[80%] flex-wrap gap-2">
                {choice.choiceValueList.map((value) => (
                  <label key={value.id} className="flex cursor-pointer items-center">
                    <input
                      type="radio"
                      name={`choice-${choice.id}`}
                      checked={selectedChoices[choice.id] === value.id}
                      onChange={() => {
                        if (selectedChoices[choice.id] === value.id) {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          const { [choice.id]: _, ...rest } = selectedChoices
                          dispatch(setSelectedChoice(rest))
                        } else {
                          dispatch(setSelectedChoice({ ...selectedChoices, [choice.id]: value.id }))
                        }
                      }}
                      className="peer hidden"
                    />
                    <span className="rounded-md border-2 border-gray-500/50 px-4 py-2 text-sm peer-checked:border-blue-500">
                      {value.choiceValue}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

        {/* Thông báo thiếu lựa chọn */}
        {choice.length > 0 && !isFullySelected && (
          <p className="text-sm text-red-500">Vui lòng chọn đầy đủ các tuỳ chọn sản phẩm.</p>
        )}

        {/* Thông báo tồn kho */}
        {isFullySelected && stockError && (
          <p className="text-sm font-medium text-red-600">{stockError}</p>
        )}

        {/* Hiển thị giá */}
        <div className="my-4 flex w-full items-center rounded-sm bg-white px-0 py-6 dark:bg-gray-800">
          <div className="w-[20%] font-bold">Giá</div>
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-2xl font-semibold text-blue-500">
              {formatPrice(String(groupPrice?.finalPrice))}
            </h1>
            {productDetail?.productBasePrice !== groupPrice?.finalPrice && (
              <>
                <h1 className="text-xl font-bold text-gray-500 line-through">
                  {formatPrice(String(productDetail?.productBasePrice))}
                </h1>
                <h1 className="border border-blue-500 px-2 text-xl font-bold text-blue-500">
                  {groupPrice?.percentDiscount}%
                </h1>
              </>
            )}
          </div>
        </div>

        <div className={'flex w-full items-center justify-between'}>
          {/* Quantity (static) */}
          <div className="flex w-full items-center gap-2 space-x-6 px-0">
            <div className="w-[30%]">
              <h1 className={'text-md font-bold'}>Số lượng</h1>
            </div>
            <div className="flex items-center rounded-md border border-gray-300 bg-gray-50 px-1 py-1 shadow-sm dark:border-gray-600 dark:bg-gray-800">
              <button
                disabled={quantity < 1}
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="rounded-md px-3 py-1 text-gray-700 transition hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
              >
                <MinusIcon className="size-4" />
              </button>
              <span className="mx-2 min-w-[32px] text-center font-semibold text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                disabled={!productVariation || quantity >= (productVariation?.quantity || 0)}
                onClick={() =>
                  setQuantity((prev) => Math.min(prev + 1, productVariation?.quantity || prev))
                }
                className="rounded-md px-3 py-1 text-gray-700 transition hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
              >
                <PlusIcon className="size-4" />
              </button>
            </div>
          </div>
          {/* Thông báo số lượng hàng còn lại */}
          <div className={'flex w-full items-center justify-end'}>
            {productVariation && productVariation.quantity > 0 && (
              <p className="text-sm text-green-600">
                Còn lại: <span className="font-bold">{productVariation.quantity}</span> sản phẩm
              </p>
            )}
          </div>
        </div>
        {/* Action buttons */}
        <div className="mt-4 flex w-full gap-2">
          <button
            // onClick={() => dispatch(fetchAddItemCartFromApi(productVariation?.id as number))}
            onClick={() =>
              dispatch(
                fetchAddWithQuantityItemCartFromApi({
                  productVariationId: productVariation?.id as number,
                  quantity: quantity as number,
                }),
              )
            }
            disabled={!isFullySelected || !productVariation || isOutOfStock}
            className="w-1/2 rounded-sm px-4 py-2 shadow shadow-gray-700 ring-2 ring-blue-500 transition-all duration-500 active:scale-95 disabled:opacity-50"
          >
            <h1 className={'font-bold text-blue-500'}>THÊM VÀO GIỎ</h1>
          </button>
          {/*<button*/}
          {/*  className="w-1/2 rounded-sm border border-blue-500 bg-blue-500 px-4 py-2 text-center font-bold text-white shadow shadow-gray-700 transition-all duration-500 active:scale-95 disabled:opacity-50"*/}
          {/*  disabled={!isFullySelected || !productVariation || isOutOfStock}*/}
          {/*>*/}
          {/*  MUA NGAY*/}
          {/*</button>*/}
        </div>
      </div>
    </div>
  )
}
