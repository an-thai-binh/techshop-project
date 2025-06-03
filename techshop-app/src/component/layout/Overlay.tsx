'use client'
import { useUIContext } from '@/shared/context/UIContext'
import { AnimatePresence, motion } from 'framer-motion'
import ModalFrame from '@/component/common/ModalFrame'
import { removeTokenFromCookie } from '@/features/auth/authThunks'
import React from 'react'
import { useAppDispatch } from '@/shared/redux/hook'

export default function Overlay() {
  const { state, dispatch } = useUIContext()
  // const appDispatch = useAppDispatch()
  return (
    <AnimatePresence>
      {state.isOverlayVisible && (
        <motion.div
          className={`fixed inset-0 z-30 ${state.isPopupVisible ? 'z-40' : ''} size-full`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          // onClick={() => dispatch({ type: 'CLOSE_ALL' })}
        >
          <div
            onClick={() => dispatch({ type: 'CLOSE_ALL' })}
            className={'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity'}
          >
            {/*{state.isModalVisible && state.modalType === 'logout' && (*/}
            {/*  <ModalFrame*/}
            {/*    open={true}*/}
            {/*    onClose={() => dispatch({ type: 'CLOSE_ALL' })}*/}
            {/*    onConfirm={() => appDispatch(removeTokenFromCookie())}*/}
            {/*    title={'Đăng xuất'}*/}
            {/*    description={'Bạn có chắc chắn muốn đăng xuất?'}*/}
            {/*  />*/}
            {/*)}*/}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
