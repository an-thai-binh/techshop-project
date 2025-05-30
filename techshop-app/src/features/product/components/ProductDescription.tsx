'use client'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { ProductDetailType } from '@/features/product/types/ProductDetailType'

interface ProductDescriptionProps {
  type?: string
  content?: string
  src?: string
  alt?: string
  images?: string[]
  productDescription?: ProductDetailType['productDescription']
}
export default function ProductDescription(_props: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="container my-4 flex w-full flex-col justify-center space-y-4">
      <div
        dangerouslySetInnerHTML={{
          __html: _props.productDescription
            ? _props.productDescription.replace(/\r?\n/g, '<br />')
            : '',
        }}
      />
    </div>
  )
  //   const visibleCount = 3
  //   const visibleBlocks = expanded ? blocks : blocks.slice(0, visibleCount)
  //   return (
  //     <div className="container my-4 flex w-full flex-col justify-center space-y-4">
  //       {visibleBlocks.map((block, idx) => {
  //         switch (block.type) {
  //           case 'text':
  //             return <div key={idx} dangerouslySetInnerHTML={{ __html: block.content || '' }} />
  //           case 'image':
  //             return (
  //               <div className={'flex w-full justify-center'}>
  //                 <img
  //                   key={idx}
  //                   src={block.src}
  //                   alt={block.alt || ''}
  //                   className="h-96 max-w-[90%] rotate-0 scale-100 transform rounded-lg object-contain transition-all duration-300 ease-in-out hover:rotate-2 hover:scale-110 active:animate-ping"
  //                 />
  //               </div>
  //             )
  //           case 'video':
  //             return (
  //               <div key={idx} className="aspect-h-9 aspect-w-16">
  //                 <iframe
  //                   src={block.src}
  //                   className="min-h-96 w-full rounded-md shadow shadow-gray-700"
  //                   allowFullScreen
  //                 />
  //               </div>
  //             )
  //           case 'slider':
  //             return (
  //               <Swiper
  //                 key={idx}
  //                 modules={[Navigation, Pagination, Autoplay]}
  //                 className={'h-[60vh] w-full cursor-pointer rounded-md'}
  //                 loop={true}
  //                 freeMode={true}
  //                 autoplay={{
  //                   delay: 3000,
  //                   disableOnInteraction: true,
  //                 }}
  //                 breakpoints={{
  //                   640: {
  //                     slidesPerView: 1,
  //                     spaceBetween: 5,
  //                   },
  //                   768: {
  //                     slidesPerView: 1,
  //                     spaceBetween: 5,
  //                   },
  //                   1024: {
  //                     slidesPerView: 2,
  //                     spaceBetween: 10,
  //                   },
  //                 }}
  //               >
  //                 {block.images?.map((img, i) => (
  //                   <SwiperSlide key={i}>
  //                     <div className={'relative size-full'}>
  //                       <img
  //                         src={img}
  //                         alt={`Slide ${i}`}
  //                         className="size-full rounded-md object-cover"
  //                       />
  //                     </div>
  //                     {/*<Image src={img} alt={`Slide ${i}`} className={"w-full rounded-md"} layout="fill" objectFit="cover"/>*/}
  //                   </SwiperSlide>
  //                 ))}
  //               </Swiper>
  //             )
  //           default:
  //             return null
  //         }
  //       })}
  //       {blocks.length > visibleCount && (
  //         <div className="w-full text-center">
  //           <button onClick={() => setExpanded(!expanded)} className="mt-4 text-sm text-blue-500">
  //             {expanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   )
}
