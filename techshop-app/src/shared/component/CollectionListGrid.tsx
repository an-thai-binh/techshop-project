'use client'
import CardProduct from './CardProduct'
import { CartItemProps } from './CardProduct'
import { Product } from '@/app/collection/[categoryId]/page'
interface CollectionProductProps {
  id?: number
  name?: string
  collectionData: Product[]
}
export default function CollectionListGrid(_props: CollectionProductProps) {
  return (
    <div className="flex size-full justify-center px-2">
      <div className="flex w-full flex-col gap-2 px-2 py-1">
        <div className="flex w-full items-center justify-center rounded-md p-2">
          <div className="flex w-full justify-between gap-2 rounded-md bg-gray-800 px-4 py-2">
            <div className={'flex items-center gap-4'}>
              <div className={'flex items-center justify-center'}>
                <h1 className={'text-lg font-bold'}>{_props.name}</h1>
              </div>
              <div className={'flex items-center justify-center'}>
                <h1 className={'text-md'}>
                  <span className={'text-md font-bold'}>{_props.collectionData.length}</span> sản
                  phẩm
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
        <div className="grid h-full grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {_props.collectionData.map((product, index) => (
            <CardProduct key={index} productProps={product} backgroundColor={'bg-gray-800'} />
          ))}
        </div>
      </div>
    </div>
  )
}
