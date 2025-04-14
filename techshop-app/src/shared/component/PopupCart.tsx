'use client'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'

export default function PopupCart() {
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
          <div className="flex items-center justify-center pt-2">
            <h1 className="text-xl font-bold">GIỎ HÀNG</h1>
          </div>
          <hr className="mx-2" />
          <div className="flex grow items-center justify-center overflow-hidden py-0 pl-1">
            <div className="scrollbar-thunmb-gray-800 size-full overflow-auto scrollbar-thin scrollbar-track-transparent">
              <div className="mx-1 flex flex-col justify-start gap-4">
                {/* ItemCart */}
                <div className="flex w-full gap-2">
                  <div className="size-20 rounded-sm bg-gray-500">ảnh</div>
                  <div className="flex grow flex-col gap-2">
                    <div className="flex grow items-start justify-between">
                      <div className="flex items-center">
                        <h1 className="text-md font-bold">Macbook Pro M1</h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <XMarkIcon className={'size-5'} />
                      </div>
                    </div>
                    <div className="flex h-fit items-center justify-between rounded-sm">
                      <div className="flex items-center justify-center gap-0 border border-gray-500">
                        <div className="flex items-center justify-center">
                          <button className="box-content bg-gray-500 px-2">-</button>
                        </div>
                        <div className="flex items-center justify-center px-2">
                          <span className="text-md font-bold">1</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <button className="box-content bg-gray-500 px-2">+</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-md font-bold">199.0$</span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex w-full gap-2">
                  <div className="size-20 rounded-sm bg-gray-500">ảnh</div>
                  <div className="flex grow flex-col gap-2">
                    <div className="flex grow items-start justify-between">
                      <div className="flex items-center">
                        <h1 className="text-md font-bold">Macbook Pro M1</h1>
                      </div>
                      <div className="flex items-center">
                        <span className="text-md font-bold">X</span>
                      </div>
                    </div>
                    <div className="flex h-fit items-center justify-between rounded-sm">
                      <div className="flex items-center justify-center gap-0 border border-gray-500">
                        <div className="flex items-center justify-center">
                          <button className="box-content bg-gray-500 px-2">-</button>
                        </div>
                        <div className="flex items-center justify-center px-2">
                          <span className="text-md font-bold">1</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <button className="box-content bg-gray-500 px-2">+</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-md font-bold">199.0$</span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex w-full gap-2">
                  <div className="size-20 rounded-sm bg-gray-500">ảnh</div>
                  <div className="flex grow flex-col gap-2">
                    <div className="flex grow items-start justify-between">
                      <div className="flex items-center">
                        <h1 className="text-md font-bold">Macbook Pro M1</h1>
                      </div>
                      <div className="flex items-center">
                        <span className="text-md font-bold">X</span>
                      </div>
                    </div>
                    <div className="flex h-fit items-center justify-between rounded-sm">
                      <div className="flex items-center justify-center gap-0 border border-gray-500">
                        <div className="flex items-center justify-center">
                          <button className="box-content bg-gray-500 px-2">-</button>
                        </div>
                        <div className="flex items-center justify-center px-2">
                          <span className="text-md font-bold">1</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <button className="box-content bg-gray-500 px-2">+</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-md font-bold">199.0$</span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex w-full gap-2">
                  <div className="size-20 rounded-sm bg-gray-500">ảnh</div>
                  <div className="flex grow flex-col gap-2">
                    <div className="flex grow items-start justify-between">
                      <div className="flex items-center">
                        <h1 className="text-md font-bold">Macbook Pro M1</h1>
                      </div>
                      <div className="flex items-center">
                        <span className="text-md font-bold">X</span>
                      </div>
                    </div>
                    <div className="flex h-fit items-center justify-between rounded-sm">
                      <div className="flex items-center justify-center gap-0 border border-gray-500">
                        <div className="flex items-center justify-center">
                          <button className="box-content bg-gray-500 px-2">-</button>
                        </div>
                        <div className="flex items-center justify-center px-2">
                          <span className="text-md font-bold">1</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <button className="box-content bg-gray-500 px-2">+</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-md font-bold">199.0$</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </AnimatePresence>
  )
}
