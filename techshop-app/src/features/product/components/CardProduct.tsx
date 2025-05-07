import Image from 'next/image'
import { ShoppingCartIcon } from '@heroicons/react/16/solid'
import { ProductType } from '@/features/product/types/ProductType'
import Link from 'next/link'
import { HeartIcon } from '@heroicons/react/24/solid'

type CartItemProps = {
  backgroundColor?: string
  item: ProductType
}
export default function CardProduct(_props: CartItemProps) {
  return (
    <Link href={`/product-detail/${_props.item.product_name}`}>
      <div
        className={`sm:h[40vh] xl:[50vh] relative flex h-[35vh] lg:h-[45vh] ${_props.backgroundColor} cursor-pointer rounded-md text-black dark:text-white`}
      >
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-between gap-2 p-2">
          <div className="relative flex h-[20vh] w-full overflow-hidden rounded-md sm:h-[20vh] md:h-[30vh] lg:h-[30vh]">
            <Image
              src={_props.item.product_img_url}
              layout="fill"
              sizes={'auto'}
              objectFit="contain"
              alt={`Hình ảnh ${_props.item.product_name}`}
              className="scale-100 transform rounded-md transition duration-500 hover:scale-110"
            />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h1 className="line-clamp-2 text-center text-sm font-bold">
              {_props.item.product_name}
            </h1>
            <p className="line-clamp-2 text-xs font-light">{_props.item.product_description}</p>
          </div>
          <div className="flex w-full justify-center gap-1 sm:w-full sm:flex-col-reverse sm:justify-between">
            <div className="flex w-full items-center justify-center">
              <h1 className="text-sm font-extrabold">
                <span>{_props.item.product_base_price}</span> $
              </h1>
            </div>
            <div className="flex w-full items-center justify-center gap-2">
              <p className="text-xs font-light text-gray-500 line-through">
                <span>{_props.item.product_base_price}</span> $
              </p>
              <p className="hidden rounded-sm bg-red-900/80 px-1 py-1 text-xs font-light sm:block">
                -<span>{_props.item.product_base_price}</span>%
              </p>
            </div>
          </div>
          <div className="flex w-full items-center">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="hidden items-center sm:flex md:flex lg:flex">
                <button className="group size-full rounded-full">
                  <div className="flex items-center justify-center rounded-full p-2 group-hover:bg-gray-300/50">
                    <HeartIcon className={'size-5 text-gray-300 dark:text-white'} />
                  </div>
                </button>
              </div>
              <div className="flex items-center justify-center">
                {/*<button className="box-content size-full rounded-md border border-gray-300 bg-gray-300 px-4 py-2 dark:bg-gray-300/30">*/}
                {/*  <h1 className="text-sm font-bold">MUA NGAY</h1>*/}
                {/*</button>*/}
                <button className="size-full rounded-full">
                  <div className="border-gray flex items-center justify-center rounded-md border border-gray-300/50 bg-gray-300 p-2 hover:bg-gray-300/50 dark:border-gray-700/50 dark:bg-gray-700 dark:hover:bg-gray-700/50">
                    <h1 className="text-sm font-bold">MUA NGAY</h1>
                  </div>
                </button>
              </div>
              <div className="hidden items-center sm:flex md:flex lg:flex">
                <button className="group size-full rounded-full">
                  <div className="flex items-center justify-center rounded-full p-2 group-hover:bg-gray-300/50">
                    <ShoppingCartIcon className={'size-5 text-gray-300 dark:text-white'} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
