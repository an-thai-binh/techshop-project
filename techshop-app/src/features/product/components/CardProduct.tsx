import Image from 'next/image'
import { ShoppingCartIcon } from '@heroicons/react/16/solid'
import { ProductType } from '@/features/product/types/ProductType'
import Link from 'next/link'
import { HeartIcon } from '@heroicons/react/24/solid'
import { useAppDispatch } from '@/shared/redux/hook'
import { fetchAddItemCartFromApi } from '@/features/cart/cartThunks'
import { formatPrice } from '@/utils/CurrentyFormat'
import BuyCardButton from '@/component/button/BuyCardButton'

type CartItemProps = {
  className?: string
  item: ProductType
}
export default function CardProduct(_props: CartItemProps) {
  const dispatch = useAppDispatch()
  return (
    <Link href={`/product-detail/${_props.item.id}`}>
      <div
        className={`sm:h[40vh] xl:[50vh] relative flex h-[35vh] shadow-md ring-2 ring-white/10 duration-300 hover:ring-white lg:h-[45vh] ${_props.className} cursor-pointer rounded-md text-black dark:text-white`}
      >
        <div className="flex size-full flex-col items-center justify-between gap-2 p-2">
          <div className="relative flex h-[20vh] w-full items-center justify-center overflow-hidden rounded-md bg-white sm:h-[20vh] md:h-[30vh] lg:h-[30vh]">
            <Image
              src={_props.item.productImgUrl}
              layout="fill"
              sizes={'auto'}
              objectFit="contain"
              alt={`Hình ảnh ${_props.item.productName}`}
              className="scale-100 transform rounded-md transition duration-500 hover:scale-110"
            />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h1 className="line-clamp-2 text-center text-sm font-bold">
              {_props.item.productName}
            </h1>
            <p className="line-clamp-2 text-xs font-light">{_props.item.productDescription}</p>
          </div>
          <div className="flex w-full justify-center gap-1 sm:w-full sm:flex-col-reverse sm:justify-between">
            <div className="flex w-full items-center justify-center">
              <h1 className="text-md font-extrabold">
                <span>{formatPrice(_props.item.productBasePrice)}</span>
              </h1>
            </div>
            <div className="flex w-full items-center justify-center gap-2">
              <p className="text-xs font-light text-gray-500 line-through">
                <span>{formatPrice(_props.item.productBasePrice)}</span>
              </p>
              <p className="hidden rounded-sm bg-red-900/80 px-1 py-1 text-xs font-light sm:block">
                -<span>{0}</span>%
              </p>
            </div>
          </div>
          <div className="flex w-full items-center">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="hidden items-center sm:flex md:flex lg:flex">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="group size-full rounded-full"
                >
                  <div className="flex items-center justify-center rounded-full p-2 group-hover:bg-gray-300/50">
                    <HeartIcon className={'size-5 text-gray-300 dark:text-white'} />
                  </div>
                </button>
              </div>
              <div className="flex items-center justify-center">
                <BuyCardButton />
              </div>
              <div className="hidden items-center sm:flex md:flex lg:flex">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    dispatch(fetchAddItemCartFromApi(_props.item.id))
                  }}
                  className="group size-full rounded-full"
                >
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
