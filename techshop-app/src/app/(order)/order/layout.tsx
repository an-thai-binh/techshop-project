import ApplyTheme from '@/component/ApplyTheme'
import Overlay from '@/component/layout/Overlay'
import Footer from '@/component/layout/Footer'
import { UIProvider } from '@/shared/context/UIContext'
import React from 'react'
import AppInitializer from '@/component/AppInitializer'
import { Toaster } from 'react-hot-toast'

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <UIProvider>
        <AppInitializer />
        <ApplyTheme />
        <div className="relative z-10 flex h-full w-full flex-col overflow-auto bg-gray-100 scrollbar-thin scrollbar-track-gray-950 scrollbar-thumb-gray-800 scrollbar-corner-inherit dark:bg-gray-950">
          <Overlay />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </UIProvider>
    </>
  )
}
