"use client"; // Nếu bạn đang dùng Next.js 13+

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const ImageSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      freeMode={true}
      spaceBetween={5}
      slidesPerView={1}
      slidesPerGroup={1}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
      }}
      loop={true}
      centeredSlides={false}
      className="w-full h-full cursor-pointer rounded-md"
    >
      <SwiperSlide>
        <div className="relative size-full">
          <Image src={"/image/AppleiPhone.jpg"} alt="img_1" layout="fill" objectFit="cover"/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative size-full">
          <Image src={"/image/img_2.jpg"} alt="img_2" layout="fill" objectFit="cover"/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative size-full">
          <Image src={"/image/img_3.jpg"} alt="img_3" layout="fill" objectFit="cover"/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative size-full">
          <Image src={"/image/img_4.jpg"} alt="img_4" layout="fill" objectFit="cover"/>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageSlider;
