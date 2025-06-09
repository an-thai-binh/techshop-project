'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import DropdownSearch from '@/features/search/components/DropdownSearch'
import React, { useState } from 'react'
import { useUIContext } from '@/shared/context/UIContext'

export default function InputSearchField() {
  const { state, dispatch } = useUIContext()
  const [inputSearch, setInputSearch] = useState('')
  return (
    <div
      className={`relative order-3 flex w-full items-center justify-between gap-2 rounded-md ${state.dropdownType === 'search' ? 'rounded-b-none' : ''} bg-gray-100 transition-all duration-300 dark:bg-gray-800 sm:order-2 sm:w-1/2 md:order-2 md:w-1/2 lg:order-2 lg:w-1/2`}
    >
      <div
        onClick={() => dispatch({ type: 'TOGGLE_DROPDOWN', payload: { dropdownType: 'search' } })}
        className={'flex h-full w-full items-center p-1'}
      >
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="peer w-full rounded-none bg-transparent px-2 py-1 font-semibold text-gray-950/50 outline-none placeholder:text-sm placeholder:font-semibold dark:text-white"
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <div className="flex items-center rounded-md peer-focus:animate-pulse hover:bg-gray-500/50">
          <button className="p-2">
            <MagnifyingGlassIcon
              className="size-6 text-gray-950/50 dark:text-white"
              fill="transparent"
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>
      {state.isDropdownVisible && state.dropdownType === 'search' && (
        <DropdownSearch inputSearch={inputSearch} />
      )}
    </div>
  )
}
