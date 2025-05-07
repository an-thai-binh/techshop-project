'use client'
import { useRef } from 'react'
import ProductSlider, { SlideRef } from './ProductSlider'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { ProductType } from '@/features/product/types/ProductType'
import { CategoriesType } from '@/features/categories/types/CategoriesType'
import Link from 'next/link'
type ProductListSlider = {
  categories: CategoriesType[]
  items: ProductType[]
}
export default function ProductListSlider(_props: ProductListSlider) {
  const category = _props.categories.find((c) => _props.items[0].category_id == c.id)
  const slideRef = useRef<SlideRef>(null)
  const handleNext = () => {
    slideRef.current?.slideNext()
  }
  const handlePrev = () => {
    slideRef.current?.slidePrev()
  }
  return (
    <div className="flex w-full justify-center px-2">
      <div className="flex h-full w-full flex-col rounded-md border border-gray-500/10 bg-gray-300/90 px-2 py-1 shadow-md backdrop-blur-md dark:bg-gray-500/10">
        <div className="flex h-fit w-full items-center justify-between gap-2 py-2">
          <div className="flex h-fit gap-2">
            <div className="flex items-center justify-center">
              <h1 className="sm:2xl md:2xl lg:2xl text-lg font-bold text-black dark:text-white">
                {category && category?.category_name}
              </h1>
            </div>
            {/* <div className="flex items-center">
                    <div className="flex justify-center gap-2">
                        <div className="size-10 bg-yellow-500 px-2 py-1 rounded-xl">
                          <div className="text-center text-black font-bold text-xs">11</div>
                          <div className="text-center text-black font-light text-[0.5rem]">Ngày</div>
                        </div>
                        <div className="size-10 bg-yellow-500 px-2 py-1 rounded-xl">
                          <div className="text-center text-black font-bold text text-xs">2</div>
                          <div className="text-center text-black font-light text-[0.5rem]">Giờ</div>
                        </div>
                        <div className="size-10 bg-yellow-500 px-2 py-1 rounded-xl">
                          <div className="text-center text-black font-bold text-xs">11</div>
                          <div className="text-center text-black font-light text-[0.5rem]">Phút</div>
                        </div>
                        <div className="size-10 bg-yellow-500 px-2 py-1 rounded-xl">
                          <div className="text-center text-black font-bold text-xs">11</div>
                          <div className="text-center text-black font-light text-[0.5rem]">Giây</div>
                        </div>
                    </div>
                  </div> */}
          </div>
          <div className="mx-2 my-1 hidden justify-between sm:hidden md:flex lg:flex">
            <button
              onMouseDown={handlePrev}
              className="box-content rounded-md p-2 text-center font-bold hover:bg-white/50"
            >
              <ChevronLeftIcon className="size-6 text-white" fill="white" />
            </button>
            <button
              onMouseDown={handleNext}
              className="box-content rounded-md p-2 text-center font-bold hover:bg-white/50"
            >
              <ChevronRightIcon className="size-6 text-white" fill="white" />
            </button>
          </div>
        </div>
        <div className="flex w-full grow items-center justify-center">
          <ProductSlider
            backgroundColor={'bg-gray-100 dark:bg-gray-800'}
            ref={slideRef}
            items={_props.items}
          />
        </div>
        <Link href={`/categories/${category?.id}`}>
          <div className="flex w-full items-center justify-center">
            <div className="flex items-center justify-center">
              <button className="transition-scale my-2 flex scale-100 transform items-center gap-2 rounded-md border border-blue-400/80 bg-blue-400 px-4 py-2 shadow-sm duration-300 hover:bg-blue-300 active:scale-95">
                <h1 className="text-sm font-semibold">{`Xem tất cả ${category && category.category_name}`}</h1>
                <div className="rounded-full">
                  <ArrowRightIcon className="size-4" fill="transparent" strokeWidth={2.5} />
                </div>
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
