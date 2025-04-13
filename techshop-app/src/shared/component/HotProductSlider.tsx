'use client'
import { useRef } from 'react'
import ArrowRightIcon from '../assets/Icon/arrow-right'
import ProductSlider, { SlideRef } from './ProductSlider'
import ChevronLeftIcon from '../assets/Icon/chevron-left'
import ChevronRightIcon from '../assets/Icon/chevron-right'

export default function HotProduct() {
  const sliderRef = useRef<SlideRef>(null)
  const handleNext = () => {
    sliderRef.current?.slideNext()
  }
  const handlePrev = () => {
    sliderRef.current?.slidePrev()
  }
  return (
    <div className="flex w-full justify-center px-2">
      <div className="flex h-full w-full flex-col rounded-md bg-blue-500 px-2 py-1 shadow-2xl sm:h-[70vh] md:h-[70vh] lg:h-[70vh]">
        <div className="flex h-fit w-full items-center justify-between gap-2 py-2">
          <div className="flex h-fit gap-2">
            <div className="flex items-center justify-center">
              <h1 className="sm:2xl md:2xl lg:2xl text-lg font-bold text-white">
                HOT NHẤT TECHSHOP
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
              className="box-content scale-100 transform rounded-md p-2 transition-all hover:bg-blue-400 active:scale-95"
            >
              <ChevronLeftIcon className="size-8" fill="transparent" />
            </button>
            <button
              onClick={handleNext}
              className="box-content scale-100 transform rounded-md p-2 transition-all hover:bg-blue-400 active:scale-95"
            >
              <ChevronRightIcon className="size-8" fill="transparent" />
            </button>
          </div>
        </div>
        <div className="flex w-full grow items-center justify-center">
          <ProductSlider ref={sliderRef} />
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="flex items-center justify-center">
            <button className="transition-scale my-2 flex scale-100 transform items-center gap-2 rounded-md bg-blue-400 p-2 shadow-sm duration-300 hover:bg-blue-300 active:scale-95">
              <h1 className="text-sm">Xem tất cả HOT NHẤT TECHSHOP</h1>
              <div className="rounded-full">
                <ArrowRightIcon className="size-4" fill="transparent" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
