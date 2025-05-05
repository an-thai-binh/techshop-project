import { AnimatePresence, motion } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function DropdownSearch() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        className={'absolute left-0 top-12 z-40 w-full rounded-b-md bg-gray-800 shadow'}
      >
        <div className={'flex flex-col items-start p-4'}>
          <div className={'flex items-center justify-center py-2'}>
            <h1 className={'text-md font-bold'}>Xu hướng tìm kiếm</h1>
          </div>
          <div className={'flex flex-wrap items-center justify-start gap-2'}>
            <div className={'flex items-center gap-1 rounded-md border px-2 py-1'}>
              <div className={'flex items-center'}>
                <MagnifyingGlassIcon className={'size-5'} fill={'transparent'} />
              </div>
              <div className={'flex items-center'}>
                <h1 className={'text-xs font-medium'}>16 pro max</h1>
              </div>
            </div>
            <div className={'flex items-center gap-1 rounded-md border px-2 py-1'}>
              <div className={'flex items-center'}>
                <MagnifyingGlassIcon className={'size-5'} fill={'transparent'} />
              </div>
              <div className={'flex items-center'}>
                <h1 className={'text-xs font-medium'}>16 pro max</h1>
              </div>
            </div>
            <div className={'flex items-center gap-1 rounded-md border px-2 py-1'}>
              <div className={'flex items-center'}>
                <MagnifyingGlassIcon className={'size-5'} fill={'transparent'} />
              </div>
              <div className={'flex items-center'}>
                <h1 className={'text-xs font-medium'}>16 pro max</h1>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
