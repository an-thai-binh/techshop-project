'use client'
import ProductCatalog from '@/component/ProductCatalog'
import Introduce from '@/component/Introduce'
import Image from 'next/image'
import HotProductSlider from '@/features/product/components/HotProductSlider'
import ProductListSlider from '@/features/product/components/ProductListSlider'
import { ProductDataType } from '@/features/product/types/ProductType'
import { CategoryType } from '@/features/categories/types/CategoriesType'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useAppDispatch } from '@/shared/redux/hook'
import { setProducts } from '@/features/product/productSlice'

type HomeProps = {
  categories: CategoryType[]
  products: {
    hotProducts: ProductDataType
    sliderProducts: ProductDataType
    gridProducts: ProductDataType
  }
  category?: []
}
export default function HomePage(_props: HomeProps) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setProducts(_props.products.gridProducts.content))
  })
  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0, y: -20 }}
        animate={{ height: '100%', opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        className={'flex size-full flex-col items-center gap-4 bg-gray-50 px-0 dark:bg-gray-900'}
      >
        <div className="flex h-[42vh] w-full justify-center gap-0 px-2 xl:justify-end">
          {/* Sidebar */}
          <div className="relative w-[20vw]">
            <ProductCatalog items={_props.categories} />
          </div>
          <Introduce />
        </div>
        <div className="flex w-full items-center justify-center gap-4 px-2">
          <div className="flex size-full items-center justify-center shadow-sm">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={'/image/img_5.jpg'}
                alt="img_5"
                fill
                sizes={'100%'}
                className="rounded-md object-cover"
              />
            </div>
          </div>
          <div className="flex size-full items-center justify-center shadow-sm">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={'/image/img_6.jpg'}
                alt="img_6"
                sizes={'100%'}
                fill
                className="rounded-md object-cover"
              />
            </div>
          </div>
          <div className="flex size-full items-center justify-center shadow-sm">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={'/image/img_7.jpg'}
                alt="img_7"
                sizes={'100%'}
                fill
                className="rounded-md object-cover"
              />
            </div>
          </div>
        </div>
        {/*<HotProductSlider*/}
        {/*  items={_props.products.hotProducts.content}*/}
        {/*  category={_props.categories[0]}*/}
        {/*/>*/}
        {/*<ProductListSlider*/}
        {/*  items={_props.products.sliderProducts.content}*/}
        {/*  category={_props.categories[1]}*/}
        {/*/>*/}
        {_props.categories.map((r) => {
          const filteredItems = _props.products.gridProducts.content.filter(
            (item) => item.categoryId === r.id,
          )

          if (filteredItems.length === 0) return null

          return <ProductListSlider key={r.id} items={filteredItems} category={r} />
        })}
        {/*<ProductListGrid*/}
        {/*  items={_props.products.gridProducts.content}*/}
        {/*  categories={_props.categories}*/}
        {/*/>*/}
        <div
          className={'grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}
        ></div>
      </motion.div>
    </AnimatePresence>
  )
}
