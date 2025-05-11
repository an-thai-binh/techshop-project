'use client'
import ProductCatalog from '@/component/ProductCatalog'
import Introduce from '@/component/Introduce'
import Image from 'next/image'
import HotProductSlider from '@/features/product/components/HotProductSlider'
import ProductListSlider from '@/features/product/components/ProductListSlider'
import ProductListGrid from '@/features/product/components/ProductListGrid'
import { ProductType } from '@/features/product/types/ProductType'
import { CategoriesType } from '@/features/categories/types/CategoriesType'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
type HomeProps = {
  categories: CategoriesType[]
  products: {
    hotProducts: ProductType[]
    sliderProducts: ProductType[]
    gridProducts: ProductType[]
  }
}
export default function HomePage(_props: HomeProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0, y: -20 }}
        animate={{ height: '100%', opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        className={'flex size-full flex-col items-center gap-4 bg-gray-200 px-0 dark:bg-gray-900'}
      >
        <div className="flex h-[50vh] w-full justify-center gap-0 px-2 xl:justify-end">
          {/* Sidebar */}
          <div className="relative w-[20vw]">
            <ProductCatalog items={_props.categories} />
          </div>
          <Introduce />
        </div>
        <div className="flex h-[20vh] w-full items-center justify-between gap-4 px-2 sm:h-[30vh] md:h-[50vh] lg:h-[70vh]">
          <div className="flex size-full items-center justify-center shadow-sm">
            <div className="relative size-full">
              <Image
                src={'/image/img_5.jpg'}
                alt="img_5"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
          <div className="flex size-full items-center justify-center shadow-sm">
            <div className="relative size-full">
              <Image
                src={'/image/img_6.jpg'}
                alt="img_6"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
          <div className="flex size-full items-center justify-center shadow-sm">
            <div className="relative size-full">
              <Image
                src={'/image/img_7.jpg'}
                alt="img_7"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
        </div>
        <HotProductSlider items={_props.products.hotProducts} categories={_props.categories} />
        <ProductListSlider items={_props.products.sliderProducts} categories={_props.categories} />
        <ProductListGrid items={_props.products.gridProducts} categories={_props.categories} />
      </motion.div>
    </AnimatePresence>
  )
}
