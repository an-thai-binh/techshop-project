"use client";
import {Swiper, SwiperSlide} from "swiper/react";
import {useState} from "react";
import {Navigation, Pagination, Thumbs} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SliderDetailProduct(){
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
            <div className={"flex flex-col size-full"}>
                <Swiper spaceBetween={10}
                        modules={[Navigation, Thumbs, Pagination]}
                        navigation
                        thumbs={{swiper: thumbsSwiper}}
                        freeMode={true}
                        slidesPerView={1}
                        slidesPerGroup={1}
                        className="w-full h-[90%] cursor-pointer rounded-md mb-4"
                >
                    <SwiperSlide>
                        <div className="relative size-full">
                            <div className={"bg-blue-500 h-full"}>aloalo</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative size-full">
                            <div className={"bg-blue-500 h-full"}>aloalo</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative size-full">
                            <div className={"bg-blue-500 h-full"}>aloalo</div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                <Swiper
                    onSwiper={() => setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={3}
                    modules={[Thumbs]}
                    watchSlidesProgress
                    className={"w-full h-[20%] cursor-pointer"}
                    loop={true}
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
                    <SwiperSlide>
                        <div className="relative size-full">
                            <div className={"bg-blue-500 h-full rounded-md"}>aloalo</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative size-full">
                            <div className={"bg-blue-500 h-full"}>aloalo</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative size-full">
                            <div className={"bg-blue-500 h-full"}>aloalo</div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
    )
}