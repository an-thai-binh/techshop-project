"use client";
import {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Autoplay, Navigation, Pagination} from "swiper/modules";

interface Block {
    type: string;
    content?: string;
    src?: string;
    alt?: string;
    images?: string[];
}
export default function ProductDescription({blocks} : {blocks: Block[]}){
    const [expanded, setExpanded] = useState(false);

    const visibleCount = 3;
    const visibleBlocks = expanded ? blocks : blocks.slice(0, visibleCount);
        return(
            <div className="container flex flex-col justify-center space-y-4 w-full my-4">
                {visibleBlocks.map((block, idx) => {
                    switch (block.type) {
                        case 'text':
                            return (
                                <div key={idx} dangerouslySetInnerHTML={{ __html: block.content || '' }} />
                            );
                        case 'image':
                            return (
                                <div className={"flex justify-center w-full"}>
                                    <img
                                        key={idx}
                                        src={block.src}
                                        alt={block.alt || ''}
                                        className="max-w-[90%] h-96 rounded-lg object-contain transform rotate-0 scale-100 transition-all duration-300 ease-in-out hover:rotate-2 hover:scale-110 active:animate-ping"
                                    />
                                </div>
                            );
                        case 'video':
                            return (
                                <div key={idx} className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        src={block.src}
                                        className="w-full min-h-96 rounded-md shadow shadow-gray-700"
                                        allowFullScreen
                                    />
                                </div>
                            );
                        case 'slider':
                            return (
                                <Swiper
                                    key={idx}
                                    modules={[Navigation, Pagination, Autoplay]}
                                    className={"h-[60vh] w-full cursor-pointer rounded-md"}
                                    loop={true}
                                    freeMode={true}
                                    autoplay={
                                        {
                                            delay: 3000,
                                            disableOnInteraction: true,
                                        }
                                    }
                                    breakpoints={
                                        {
                                            640: {
                                                slidesPerView: 1,
                                                spaceBetween: 5,
                                            },
                                            768: {
                                                slidesPerView: 1,
                                                spaceBetween: 5,
                                            },
                                            1024: {
                                                slidesPerView: 2,
                                                spaceBetween: 10,
                                            }
                                        }
                                    }
                                >
                                    {block.images?.map((img, i) => (
                                        <SwiperSlide key={i}>
                                            <div className={"relative size-full"}>
                                                <img src={img} alt={`Slide ${i}`} className="size-full rounded-md object-cover" />
                                            </div>
                                            {/*<Image src={img} alt={`Slide ${i}`} className={"w-full rounded-md"} layout="fill" objectFit="cover"/>*/}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            );
                        default:
                            return null;
                    }
                })}
                {blocks.length > visibleCount && (
                    <div className="text-center w-full">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-blue-500 mt-4 text-sm"
                        >
                            {expanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
                        </button>
                    </div>
                )}
            </div>
        );
}