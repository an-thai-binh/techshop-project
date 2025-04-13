'use client'
import { BanknotesIcon, HomeIcon, InboxIcon } from '@heroicons/react/24/outline'
import CartIcon from '@/shared/assets/Icon/cart'
import { useUIContext } from '@/shared/context/UIContext'

export default function Navigation() {
  const { dispatch } = useUIContext()
  return (
    <div className={'sticky bottom-0 z-50 w-full border-x-4 border-gray-800 bg-gray-950 sm:hidden'}>
      <div className={'flex size-full items-center justify-center'}>
        <div className={'flex w-full items-center justify-center'}>
          <div
            onClick={() => {
              dispatch({ type: 'CLOSE_ALL' })
            }}
            className={'flex w-full items-center justify-center p-2'}
          >
            <HomeIcon className={'size-8'} fill={'transparent'} strokeWidth={2.5} />
          </div>
          <div
            onClick={() => dispatch({ type: 'OPEN_POPUP', payload: { popupType: 'cart' } })}
            className={'flex w-full items-center justify-center p-2'}
          >
            <CartIcon className={'size-8'} fill={'transparent'} strokeWidth={2} />
          </div>
          <div className={'flex w-full items-center justify-center p-2'}>
            <InboxIcon className={'size-8'} fill={'transparent'} strokeWidth={2} />
          </div>
          <div className={'flex w-full items-center justify-center p-2'}>
            <BanknotesIcon className={'size-8'} fill={'transparent'} strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  )
}
