'use client'

import { useEffect, useState } from 'react'
import { ProductDetailType } from '@/features/product/types/ProductDetailType'
import { formatPrice } from '@/utils/CurrentyFormat'
import { ProductVariationType } from '@/features/product/types/ProductVariationType'
import { useAppDispatch, useAppSelector } from '@/shared/redux/hook'
import { fetchAddItemCartFromApi } from '@/features/cart/cartThunks'
import { round } from '@floating-ui/utils'
import { fetchChoiceGetByProductIdFromApi } from '@/features/product/productThunks'
import { selectChoices, selectSelectedChoices } from '@/features/product/productSelectors'
import { setProductsDetail, setSelectedChoice } from '@/features/product/productSlice'

interface ProductChoiceProps {
  productId: number
  productDetail?: ProductDetailType
}

export default function ProductChoice({ productId, productDetail }: ProductChoiceProps) {
  const dispatch = useAppDispatch()
  const choice = useAppSelector(selectChoices)
  const selectedChoices = useAppSelector(selectSelectedChoices)

  const [productVariation, setProductVariation] = useState<ProductVariationType | null>(null)
  const [groupPrice, setGroupPrice] = useState<{
    finalPrice: number | undefined
    percentDiscount: number
  }>()

  useEffect(() => {
    dispatch(fetchChoiceGetByProductIdFromApi(productId))
    if (productDetail) {
      dispatch(setProductsDetail(productDetail))
    }
  }, [productId, productDetail, dispatch])

  useEffect(() => {
    const choiceValueIds = Object.values(selectedChoices)
    const matchedVariation = productDetail?.productVariationList.find(
      (r) => JSON.stringify(choiceValueIds) === JSON.stringify(r.choiceValueIds),
    )

    if (matchedVariation && productDetail) {
      const finalPrice = productDetail.productBasePrice + matchedVariation.variationPriceChange
      const percentDiscount = round(
        (matchedVariation.variationPriceChange / productDetail.productBasePrice) * 100,
      )
      setProductVariation(matchedVariation)
      setGroupPrice({ finalPrice, percentDiscount })
    } else {
      setProductVariation(null)
      setGroupPrice({
        finalPrice: productDetail?.productBasePrice,
        percentDiscount: 0,
      })
    }
  }, [productDetail, selectedChoices])

  return (
    <div className="flex w-1/2 flex-col">
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
        {choice &&
          choice.map((choice) => (
            <div key={choice.id} className="flex w-full items-center">
              <div className="w-[20%] font-semibold">{choice.choiceName}</div>
              <div className="flex w-[80%] flex-wrap gap-2">
                {choice.choiceValueList.map((value) => (
                  <label key={value.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedChoices[choice.id] === value.id}
                      onChange={() => {
                        if (selectedChoices[choice.id] === value.id) {
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

        {/* Price Section */}
        <div className="my-4 flex w-full items-center rounded-sm bg-white px-0 py-6 dark:bg-gray-800">
          <div className="w-[20%] font-bold">Giá</div>
          <div className="flex w-[80%] flex-wrap items-center gap-4">
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

        {/* Quantity (static) */}
        <div className="flex w-full items-center gap-2 px-0">
          <div className="w-[20%]">
            <h1 className={'text-md font-bold'}>Số lượng</h1>
          </div>
          <div className="flex w-[80%] items-center px-2">
            <div className="flex items-center border border-gray-500/50">
              <button className="bg-gray-500/50 px-4 py-2">-</button>
              <span className="px-4 py-2 font-bold">1</span>
              <button className="bg-gray-500/50 px-4 py-2">+</button>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex w-full gap-2">
          <button
            onClick={() => dispatch(fetchAddItemCartFromApi(productVariation?.id as number))}
            disabled={!productVariation}
            className="w-1/2 rounded-sm border-2 border-blue-500 px-4 py-2 text-center font-bold shadow shadow-gray-700 transition-all duration-500 active:scale-95"
          >
            THÊM VÀO GIỎ
          </button>
          <button className="w-1/2 rounded-sm border border-blue-500 bg-blue-500 px-4 py-2 text-center font-bold text-white shadow shadow-gray-700 transition-all duration-500 active:scale-95">
            MUA NGAY
          </button>
        </div>
      </div>
    </div>
  )
}
