import Image from "next/image";
import ImageSlider from "./ImageSlider";

export default function Introduce() {
    return (
        <div className="flex items-center justify-center h-full w-full sm:w-full md:w-full lg:w-[80vw]">
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row size-full sm:ml-0 md:ml-0 lg:ml-4 pt-4 gap-4">
                <div className="flex items-center w-full sm:w-full md:w-full lg:w-[70%] h-full justify-center">
                    <div className="size-full shadow-xl">
                        <ImageSlider/>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-row md:flex-row lg:flex-col justify-center w-full sm:w-full md:w-full lg:w-[30%] h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[40vh] gap-4">
                    <div className="relative size-full shadow-xl">
                        <Image src={"/image/img_1.jpg"} alt="img_1" layout="fill" objectFit="cover" className="rounded-md"/>
                    </div>
                    <div className="relative size-full bg-red-500 rounded-md shadow-xl">
                        <Image src={"/image/img_2.jpg"} alt="img_2" layout="fill" objectFit="cover" className="rounded-md"/>
                    </div>
                    <div className="relative size-full bg-red-500 rounded-md shadow-xl">
                        <Image src={"/image/img_3.jpg"} alt="img_3" layout="fill" objectFit="cover" className="rounded-md"/>
                    </div>
                </div>
            </div>
        </div>
    )
}