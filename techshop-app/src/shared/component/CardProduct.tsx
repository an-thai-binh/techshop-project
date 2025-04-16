import Image from 'next/image'
import { ShoppingCartIcon } from '@heroicons/react/16/solid'
import { Product } from '@/app/collection/[categoryId]/page'

// export interface ProductProps {
//   id: number
//   image: string
//   name: string
//   description: string
//   old_price: number
//   discount_percent: number
//   new_price: number
// }

export interface CartItemProps {
  backgroundColor?: string
  productProps: Product | null
}
export default function CardProduct(_props: CartItemProps) {
  return (
    <div className={`flex h-full ${_props.backgroundColor} rounded-md shadow-xl`}>
      <div className="flex h-full w-full flex-col items-center justify-between gap-2 p-2">
        <div className="relative flex h-[20vh] w-full grow overflow-hidden rounded-md sm:h-[20vh] md:h-[30vh] lg:h-[30vh]">
          <Image
            src="/image/img_2.jpg"
            layout="fill"
            objectFit="cover"
            alt="aloalo"
            className="scale-100 transform rounded-md transition duration-500 hover:scale-110"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h1 className="text-center text-sm font-bold">{_props.productProps?.product_name}</h1>
          <p className="line-clamp-1 text-xs font-light sm:line-clamp-2">
            {_props.productProps?.product_description}
          </p>
        </div>
        <div className="flex w-full justify-center gap-1 sm:w-full sm:flex-col-reverse sm:justify-between">
          <div className="flex w-full items-center justify-center">
            <h1 className="text-sm font-extrabold">
              <span>{_props.productProps?.product_base_price}</span> $
            </h1>
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            <p className="text-xs font-light text-gray-500 line-through">
              <span>{_props.productProps?.product_base_price}</span> $
            </p>
            <p className="hidden rounded-sm bg-red-900 px-1 py-1 text-xs font-light sm:block">
              -<span>{_props.productProps?.product_base_price}</span>%
            </p>
          </div>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="hidden w-[10%] items-center sm:flex md:flex lg:flex">
              <button className="size-full rounded-lg bg-transparent px-2 py-1"></button>
            </div>
            <div className="flex grow items-center justify-center">
              <button className="rounded-lg bg-gray-800 px-4 py-2 hover:bg-gray-700">
                <h1 className="text-sm font-bold">MUA NGAY</h1>
              </button>
            </div>
            <div className="hidden items-center sm:flex md:flex lg:flex">
              <button className="size-full rounded-full">
                <div className="flex items-center justify-center rounded-full p-2 hover:bg-gray-700">
                  <ShoppingCartIcon className={'size-5'} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
