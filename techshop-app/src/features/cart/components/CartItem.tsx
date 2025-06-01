import { XMarkIcon } from '@heroicons/react/24/outline'
import { CartItemType } from '@/features/cart/types/CartItemType'
import Image from 'next/image'
import { formatPrice } from '@/utils/CurrentyFormat'
import { useAppDispatch } from '@/shared/redux/hook'
import {
  fetchAddItemCartFromApi,
  fetchDeleteItemCartFromApi,
  fetchSubtractItemCartFromApi,
} from '@/features/cart/cartThunks'
type CartItemProps = {
  item: CartItemType
}

export default function CartItem(_props: CartItemProps) {
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex w-full gap-2 text-black dark:text-white">
        <div className="relative flex h-20 min-w-20 items-center justify-center overflow-hidden rounded-sm">
          <Image
            src={_props.item.productImgUrl}
            width={80}
            height={80}
            sizes={'100%'}
            objectFit="contain"
            objectPosition={'center'}
            alt={`Hình ảnh ${_props.item.productName}`}
            className="scale-100 transform rounded-md transition duration-500 hover:scale-110"
          />
        </div>
        <div className="flex grow flex-col justify-between gap-1">
          <div className="flex grow items-start justify-between">
            <div className="flex items-center">
              <h1 className="text-md font-bold">{_props.item.productName}</h1>
            </div>
            <div
              onClick={() => dispatch(fetchDeleteItemCartFromApi(_props.item.id))}
              className="flex items-center justify-center"
            >
              <XMarkIcon className={'size-5'} />
            </div>
          </div>
          <div className={'flex items-start'}>
            <h1 className={'text-xs font-semibold text-black dark:text-white'}>
              SKU: <span>{_props.item.sku}</span>
            </h1>
          </div>
          <div className="flex h-fit items-center justify-between rounded-sm">
            <div className="flex items-center justify-center gap-0 border border-gray-500">
              <div className="flex items-center justify-center">
                <button
                  onClick={() => dispatch(fetchSubtractItemCartFromApi(_props.item.id))}
                  className="box-content bg-gray-500 px-2"
                >
                  -
                </button>
              </div>
              <div className="flex items-center justify-center px-2">
                <span className="text-md font-bold">{_props.item.quantity}</span>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => dispatch(fetchAddItemCartFromApi(_props.item.productVariationId))}
                  className="box-content bg-gray-500 px-2"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-md font-bold">
                {formatPrice(_props.item.productTotalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}
