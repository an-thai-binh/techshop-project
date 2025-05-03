'use client'
import CardProduct from './CardProduct'
import { ProductType } from '@/features/product/types/ProductType'
import { CategoriesType } from '@/features/categories/types/CategoriesType'
import { useEffect, useState } from 'react'

type ProductListGridProps = {
  categories: CategoriesType[]
  items: ProductType[]
}

export default function ProductListGrid(_props: ProductListGridProps) {
  const [category, setCategory] = useState<CategoriesType | undefined>(_props.categories[0])
  const [products, setProducts] = useState<ProductType[]>([])
  useEffect(() => {
    const result = _props.items.filter((i) => category?.id == i.category_id)
    setProducts(result)
  }, [_props.items, category?.id])
  const handleSetCategory = (categoryId: number) => {
    const category = _props.categories.find((c) => categoryId == c.id)
    setCategory(category)
  }
  return (
    <div className="flex size-full justify-center px-2">
      <div className="flex w-full flex-col gap-2 px-2 py-1">
        <div className="flex items-center justify-center rounded-md py-2">
          <div className={'flex w-full items-center justify-between rounded-md bg-gray-800'}>
            <div className={'flex items-center justify-center px-4 py-2'}>
              <h1 className={'text-md'}>{category?.category_name}</h1>
            </div>
            <div className="flex justify-center gap-2 rounded-md px-4 py-2">
              {_props.categories?.map((c) => (
                <div onClick={() => handleSetCategory(c.id)} key={c.id} className="w-full">
                  <button className="text-nowrap rounded-md bg-blue-400 px-2 py-1">
                    {c.category_name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.map((item) => (
            <CardProduct key={item.id} backgroundColor="bg-gray-800" item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
