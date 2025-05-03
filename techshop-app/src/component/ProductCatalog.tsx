'use client'
import { useEffect, useRef } from 'react'
import { useUIContext } from '@/shared/context/UIContext'
import { CategoriesType } from '@/features/categories/types/CategoriesType'

type ProductCatalogProps = {
  className?: string
  items: CategoriesType[]
}

export default function ProductCatalog(_props: ProductCatalogProps) {
  const { state, dispatch } = useUIContext()
  const catalogRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (e: MouseEvent) => {
    if (
      state.isCatalogVisible &&
      catalogRef.current &&
      !catalogRef.current.contains(e.target as Node)
    ) {
      dispatch({ type: 'CLOSE_ALL' })
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div
      ref={catalogRef}
      className={`absolute ${_props.className} z-20 hidden h-[42vh] w-full flex-col items-start gap-2 border-r-2 border-gray-800 bg-gray-800 px-2 py-1 shadow-md sm:hidden md:hidden lg:hidden xl:flex`}
    >
      <div className="flex w-full flex-col items-start justify-start gap-1">
        <ul className="flex size-full flex-col gap-0 rounded-xl p-2">
          {_props.items.map((category) => (
            <li
              key={category.id}
              className="rounded-sm p-2 text-sm hover:border-l-2 hover:bg-gray-700"
            >
              {category.category_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
