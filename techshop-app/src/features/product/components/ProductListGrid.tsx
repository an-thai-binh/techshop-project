'use client'
import CardProduct from './CardProduct'
import { ProductType } from '@/features/product/types/ProductType'
import { CategoryType } from '@/features/categories/types/CategoriesType'
import { useEffect, useState } from 'react'
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

type ProductListGridProps = {
  categories: CategoryType[]
  items: ProductType[]
}

export default function ProductListGrid(_props: ProductListGridProps) {
  const [category, setCategory] = useState<CategoryType | undefined>(_props.categories[0])
  const [products, setProducts] = useState<ProductType[]>([])
  const [productsShow, setProductShow] = useState<ProductType[]>([])
  const [stateShow, setStateShow] = useState<boolean>(true)
  useEffect(() => {
    const result = _props.items.filter((i) => category?.id == i.categoryId)
    setStateShow(true)
    setProducts(result)
  }, [_props.items, category?.id])
  useEffect(() => {
    let items: ProductType[]
    if (stateShow) {
      items = products.slice(0, 10)
    } else {
      items = products.slice(0, products.length)
    }
    setProductShow(items)
  }, [products, stateShow])
  const handleSetCategory = (categoryId: number) => {
    const category = _props.categories.find((c) => categoryId == c.id)
    setCategory(category)
  }
  return (
    <div className="flex size-full justify-center px-2">
      <div className="flex w-full flex-col gap-2 px-2 py-1">
        <div className="flex items-center justify-center rounded-md py-2">
          <div
            className={
              'flex w-full items-center justify-between rounded-md bg-white dark:bg-gray-800'
            }
          >
            <div className={'flex items-center justify-center px-4 py-2'}>
              <h1 className={'text-md font-semibold text-gray-950 dark:text-white'}>
                {category?.categoryName}
              </h1>
            </div>
            <div className="flex justify-center gap-2 rounded-md px-4 py-2">
              {_props.categories?.map((c) => (
                <div onClick={() => handleSetCategory(c.id)} key={c.id} className="w-full">
                  <input type="radio" name="category" className={'peer hidden'} />
                  <button
                    className={`text-nowrap rounded-md px-2 py-1 duration-300 ${category?.id === c.id ? 'bg-blue-500/90' : 'bg-gray-700'}`}
                  >
                    {c.categoryName}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {productsShow.map((item) => (
            <CardProduct key={item.id} backgroundColor="bg-white dark:bg-gray-800" item={item} />
          ))}
        </div>
        <div className={'mt-2 flex items-center justify-center'}>
          <button
            className={
              'flex scale-100 transform items-center rounded-md bg-gray-300 px-2 py-1 text-gray-900 shadow-md transition-all ease-in-out hover:bg-gray-300/50 active:scale-95 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700/50'
            }
          >
            {stateShow ? (
              <div onClick={() => setStateShow(false)} className={'flex items-center gap-2'}>
                <div className={'flex items-center'}>
                  <h1 className={'text-sm font-semibold'}>Xem thêm</h1>
                </div>
                <div className={'flex items-center'}>
                  <ArrowDownCircleIcon
                    className={'size-4'}
                    fill={'transparent'}
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            ) : (
              <div onClick={() => setStateShow(true)} className={'flex items-center gap-2'}>
                <div className={'flex items-center'}>
                  <h1 className={'text-sm font-semibold'}>Ẩn bớt</h1>
                </div>
                <div className={'flex items-center'}>
                  <ArrowUpCircleIcon className={'size-4'} fill={'transparent'} strokeWidth={2.5} />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
