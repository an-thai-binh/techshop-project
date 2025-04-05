"use client"; // Nếu bạn đang dùng Next.js 13+

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import CartItem from "./CardProduct";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { SwiperClass } from "swiper/react";

interface SlideProps {
  children?: React.ReactNode;
}
export interface SlideRef {
  slideNext: () => void;
  slidePrev: () => void;
}
const ProductSlider = forwardRef<SlideRef, SlideProps>((props, ref) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  useImperativeHandle(ref, () => ({
    slideNext: () => swiperRef.current?.slideNext(),
    slidePrev: () => swiperRef.current?.slidePrev(),
  }));
  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      modules={[Navigation, Pagination]}
      freeMode={true}
      spaceBetween={10}
      slidesPerView={4}
      slidesPerGroup={1}
      breakpoints={{
        320: {
          navigation:true,
          slidesPerView: 2,
          spaceBetween: 5,
        },
        640: {
          navigation:true,
          slidesPerView: 2,
          spaceBetween: 5,
        },
        768: {
          navigation:true,
          slidesPerView: 3,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        1920: {
          slidesPerView: 5,
          spaceBetween: 5,
        },
      }}
      loop={false}
      centeredSlides={false}
      className="w-full h-full cursor-pointer"
    >
      <SwiperSlide>
        <CartItem backgroundColor="bg-gray-800"/>
      </SwiperSlide>
      <SwiperSlide>
        <CartItem backgroundColor="bg-gray-800"/>
      </SwiperSlide>
      <SwiperSlide>
        <CartItem backgroundColor="bg-gray-800"/>
      </SwiperSlide>
      <SwiperSlide>
        <CartItem backgroundColor="bg-gray-800"/>
      </SwiperSlide>
      <SwiperSlide>
        <CartItem backgroundColor="bg-gray-800"/>
      </SwiperSlide>
      <SwiperSlide>
        <CartItem backgroundColor="bg-gray-800"/>
      </SwiperSlide>
      <SwiperSlide>
        <CartItem backgroundColor="bg-gray-800"/>
      </SwiperSlide>
    </Swiper>
  );
});

ProductSlider.displayName = "ProductSlider";

export default ProductSlider;
