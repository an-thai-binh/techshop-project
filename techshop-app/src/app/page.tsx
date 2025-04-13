import Image from 'next/image'
import HotProductSlider from '@/shared/component/HotProductSlider'
import ProductListSlider from '@/shared/component/ProductListSlider'
import Introduce from '@/shared/component/Introduce'
import ProductCatalog from '@/shared/component/ProductCatalog'
import ProductListGrid from '@/shared/component/ProductListGrid'

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-gray-900 px-0">
      <div className="flex h-[50vh] w-full justify-center gap-0 px-2 xl:justify-end">
        {/* Sidebar */}
        <div className="relative w-[20vw]">
          <ProductCatalog />
        </div>
        <Introduce />
      </div>
      <div className="flex h-[20vh] w-full items-center justify-between gap-4 px-2 sm:h-[30vh] md:h-[50vh] lg:h-[70vh]">
        <div className="flex size-full items-center justify-center shadow-2xl">
          <div className="relative size-full">
            <Image
              src={'/image/img_5.jpg'}
              alt="img_5"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
        <div className="flex size-full items-center justify-center shadow-2xl">
          <div className="relative size-full">
            <Image
              src={'/image/img_6.jpg'}
              alt="img_6"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
        <div className="flex size-full items-center justify-center shadow-2xl">
          <div className="relative size-full">
            <Image
              src={'/image/img_7.jpg'}
              alt="img_7"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
      <HotProductSlider />
      <ProductListSlider />
      <ProductListGrid title={'IPad'} />
      {/*<ProductListGrid/>*/}
      {/*<ProductListGrid/>*/}
    </div>
  )
}
