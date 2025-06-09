import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import DropdownCart from '@/features/cart/components/DropdownCart'
import React from 'react'
import { useUIContext } from '@/shared/context/UIContext'
import { useAppSelector } from '@/shared/redux/hook'
import { selectCartTotalItems } from '@/features/cart/cartSelectors'

export default function CartButton() {
  const { state, dispatch } = useUIContext()
  const totalItem = useAppSelector(selectCartTotalItems)
  return (
    <div className={'hidden items-center sm:flex'}>
      <div className="relative flex flex-col items-center justify-center gap-2">
        <button
          className="relative rounded-full p-2 hover:bg-gray-500/50"
          onClick={() => {
            if (state.isDropdownVisible && state.dropdownType === 'cart') {
              dispatch({ type: 'TOGGLE_DROPDOWN', payload: { dropdownType: 'cart' } })
            } else {
              dispatch({ type: 'OPEN_DROPDOWN', payload: { dropdownType: 'cart' } })
            }
          }}
        >
          <ShoppingCartIcon
            className="size-7 text-gray-950/50 dark:text-white"
            fill="transparent"
            strokeWidth={2.0}
          />
          <span className="absolute right-0 top-1 size-4 rounded-full bg-blue-500 text-xs">
            {totalItem}
          </span>
        </button>
        {state.isDropdownVisible && state.dropdownType === 'cart' && <DropdownCart />}
      </div>
    </div>
  )
}
