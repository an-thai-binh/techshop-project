import { Bars3Icon } from '@heroicons/react/24/outline'
import ProductCatalog from '@/component/ProductCatalog'
import React from 'react'
import { useUIContext } from '@/shared/context/UIContext'

export default function ProductCatalogButton() {
  const { state, dispatch } = useUIContext()
  return (
    <div className="relative flex w-[20vw] items-center gap-2">
      <button
        onMouseDown={() => dispatch({ type: 'TOGGLE_CATALOG' })}
        className="size-6 rounded-full"
      >
        <Bars3Icon className="size-6" fill="transparent" strokeWidth={2.0} />
      </button>
      {state.isCatalogVisible && <ProductCatalog className="-left-2 top-10" />}
      <h1 className="text-sm font-bold">
        <span className={'hidden lg:block'}>DANH MỤC SẢN PHẨM</span>
        <span className={'hidden sm:block lg:hidden'}>DANH MỤC</span>
      </h1>
    </div>
  )
}
