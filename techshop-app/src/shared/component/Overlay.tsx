'use client'
import { useUIContext } from '@/shared/context/UIContext'
import { AnimatePresence, motion } from 'framer-motion'
import PopupCart from '@/shared/component/PopupCart'

export default function Overlay() {
  const { state, dispatch } = useUIContext()
  return (
    <AnimatePresence>
      {state.isOverlayVisible && (
        <motion.div
          className={`fixed inset-0 z-30 ${state.isPopupVisible ? 'z-40' : ''} h-full w-full bg-black/50`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={() => (!state.isPopupVisible ? dispatch({ type: 'CLOSE_ALL' }) : '')}
        >
          {state.isPopupVisible && state.popupType === 'cart' && <PopupCart />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
