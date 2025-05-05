'use client'
import CardProduct from '../../product/components/CardProduct'
import { ProductType } from '@/features/product/types/ProductType'
import { CategoriesType } from '@/features/categories/types/CategoriesType'
import AnimationMotion from '@/component/AnimationMotion'
type CollectionProductProps = {
  category: CategoriesType | undefined
  items: ProductType[]
}
export default function CollectionListGrid(_props: CollectionProductProps) {
  return (
    <div className="flex size-full justify-center px-2">
      <div className="flex w-full flex-col gap-2 px-2 py-1">
        <div className="flex w-full items-center justify-center rounded-md p-2">
          <div className="flex w-full justify-between gap-2 rounded-md bg-gray-800 px-4 py-2">
            <div className={'flex items-center gap-4'}>
              <div className={'flex items-center justify-center'}>
                <h1 className={'text-lg font-bold'}>{_props.category?.category_name}</h1>
              </div>
              <div className={'flex items-center justify-center'}>
                <h1 className={'text-md'}>
                  <span className={'text-md font-bold'}>{_props.items.length}</span> sản phẩm
                </h1>
              </div>
            </div>
            <div className={'flex items-center justify-center gap-2'}>
              <label htmlFor={'sort-product'}>Sắp xếp</label>
              <select
                name="options"
                id="sort-product"
                className={'rounded-md bg-gray-700 px-2 py-1'}
              >
                <option value={'option-1'}>Tùy chọn 1</option>
                <option value={'option-2'}>Tùy chọn 2</option>
                <option value={'option-3'}>Tùy chọn 3</option>
                <option value={'option-4'}>Tùy chọn 4</option>
              </select>
            </div>
          </div>
        </div>
        <div className={'container'}>
          <AnimationMotion
            className={'grid grid-cols-2 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}
          >
            {_props.items.map((product) => (
              <CardProduct key={product.id} item={product} backgroundColor={'bg-gray-800'} />
            ))}
          </AnimationMotion>
        </div>
      </div>
    </div>
  )
}
