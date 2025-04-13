'use client'
import { useRef } from 'react'
import BarsIcon from '../assets/Icon/bars'
import CheckCircleIcon from '../assets/Icon/check-circle'
import SearchIcon from '../assets/Icon/search'
import ShoppingCartIcon from '../assets/Icon/shopping-cart'
import TrophyIcon from '../assets/Icon/trophy'
import TruckIcon from '../assets/Icon/truck'
import UserCircleIcon from '../assets/Icon/user-circle'
import { useUIContext } from '../context/UIContext'
import DropdownCart from './DropdownCart'
import ProductCatalog from './ProductCatalog'
import DropdownSearch from '@/shared/component/DropdownSearch'

export default function Header() {
  const refCatalog = useRef<HTMLDivElement>(null)
  const { state, dispatch } = useUIContext()
  return (
    <>
      <header className="sticky top-0 z-40 flex size-full flex-col justify-center">
        <div className="flex size-full flex-wrap items-center justify-between gap-5 bg-gray-950 p-2">
          <div className="order-1 flex items-center p-2">
            <h1 className="text-2xl font-extrabold text-blue-500">Techshop</h1>
          </div>
          <div
            className={`relative order-3 flex w-full items-center justify-between gap-2 rounded-md ${state.dropdownType === 'search' ? 'z-50 rounded-b-none' : ''} bg-gray-800 transition-all duration-300 sm:order-2 sm:w-1/2 md:order-2 md:w-1/2 lg:order-2 lg:w-1/2`}
          >
            <div
              onClick={() =>
                dispatch({ type: 'OPEN_DROPDOWN', payload: { dropdownType: 'search' } })
              }
              className={'flex h-full w-full items-center p-1'}
            >
              <input
                type="text"
                placeholder="Search"
                className="peer w-full rounded-none bg-transparent px-2 py-1 text-white outline-none"
              />
              <div className="flex items-center rounded-md peer-focus:animate-pulse hover:bg-gray-700">
                <button className="p-2">
                  <SearchIcon className="size-6" fill="transparent" />
                </button>
              </div>
            </div>
            {state.isDropdownVisible && state.dropdownType === 'search' && <DropdownSearch />}
          </div>
          <div
            className={
              'order-2 flex w-auto items-center justify-center gap-5 sm:order-3 sm:w-1/6 md:order-3 md:w-1/6 lg:order-3 lg:w-1/6'
            }
          >
            <div className={`flex items-center ${state.dropdownType === 'cart' ? 'z-50' : ''}`}>
              <div className="relative flex flex-col items-center justify-center gap-2">
                <button
                  className="relative rounded-full p-2 hover:bg-gray-700"
                  onMouseDown={() =>
                    dispatch({ type: 'OPEN_DROPDOWN', payload: { dropdownType: 'cart' } })
                  }
                >
                  <ShoppingCartIcon className="size-7" fill="transparent" />
                  <span className="absolute right-0 top-0 rounded-xl bg-blue-500 p-1 text-xs">
                    12
                  </span>
                </button>
                {state.isDropdownVisible && state.dropdownType === 'cart' && <DropdownCart />}
              </div>
            </div>
            <div className="flex items-center rounded-full hover:bg-gray-700">
              <button className="p-2">
                <UserCircleIcon className="size-7" fill="transparent" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="w-full bg-gray-900">
        <div className="mx-2 flex items-center gap-8 bg-gray-800 px-2 py-4">
          <div ref={refCatalog} className="relative flex w-[20vw] items-center gap-2">
            <button
              onMouseDown={() => dispatch({ type: 'TOGGLE_CATALOG' })}
              className="size-6 rounded-full"
            >
              <BarsIcon className="size-6 animate-pulse hover:animate-bounce" fill="transparent" />
            </button>
            {state.isCatalogVisible && <ProductCatalog className="-left-2 top-10" />}
            <h1 className="text-sm font-bold">
              <span className={'hidden lg:block'}>DANH MỤC SẢN PHẨM</span>
              <span className={'hidden sm:block lg:hidden'}>DANH MỤC</span>
            </h1>
          </div>
          <div className="flex w-full items-start justify-around gap-4 sm:justify-center md:justify-center lg:justify-normal">
            <div className="flex items-center gap-1">
              <div className="size-5 rounded-full">
                <TrophyIcon className="size-5" fill="transparent" />
              </div>
              <h1 className="hidden text-xs font-light text-white sm:block md:block lg:block">
                Đảm bảo chất lượng
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <div className="size-5 rounded-full">
                <CheckCircleIcon className="size-5" fill="transparent" />
              </div>
              <h1 className="hidden text-xs font-light text-white sm:block md:block lg:block">
                Miễn phí vận chuyển đơn trên 300k
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <div className="size-5 rounded-full">
                <TruckIcon className="size-full" fill="transparent" />
              </div>
              <h1 className="hidden text-xs font-light text-white sm:block md:block lg:block">
                Mở hộp kiểm tra nhận hàng
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
