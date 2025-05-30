'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useUIContext } from '@/shared/context/UIContext'
import DropdownCart from '../features/cart/components/DropdownCart'
import ProductCatalog from './ProductCatalog'
import DropdownSearch from '@/features/search/components/DropdownSearch'
import Link from 'next/link'
import {
  Bars3Icon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  TrophyIcon,
  TruckIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { CategoryType } from '@/features/categories/types/CategoriesType'
import DropdownUser from '@/features/user/components/DropdownUser'
import { useAppSelector } from '@/shared/redux/hook'
import AppInitializer from '@/component/AppInitializer'
import { selectCartTotalItems } from '@/features/cart/cartSelectors'

export default function Header() {
  const [inputSearch, setInputSearch] = useState('')
  const [categories, setCategories] = useState<CategoryType[]>([])
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  useEffect(() => {
    fetch('http://localhost:8080/techshop/category/all')
      .then((res) => res.json())
      .then((res) => setCategories(res.data))
      .catch(console.error)
  }, [])
  const refCatalog = useRef<HTMLDivElement>(null)
  const { state, dispatch } = useUIContext()
  const totalItem = useAppSelector(selectCartTotalItems)
  return (
    <>
      <AppInitializer />
      <header className="sticky top-0 z-30 flex size-full flex-col justify-center">
        <div className="flex size-full flex-wrap items-center justify-between gap-1 bg-white p-2 shadow-md backdrop-blur-sm dark:bg-gray-950/80">
          <Link href={`/`}>
            <div className="order-1 flex items-center p-2 shadow-white drop-shadow-md">
              <h1 className="text-2xl font-extrabold text-blue-500">Techshop</h1>
            </div>
          </Link>
          <div
            className={`relative order-3 flex w-full items-center justify-between gap-2 rounded-md ${state.dropdownType === 'search' ? 'rounded-b-none' : ''} bg-gray-300 transition-all duration-300 dark:bg-gray-800 sm:order-2 sm:w-1/2 md:order-2 md:w-1/2 lg:order-2 lg:w-1/2`}
          >
            <div
              onClick={() =>
                dispatch({ type: 'OPEN_DROPDOWN', payload: { dropdownType: 'search' } })
              }
              className={'flex h-full w-full items-center p-1'}
            >
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="peer w-full rounded-none bg-transparent px-2 py-1 font-semibold text-gray-950/50 outline-none placeholder:text-sm placeholder:font-semibold dark:text-white"
                onChange={(e) => setInputSearch(e.target.value)}
              />
              <div className="flex items-center rounded-md peer-focus:animate-pulse hover:bg-gray-500/50">
                <button className="p-2">
                  <MagnifyingGlassIcon
                    className="size-6 text-gray-950/50 dark:text-white"
                    fill="transparent"
                    strokeWidth={2.5}
                  />
                </button>
              </div>
            </div>
            {state.isDropdownVisible && state.dropdownType === 'search' && (
              <DropdownSearch inputSearch={inputSearch} />
            )}
          </div>
          <div
            className={
              'order-2 flex w-auto items-center justify-center gap-5 sm:order-3 sm:w-1/6 md:order-3 md:w-1/6 lg:order-3 lg:w-1/6'
            }
          >
            <div className={'hidden items-center sm:flex'}>
              <div className="relative flex flex-col items-center justify-center gap-2">
                <button
                  className="relative rounded-full p-2 hover:bg-gray-500/50"
                  onMouseDown={() =>
                    dispatch({ type: 'OPEN_DROPDOWN', payload: { dropdownType: 'cart' } })
                  }
                >
                  <ShoppingCartIcon
                    className="size-7 text-gray-950/50 dark:text-white"
                    fill="transparent"
                    strokeWidth={2.5}
                  />
                  <span className="absolute right-0 top-1 size-4 rounded-full bg-blue-500 text-xs">
                    {totalItem}
                  </span>
                </button>
                {state.isDropdownVisible && state.dropdownType === 'cart' && <DropdownCart />}
              </div>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() =>
                      dispatch({ type: 'OPEN_DROPDOWN', payload: { dropdownType: 'user' } })
                    }
                    className="rounded-full p-2 hover:bg-gray-500/50"
                  >
                    <UserCircleIcon
                      className="size-7 text-gray-950/50 dark:text-white"
                      fill="transparent"
                      strokeWidth={2.5}
                    />
                  </button>
                  {state.isDropdownVisible && state.dropdownType === 'user' && <DropdownUser />}
                </>
              ) : (
                <Link href={'/auth/login'}>
                  <button className="rounded-md border hover:bg-gray-500/50">
                    <div className={'flex items-center'}>
                      <div className={'px-2 py-1'}>
                        <UserCircleIcon
                          className="size-7 text-gray-950/50 dark:text-white"
                          fill="transparent"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div className={'px-2 py-1'}>
                        <h1 className={'font-semibold'}>Đăng nhập</h1>
                      </div>
                    </div>
                  </button>
                </Link>
              )}

              {/*{state.isDropdownVisible && state.dropdownType === 'user' && <DropdownUser />}*/}
            </div>
          </div>
        </div>
      </header>
      <div className="w-full bg-white dark:bg-gray-950/80">
        <div className="mx-2 flex items-center gap-8 bg-white px-2 py-4 text-black dark:bg-gray-800 dark:text-white">
          <div ref={refCatalog} className="relative flex w-[20vw] items-center gap-2">
            <button
              onMouseDown={() => dispatch({ type: 'TOGGLE_CATALOG' })}
              className="size-6 rounded-full"
            >
              <Bars3Icon className="size-6" fill="transparent" strokeWidth={2.0} />
            </button>
            {state.isCatalogVisible && (
              <ProductCatalog items={categories} className="-left-2 top-10" />
            )}
            <h1 className="text-sm font-bold">
              <span className={'hidden lg:block'}>DANH MỤC SẢN PHẨM</span>
              <span className={'hidden sm:block lg:hidden'}>DANH MỤC</span>
            </h1>
          </div>
          <div className="flex w-full items-start justify-around gap-4 sm:justify-center md:justify-center lg:justify-normal">
            <div className="flex items-center gap-1">
              <div className="size-5 rounded-full">
                <TrophyIcon
                  className="size-5 text-gray-500 dark:text-gray-100"
                  fill="transparent"
                  strokeWidth={2.0}
                />
              </div>
              <h1 className="hidden text-xs font-light sm:block md:block lg:block">
                Đảm bảo chất lượng
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <div className="size-5 rounded-full">
                <CheckCircleIcon
                  className="size-5 text-gray-500 dark:text-gray-100"
                  fill="transparent"
                  strokeWidth={2.0}
                />
              </div>
              <h1 className="hidden text-xs font-light sm:block md:block lg:block">
                Miễn phí vận chuyển đơn trên 300k
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <div className="size-5 rounded-full">
                <TruckIcon
                  className="size-full text-gray-500 dark:text-gray-100"
                  fill="transparent"
                  strokeWidth={2.0}
                />
              </div>
              <h1 className="hidden text-xs font-light sm:block md:block lg:block">
                Mở hộp kiểm tra nhận hàng
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
