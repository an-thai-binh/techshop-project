'use client'
import React from 'react'
import Link from 'next/link'
import { CheckCircleIcon, TrophyIcon, TruckIcon } from '@heroicons/react/24/outline'
import AppInitializer from '@/component/AppInitializer'
import UserButton from '@/component/button/UserButton'
import CartButton from '@/component/button/CartButton'
import ProductCatalogButton from '@/component/button/ProductCatalogButton'
import InputSearchField from '@/component/form/InputSearchField'

export default function Header() {
  return (
    <>
      <AppInitializer />
      <header className="sticky top-0 z-30 flex size-full flex-col justify-center">
        <div className="flex size-full flex-wrap items-center justify-between gap-1 bg-white/80 p-2 shadow-md backdrop-blur-sm dark:bg-gray-950/80">
          <Link href={`/`}>
            <div className="order-1 flex items-center p-2 shadow-white drop-shadow-md">
              <h1 className="text-2xl font-extrabold text-blue-500">Techshop</h1>
            </div>
          </Link>
          <InputSearchField />
          <div
            className={
              'order-2 flex w-auto items-center justify-center gap-5 sm:order-3 sm:w-1/6 md:order-3 md:w-1/6 lg:order-3 lg:w-1/6'
            }
          >
            <CartButton />
            <UserButton />
          </div>
        </div>
      </header>
      <div className="w-full bg-white dark:bg-gray-950/80">
        <div className="mx-2 flex items-center gap-8 bg-white px-2 py-4 text-black dark:bg-gray-800 dark:text-white">
          <ProductCatalogButton />
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
