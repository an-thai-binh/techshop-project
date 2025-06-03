'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type AnimationMotionProps = {
  children?: React.ReactNode
  className?: string
}
export default function AnimationMotion({ children, className }: AnimationMotionProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0, y: -20 }}
        animate={{ height: 'auto', opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
