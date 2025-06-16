'use client'
import { AnimatePresence, motion } from 'framer-motion'
import CartListItem from '@/features/cart/components/CartListItem'
import { createPortal } from 'react-dom'
import { selectCartTotalPrice } from '@/features/cart/cartSelectors'
import { useAppSelector } from '@/shared/redux/hook'
import { formatPrice } from '@/utils/CurrentyFormat'
import Link from 'next/link'

export default function DropdownCart() {
  const totalPrice = useAppSelector(selectCartTotalPrice)
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        className={
          'absolute right-10 top-16 z-40 hidden h-[50vh] w-[50vw] overflow-hidden rounded-md bg-white/90 backdrop-blur-sm dark:bg-gray-950/90 md:block'
        }
      >
        <div className="flex size-full flex-col justify-center gap-2">
          <div className="flex items-center justify-center pt-2">
            <h1 className="text-xl font-bold text-black dark:text-white">GIỎ HÀNG</h1>
          </div>
          <hr className="mx-2" />
          <CartListItem />
          <hr className="mx-2" />
          <div className="flex flex-col gap-2 px-2 pb-2">
            <div className="flex justify-between">
              <h1 className="text-md font-bold text-black dark:text-white">TỔNG TIỀN</h1>
              <span className="text-md font-bold text-blue-500">{formatPrice(totalPrice)}</span>
            </div>
            <div className="jsutify-center flex w-full items-center">
              <button className="shadown-md w-full scale-100 transform rounded-md bg-blue-500 p-1.5 transition-all duration-300 hover:bg-blue-500/80 active:scale-95">
                <Link href={"/order"}>
                  <h1 className={'font-semibold text-white uppercase'}>Đặt hàng</h1>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
