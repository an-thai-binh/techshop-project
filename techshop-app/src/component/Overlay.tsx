'use client'
import { useUIContext } from '@/shared/context/UIContext'
import { AnimatePresence, motion } from 'framer-motion'

export default function Overlay() {
  const { state, dispatch } = useUIContext()
  return (
    <AnimatePresence>
      {state.isOverlayVisible && (
        <motion.div
          className={`fixed inset-0 z-30 ${state.isPopupVisible ? 'z-40' : ''} size-full bg-black/50`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={() => dispatch({ type: 'CLOSE_ALL' })}
        ></motion.div>
      )}
    </AnimatePresence>
  )
}
