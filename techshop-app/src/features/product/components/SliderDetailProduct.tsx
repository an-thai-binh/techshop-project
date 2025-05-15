'use client'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import Zoom from 'react-medium-image-zoom'
import 'react-inner-image-zoom/src/styles.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'react-medium-image-zoom/dist/styles.css'
const images = [
  'https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/iphone_16_pro_max_desert_titan_3552a28ae0.png',
  'https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/iphone_16_pro_max_natural_titan_1_7b9642e6dd.png',
  'https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/iphone_16_pro_max_white_titan_1_a15c48070f.png',
]
export default function SliderDetailProduct() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>()
  const [currentImg, setCurrentImg] = useState(images[0])
  return (
    <div className={'flex size-full flex-col'}>
      <Swiper
        spaceBetween={10}
        modules={[Navigation, Thumbs, Pagination]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        freeMode={true}
        slidesPerView={1}
        slidesPerGroup={1}
        className="mb-4 h-[90%] w-full max-w-3xl cursor-pointer rounded-md"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="h-[300px] w-full">
              <img src={img} alt="" className={'size-full object-contain'} />
            </div>
            <Zoom>
              <div>click</div>
            </Zoom>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={0}
        slidesPerView={'auto'}
        modules={[Thumbs]}
        watchSlidesProgress
        className={'h-[20%] w-full cursor-pointer'}
        loop={false}
        centeredSlides={false}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
        }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className={'!h-auto !w-auto'}>
            <div className="h-full w-full rounded-md border p-1">
              <img src={img} alt="" className={'size-full object-contain'} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
