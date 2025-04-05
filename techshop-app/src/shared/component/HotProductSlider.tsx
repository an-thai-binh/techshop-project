"use client";
import { useRef } from "react";
import ArrowRightIcon from "../assets/Icon/arrow-right";
import ProductSlider, { SlideRef } from "./ProductSlider";
import ChevronLeftIcon from "../assets/Icon/chevron-left";
import ChevronRightIcon from "../assets/Icon/chevron-right";

export default function HotProduct() {
    const sliderRef = useRef<SlideRef>(null);
    const handleNext = () => {
        sliderRef.current?.slideNext();
    }
    const handlePrev = () => {
        sliderRef.current?.slidePrev();
    }
    return (
        <div className="flex justify-center w-full px-2">
            <div className="flex flex-col w-full rounded-md shadow-2xl h-full sm:h-[70vh] md:h-[70vh] lg:h-[70vh] bg-blue-500 px-2 py-1">
              <div className="flex items-center justify-between w-full h-fit py-2 gap-2">
                <div className="flex gap-2 h-fit">
                  <div className="flex justify-center items-center">
                    <h1 className="text-lg sm:2xl md:2xl lg:2xl text-white font-bold">HOT NHẤT TECHSHOP</h1>
                  </div>
                  <div className="hidden sm:hidden md:flex lg:flex items-center">
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
                  </div>
                </div>
                <div className="hidden sm:hidden md:flex lg:flex justify-between mx-2 my-1">
                  <button onClick={handlePrev} className="p-2 box-content rounded-md transform scale-100 transition-all hover:bg-blue-400 active:scale-95">
                    <ChevronLeftIcon className="size-8" fill="transparent"/>
                  </button>
                  <button onClick={handleNext} className="p-2 box-content rounded-md transform scale-100 transition-all hover:bg-blue-400 active:scale-95">
                    <ChevronRightIcon className="size-8" fill="transparent"/>
                  </button>
                </div>
              </div>
              <div className="flex w-full items-center justify-center grow">
                <ProductSlider ref={sliderRef}/>
              </div>
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-center">
                  <button className="flex items-center gap-2 bg-blue-400 p-2 my-2 rounded-md shadow-sm hover:bg-blue-300 transform scale-100 transition-scale duration-300 active:scale-95">
                    <h1 className="text-sm">Xem tất cả HOT NHẤT TECHSHOP</h1>
                    <div className="rounded-full">
                      <ArrowRightIcon className="size-4" fill="transparent"/>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
    )
}