import ApplyTheme from '@/component/ApplyTheme'
import Overlay from '@/component/layout/Overlay'
import Header from '@/component/layout/Header'
import Footer from '@/component/layout/Footer'
import Navigation from '@/component/layout/Navigation'
import { UIProvider } from '@/shared/context/UIContext'
import React from 'react'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <ApplyTheme />
      <div className="relative z-10 flex h-full w-full flex-col overflow-auto bg-white scrollbar-thin scrollbar-track-gray-950 scrollbar-thumb-gray-800 scrollbar-corner-inherit dark:bg-gray-950">
        <Overlay />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
      <div className={'absolute bottom-0 z-20 w-full'}>
        <Navigation />
      </div>
    </UIProvider>
  )
}
