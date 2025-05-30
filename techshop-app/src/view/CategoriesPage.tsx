'use client'
import CollectionListGrid from '@/features/categories/components/CollectionListGrid'
import { CategoryType } from '@/features/categories/types/CategoriesType'
import { ProductType } from '@/features/product/types/ProductType'
import AnimationMotion from '@/component/AnimationMotion'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

type CategoriesPageProps = {
  category?: CategoryType
  items: ProductType[]
}

export default function CategoriesPage(_props: CategoriesPageProps) {
  return (
    <AnimationMotion
      className={
        'flex size-full flex-col items-center gap-4 bg-gray-200 px-0 text-black dark:bg-gray-900 dark:text-white'
      }
    >
      <div className={'flex h-fit w-full items-center px-2 py-4'}>
        <div className={'flex items-center gap-2'}>
          <Link href={'/'}>
            <div className={'flex items-center justify-center'}>
              <h1 className={'text-xs font-bold'}>Trang chủ</h1>
            </div>
          </Link>
          <div className={'flex items-center justify-center'}>
            <ChevronRightIcon className={'size-3'} strokeWidth={2.5} />
          </div>
          <div className={'flex items-center justify-center'}>
            <h1 className={'text-xs font-bold'}>{_props.category?.categoryName}</h1>
          </div>
        </div>
      </div>
      <div className={'container'}>
        <CollectionListGrid items={_props.items} category={_props.category} />
      </div>
    </AnimationMotion>
  )
}
