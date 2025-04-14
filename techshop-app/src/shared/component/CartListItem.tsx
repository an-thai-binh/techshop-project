import { XMarkIcon } from '@heroicons/react/24/outline'
import CartItem from '@/shared/component/CartItem'

export default function CartListItem() {
  return (
    <div className="flex grow items-center justify-center overflow-hidden py-0 pl-1">
      <div className="size-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-800 scrollbar-corner-amber-500">
        <div className="mx-1 flex flex-col justify-start gap-4">
          {/* ItemCart */}
          <CartItem />
          <div className="flex w-full gap-2">
            <div className="size-20 rounded-sm bg-gray-500">ảnh</div>
            <div className="flex grow flex-col gap-2">
              <div className="flex grow items-start justify-between">
                <div className="flex items-center">
                  <h1 className="text-md font-bold">Macbook Pro M1</h1>
                </div>
                <div className="flex items-center">
                  <span className="text-md font-bold">X</span>
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
                  <span className="text-md font-bold">199.0$</span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex w-full gap-2">
            <div className="size-20 rounded-sm bg-gray-500">ảnh</div>
            <div className="flex grow flex-col gap-2">
              <div className="flex grow items-start justify-between">
                <div className="flex items-center">
                  <h1 className="text-md font-bold">Macbook Pro M1</h1>
                </div>
                <div className="flex items-center">
                  <span className="text-md font-bold">X</span>
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
                  <span className="text-md font-bold">199.0$</span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex w-full gap-2">
            <div className="size-20 rounded-sm bg-gray-500">ảnh</div>
            <div className="flex grow flex-col gap-2">
              <div className="flex grow items-start justify-between">
                <div className="flex items-center">
                  <h1 className="text-md font-bold">Macbook Pro M1</h1>
                </div>
                <div className="flex items-center">
                  <span className="text-md font-bold">X</span>
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
                  <span className="text-md font-bold">199.0$</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
