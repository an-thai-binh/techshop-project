'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import ToggleThemeButton from '@/component/button/ToggleThemeButton'
import { BanknotesIcon, UserIcon } from '@heroicons/react/24/outline'

export default function DropdownUser() {
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        className={
          'absolute right-10 top-16 z-40 h-fit w-[25vw] overflow-hidden rounded-md bg-gray-950/90 backdrop-blur-sm'
        }
      >
        <div className="flex size-full flex-col justify-center gap-2">
          <div className="flex items-center justify-center pt-2">
            <h1 className="text-xl font-bold">NGƯỜI DÙNG</h1>
          </div>
          <hr className="mx-2" />
          <div className={'flex items-center bg-transparent px-2 py-1'}>
            <div
              className={
                'flex size-full flex-col justify-center border border-gray-900/50 bg-gray-900/50'
              }
            >
              <div
                className={
                  'flex size-full items-center justify-between rounded-sm px-2 py-2 duration-300 hover:bg-gray-800'
                }
              >
                <div className={'flex items-center'}>
                  <h1 className={'text-md font-semibold'}>Cài đặt</h1>
                </div>
                <ToggleThemeButton />
              </div>
              <div
                className={
                  'group relative flex size-full scale-100 transform items-center justify-between rounded-sm px-2 py-2 transition-all duration-300 hover:bg-gray-800 active:scale-95'
                }
              >
                <div
                  className={
                    'flex size-full items-center transition-all duration-300 ease-in-out group-hover:opacity-0'
                  }
                >
                  <h1 className={'text-md font-semibold'}>Thông tin cá nhân</h1>
                </div>
                <div
                  className={
                    'flex size-full scale-100 transform items-center justify-end duration-300 group-hover:absolute group-hover:-translate-x-1/2 group-hover:animate-pulse group-active:absolute group-active:-translate-x-1/2'
                  }
                >
                  <UserIcon className={'size-5'} fill={'transparent'} strokeWidth={3} />
                </div>
              </div>
              <div
                className={
                  'group relative flex size-full scale-100 transform items-center justify-between rounded-sm px-2 py-2 transition-all duration-300 hover:bg-gray-800 active:scale-95'
                }
              >
                <div
                  className={
                    'flex size-full items-center transition-all duration-300 ease-in-out group-hover:opacity-0'
                  }
                >
                  <h1 className={'text-md font-semibold'}>Lịch sử thanh toán</h1>
                </div>
                <div
                  className={
                    'flex size-full scale-100 transform items-center justify-end duration-300 group-hover:absolute group-hover:-translate-x-1/2 group-hover:animate-pulse group-active:absolute group-active:-translate-x-1/2'
                  }
                >
                  <BanknotesIcon className={'size-5'} fill={'transparent'} strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 px-2 pb-2">
            <div className="jsutify-center flex w-full items-center">
              <button className="shadown-md group w-full scale-100 transform rounded-md bg-blue-700 p-1.5 transition-all duration-300 hover:bg-blue-700/80 active:scale-95">
                <div
                  className={
                    'flex size-full items-center justify-center duration-300 group-hover:text-white/80'
                  }
                >
                  <h1 className={'text-md font-bold'}>ĐĂNG XUẤT</h1>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
