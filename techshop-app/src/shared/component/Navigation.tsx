'use client'
import { BanknotesIcon, HomeIcon, InboxIcon } from '@heroicons/react/24/outline'
import CartIcon from '@/shared/assets/Icon/cart'
import { useUIContext } from '@/shared/context/UIContext'
import PopupCart from '@/shared/component/PopupCart'

export default function Navigation() {
  const { state, dispatch } = useUIContext()
  return (
    <div
      className={
        'sticky inset-0 bottom-0 z-50 w-full bg-gray-950/10 shadow-md shadow-gray-700 backdrop-blur-md sm:hidden'
      }
    >
      <div className={'flex h-fit flex-col justify-center'}>
        <div className={'flex items-center justify-center'}>
          {state.isPopupVisible && state.popupType === 'cart' && <PopupCart />}
        </div>
        <div className={'flex h-[7vh] w-full items-center justify-center'}>
          <div className={'flex size-full items-center justify-center'}>
            <div
              onClick={() => {
                dispatch({ type: 'CLOSE_ALL' })
              }}
              className={'flex size-full items-center justify-center p-2'}
            >
              <HomeIcon className={'size-8'} fill={'transparent'} strokeWidth={2} />
            </div>
            <div
              onClick={() => dispatch({ type: 'OPEN_POPUP', payload: { popupType: 'cart' } })}
              className={'flex size-full items-center justify-center p-2'}
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
    </div>
  )
}
