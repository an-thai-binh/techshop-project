'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import CartItem from './CardProduct'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { SwiperClass } from 'swiper/react'
import { ProductType } from '@/features/product/types/ProductType'

type SlideProps = {
  children?: React.ReactNode
  backgroundColor?: string
  items: ProductType[]
}
export type SlideRef = {
  slideNext: () => void
  slidePrev: () => void
}
const ProductSlider = forwardRef<SlideRef, SlideProps>((_props, ref) => {
  const swiperRef = useRef<SwiperClass | null>(null)
  useImperativeHandle(ref, () => ({
    slideNext: () => swiperRef.current?.slideNext(),
    slidePrev: () => swiperRef.current?.slidePrev(),
  }))
  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      modules={[Navigation, Pagination]}
      freeMode={true}
      spaceBetween={10}
      slidesPerView={4}
      slidesPerGroup={1}
      autoplay={true}
      breakpoints={{
        320: {
          navigation: true,
          slidesPerView: 2,
          spaceBetween: 5,
        },
        640: {
          navigation: true,
          slidesPerView: 2,
          spaceBetween: 5,
        },
        768: {
          navigation: true,
          slidesPerView: 3,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 5,
        },
        1920: {
          slidesPerView: 5,
          spaceBetween: 5,
        },
      }}
      loop={true}
      centeredSlides={true}
      className="h-fit w-full cursor-pointer"
    >
      {_props.items?.map((item) => (
        <SwiperSlide key={item.id}>
          <CartItem backgroundColor={_props.backgroundColor} item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
})

ProductSlider.displayName = 'ProductSlider'

export default ProductSlider
