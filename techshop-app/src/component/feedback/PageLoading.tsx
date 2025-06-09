'use client'

import { motion } from 'framer-motion'

const text = 'Techshop'.split('')

export default function TechshopLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-white text-blue-500 dark:bg-black dark:text-white">
      <div className="flex gap-1 text-4xl font-extrabold tracking-widest">
        {text.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0.1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'loop',
              repeatDelay: 1,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
