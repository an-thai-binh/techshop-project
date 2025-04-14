import { XMarkIcon } from '@heroicons/react/24/outline'
interface CartItemProps {
  imgSrc: string
  name: string
  price: number
}

export default function CartItem(_props: CartItemProps) {
  return (
    <>
      <div className="flex w-full gap-2">
        <div className="size-20 rounded-sm bg-gray-500">{_props.imgSrc}</div>
        <div className="flex grow flex-col gap-2">
          <div className="flex grow items-start justify-between">
            <div className="flex items-center">
              <h1 className="text-md font-bold">{_props.name}</h1>
            </div>
            <div className="flex items-center justify-center">
              <XMarkIcon className={'size-5'} />
            </div>
          </div>
          <div className="flex h-fit items-center justify-between rounded-sm">
            <div className="flex items-center justify-center gap-0 border border-gray-500">
              <div className="flex items-center justify-center">
                <button className="box-content bg-gray-500 px-2">-</button>
              </div>
              <div className="flex items-center justify-center px-2">
                <span className="text-md font-bold">1</span>
              </div>
              <div className="flex items-center justify-center">
                <button className="box-content bg-gray-500 px-2">+</button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-md font-bold">{_props.price}</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}
