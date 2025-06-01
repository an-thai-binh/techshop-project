'use client'

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { useEffect, useRef, useState } from 'react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { ProductDetailType } from '@/features/product/types/ProductDetailType'
import { useAppDispatch, useAppSelector } from '@/shared/redux/hook'
import { setSelectedChoice } from '@/features/product/productSlice'
import { selectChoices } from '@/features/product/productSelectors'
import { RootState } from '@/shared/redux/store'

interface SliderDetailProductProps {
  productDetail?: ProductDetailType
}

export default function SliderDetailProduct({ productDetail }: SliderDetailProductProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>()
  const mainSwiperRef = useRef<SwiperClass | null>(null)
  const dispatch = useAppDispatch()
  const choices = useAppSelector(selectChoices)
  const activeChoiceValueIds = useAppSelector(
    (state: RootState) => state.product.activeChoiceValueIds,
  )

  if (!productDetail) return null

  const variationImageData = productDetail.productVariationList.map((variation) => {
    const matchedImage = productDetail.productImageList.find(
      (img) => img.image.id === variation.imageId,
    )

    return {
      variationId: variation.id,
      choiceValueIds: variation.choiceValueIds,
      imageId: variation.imageId,
      imgUrl: matchedImage?.image.imgUrl || 'https://placehold.co/300x300?text=No+Image',
    }
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!activeChoiceValueIds || !mainSwiperRef.current) return

    const sortedActive = [...activeChoiceValueIds].sort((a, b) => a - b)
    const index = variationImageData.findIndex((v) => {
      const sorted = [...v.choiceValueIds].sort((a, b) => a - b)
      return JSON.stringify(sorted) === JSON.stringify(sortedActive)
    })

    if (index !== -1) {
      mainSwiperRef.current.slideTo(index)
    }
  }, [activeChoiceValueIds, variationImageData])

  const handleImageClick = (variationId: number) => {
    const matchedVariation = productDetail.productVariationList.find((v) => v.id === variationId)
    if (!matchedVariation) return

    const newSelected: Record<number, number> = {}
    matchedVariation.choiceValueIds.forEach((valId) => {
      const choice = choices.find((c) => c.choiceValueList.some((v) => v.id === valId))
      if (choice) newSelected[choice.id] = valId
    })

    dispatch(setSelectedChoice(newSelected))
  }

  return (
    <div className="flex size-full flex-col">
      {/* Main Image Swiper */}
      <Swiper
        spaceBetween={10}
        modules={[Navigation, Thumbs, Pagination]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        freeMode={true}
        slidesPerView={1}
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        className="mb-4 flex h-[100%] max-h-full w-full max-w-3xl cursor-pointer items-center justify-center rounded-md bg-white"
      >
        {variationImageData.map((item, i) => (
          <SwiperSlide key={i} className="flex items-center justify-center">
            <div className="size-full">
              <img
                src={item.imgUrl}
                alt={`Ảnh biến thể ${item.variationId}`}
                className="size-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={0}
        slidesPerView="auto"
        modules={[Thumbs]}
        watchSlidesProgress
        className="h-[20%] w-full cursor-pointer"
        loop={false}
        centeredSlides={false}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 5 },
          768: { slidesPerView: 4, spaceBetween: 5 },
          1024: { slidesPerView: 5, spaceBetween: 5 },
        }}
      >
        {variationImageData.map((item, i) => {
          const isActive =
            activeChoiceValueIds &&
            JSON.stringify([...item.choiceValueIds].sort()) ===
              JSON.stringify([...activeChoiceValueIds].sort())

          return (
            <SwiperSlide key={i} className="!h-auto !w-auto">
              <div
                className={`h-full w-full rounded-md border p-1 transition ${
                  isActive ? 'border-blue-500' : 'border-gray-200'
                } hover:border-blue-500`}
                onClick={() => handleImageClick(item.variationId)}
              >
                <img
                  src={item.imgUrl}
                  alt={`Thumbnail ${i + 1}`}
                  className="size-full object-contain"
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
