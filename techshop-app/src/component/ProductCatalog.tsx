'use client'
import { useEffect, useRef } from 'react'
import { useUIContext } from '@/shared/context/UIContext'
import { CategoryType } from '@/features/categories/types/CategoriesType'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

type ProductCatalogProps = {
  className?: string
  items: CategoryType[]
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
      className={`absolute ${_props.className} z-20 hidden h-[42vh] w-full flex-col items-start gap-2 border-r-2 border-none border-gray-300/10 bg-white/90 px-2 py-1 text-black shadow-md backdrop-blur-md dark:border-gray-900/10 dark:bg-gray-800/90 dark:text-white sm:hidden md:hidden lg:hidden xl:flex`}
    >
      <div className="flex w-full flex-col items-start justify-start gap-1">
        <ul className="flex size-full flex-col gap-0 rounded-xl p-2">
          {_props.items?.map((category) => (
            <li
              key={category.id}
              className="group scale-100 transform cursor-pointer rounded-sm border-gray-500/10 p-2 transition-all ease-in-out hover:border-l-4 hover:bg-gray-500/10 active:scale-95"
            >
              <div className={'flex items-center justify-between'}>
                <div className={'flex items-center'}>
                  <h2 className={'text-md font-semibold'}>{category.categoryName}</h2>
                </div>
                <div className={'flex items-center'}>
                  <ChevronRightIcon
                    className={
                      'size-4 rotate-90 transform transition-all duration-500 ease-in-out group-hover:rotate-0 group-hover:animate-pulse'
                    }
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
