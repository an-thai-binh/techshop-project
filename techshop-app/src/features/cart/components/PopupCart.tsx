'use client'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import CartListItem from '@/features/cart/components/CartListItem'
import { useUIContext } from '@/shared/context/UIContext'
import { useAppSelector } from '@/shared/redux/hook'
import { selectCartTotalPrice } from '@/features/cart/cartSelectors'
import { formatPrice } from '@/utils/CurrentyFormat'
import Link from 'next/link'

export default function PopupCart() {
  const { state, dispatch } = useUIContext()
  const totalPrice = useAppSelector(selectCartTotalPrice)
  console.log('totalPrice', totalPrice)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transformOrigin: 'right' }}
        className={'h-[93vh] w-full overflow-hidden shadow-md'}
      >
        <div className="flex size-full flex-col justify-center gap-2">
          <div className="relative mt-2 flex items-center justify-center py-2">
            <div className={'absolute left-0 mx-2 flex items-center justify-center'}>
              <ArrowLeftIcon
                onClick={() => dispatch({ type: 'CLOSE_POPUP' })}
                className={'size-5'}
                fill={'white'}
                strokeWidth={3.5}
              />
            </div>
            <div className={'flex items-center justify-center'}>
              <h1 className="animate-bounce text-xl font-bold text-black dark:text-white">
                GIỎ HÀNG
              </h1>
            </div>
          </div>
          <hr className="mx-2" />
          <div className="flex grow items-center justify-center overflow-hidden py-0 pl-1">
            <div className="scrollbar-thunmb-gray-800 size-full overflow-auto scrollbar-thin scrollbar-track-transparent">
              <div className="mx-1 flex flex-col justify-start gap-4">
                {/* ItemCart */}
                <CartListItem />
              </div>
            </div>
          </div>
          <hr className="mx-2" />
          <div className="flex flex-col gap-2 px-2 pb-2">
            <div className="flex justify-between">
              <h1 className="text-md font-bold text-black dark:text-white">TỔNG TIỀN</h1>
              <span className="text-lg font-extrabold text-blue-700">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="justify-center flex w-full items-center">
              <Link href={"/order"} className="w-full">
                <button className="shadown-md w-full scale-100 transform rounded-md bg-blue-700/90 p-1.5 transition-all duration-300 hover:shadow-md active:scale-95">
                  <p className="font-bold text-white uppercase">Đặt hàng</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
