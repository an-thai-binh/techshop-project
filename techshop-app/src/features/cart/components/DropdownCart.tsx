'use client'
import { AnimatePresence, motion } from 'framer-motion'
import CartListItem from '@/features/cart/components/CartListItem'
import { createPortal } from 'react-dom'

export default function DropdownCart() {
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        className={
          'absolute right-10 top-16 z-40 h-[50vh] w-[50vw] overflow-hidden rounded-md bg-gray-950/90 backdrop-blur-sm'
        }
      >
        <div className="flex size-full flex-col justify-center gap-2">
          <div className="flex items-center justify-center pt-2">
            <h1 className="text-xl font-bold">GIỎ HÀNG</h1>
          </div>
          <hr className="mx-2" />
          <CartListItem />
          <hr className="mx-2" />
          <div className="flex flex-col gap-2 px-2 pb-2">
            <div className="flex justify-between">
              <h1 className="text-md font-bold">TỔNG TIỀN</h1>
              <span className="text-md font-bold text-red-700">0</span>
            </div>
            <div className="jsutify-center flex w-full items-center">
              <button className="shadown-md w-full scale-100 transform rounded-md bg-red-700 p-1.5 transition-all duration-300 hover:bg-red-600 active:scale-95">
                XEM GIỎ HÀNG
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
