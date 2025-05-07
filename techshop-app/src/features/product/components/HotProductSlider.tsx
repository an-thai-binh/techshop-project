'use client'
import { useRef } from 'react'
import ProductSlider, { SlideRef } from './ProductSlider'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { ProductType } from '@/features/product/types/ProductType'
import Link from 'next/link'
import { CategoriesType } from '@/features/categories/types/CategoriesType'

type HotProductProps = {
  categories: CategoriesType[]
  items: ProductType[]
}
export default function HotProduct(_props: HotProductProps) {
  const category = _props.categories.find((c) => _props.items[0].category_id == c.id)
  const sliderRef = useRef<SlideRef>(null)
  const handleNext = () => {
    sliderRef.current?.slideNext()
  }
  const handlePrev = () => {
    sliderRef.current?.slidePrev()
  }
  return (
    <div className="flex w-full justify-center px-2">
      <div className="flex h-full w-full flex-col rounded-md bg-blue-500 px-2 py-1 shadow-md">
        <div className="flex h-fit w-full items-center justify-between gap-2 py-2">
          <div className="flex h-fit gap-2">
            <div className="flex items-center justify-center">
              <h1 className="sm:2xl md:2xl lg:2xl text-lg font-bold text-white">
                {category?.category_name}
              </h1>
            </div>
            <div className="hidden items-center sm:hidden md:flex lg:flex">
              <div className="flex justify-center gap-2">
                <div className="size-10 rounded-xl bg-yellow-500 px-2 py-1">
                  <div className="text-center text-xs font-bold text-black">11</div>
                  <div className="text-center text-[0.5rem] font-light text-black">Ngày</div>
                </div>
                <div className="size-10 rounded-xl bg-yellow-500 px-2 py-1">
                  <div className="text text-center text-xs font-bold text-black">2</div>
                  <div className="text-center text-[0.5rem] font-light text-black">Giờ</div>
                </div>
                <div className="size-10 rounded-xl bg-yellow-500 px-2 py-1">
                  <div className="text-center text-xs font-bold text-black">11</div>
                  <div className="text-center text-[0.5rem] font-light text-black">Phút</div>
                </div>
                <div className="size-10 rounded-xl bg-yellow-500 px-2 py-1">
                  <div className="text-center text-xs font-bold text-black">11</div>
                  <div className="text-center text-[0.5rem] font-light text-black">Giây</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-2 my-1 hidden justify-between sm:hidden md:flex lg:flex">
            <button
              onClick={handlePrev}
              className="box-content scale-100 transform rounded-md p-2 transition-all hover:bg-white/50 active:scale-95"
            >
              <ChevronLeftIcon className="size-6 text-white" fill="white" />
            </button>
            <button
              onClick={handleNext}
              className="box-content scale-100 transform rounded-md p-2 transition-all hover:bg-white/50 active:scale-95"
            >
              <ChevronRightIcon className="size-6 text-white" fill="white" />
            </button>
          </div>
        </div>
        <div className="flex w-full grow items-center justify-center">
          <ProductSlider backgroundColor={'bg-blue-700/90'} ref={sliderRef} items={_props.items} />
        </div>
        <Link href={`/categories/${category?.id}`}>
          <div className="flex w-full items-center justify-center">
            <div className="flex items-center justify-center">
              <button className="transition-scale my-2 flex scale-100 transform items-center gap-2 rounded-md border border-blue-400/80 bg-blue-400 px-4 py-2 shadow-sm duration-300 hover:bg-blue-300 active:scale-95">
                <h1 className="text-sm font-semibold">Xem tất cả HOT NHẤT TECHSHOP</h1>
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
