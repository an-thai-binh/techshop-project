import Image from 'next/image'
import ImageSlider from './ImageSlider'

export default function Introduce() {
  return (
    <div className="flex h-full w-full items-center justify-center pr-2 sm:w-full md:w-full lg:w-[80vw]">
      <div className="flex size-full flex-col gap-4 pt-4 sm:ml-0 sm:flex-col md:ml-0 md:flex-col lg:ml-4 lg:flex-row">
        <div className="flex h-full w-full items-center justify-center sm:w-full md:w-full lg:w-[70%]">
          <div className="size-full rounded-md border border-gray-300/50 shadow-sm dark:border-gray-900/50">
            <ImageSlider />
          </div>
        </div>
        <div className="flex h-[20vh] w-full flex-row justify-center gap-4 sm:h-[30vh] sm:w-full sm:flex-row md:h-[40vh] md:w-full md:flex-row lg:h-[40vh] lg:w-[30%] lg:flex-col">
          <div className="relative size-full rounded-md border border-gray-300/50 shadow-sm dark:border-gray-900/50">
            <Image
              src={'/image/img_1.jpg'}
              sizes={'100%'}
              alt="img_1"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div className="relative size-full rounded-md border border-gray-300/50 bg-white/10 shadow-sm dark:border-gray-900/50">
            <Image
              src={'/image/img_2.jpg'}
              alt="img_2"
              sizes={'100%'}
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div className="relative size-full rounded-md border border-gray-300/50 bg-white/10 shadow-sm dark:border-gray-900/50">
            <Image
              src={'/image/img_3.jpg'}
              alt="img_3"
              fill
              sizes={'100%'}
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
