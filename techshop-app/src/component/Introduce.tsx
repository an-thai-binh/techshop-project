import Image from 'next/image'
import ImageSlider from './ImageSlider'

export default function Introduce() {
  return (
    <div className="flex h-full w-full items-center justify-center sm:w-full md:w-full lg:w-[80vw]">
      <div className="flex size-full flex-col gap-4 pt-4 sm:ml-0 sm:flex-col md:ml-0 md:flex-col lg:ml-4 lg:flex-row">
        <div className="flex h-full w-full items-center justify-center sm:w-full md:w-full lg:w-[70%]">
          <div className="size-full shadow-xl">
            <ImageSlider />
          </div>
        </div>
        <div className="flex h-[20vh] w-full flex-row justify-center gap-4 sm:h-[30vh] sm:w-full sm:flex-row md:h-[40vh] md:w-full md:flex-row lg:h-[40vh] lg:w-[30%] lg:flex-col">
          <div className="relative size-full shadow-xl">
            <Image
              src={'/image/img_1.jpg'}
              alt="img_1"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="relative size-full rounded-md bg-red-500 shadow-xl">
            <Image
              src={'/image/img_2.jpg'}
              alt="img_2"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="relative size-full rounded-md bg-red-500 shadow-xl">
            <Image
              src={'/image/img_3.jpg'}
              alt="img_3"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
