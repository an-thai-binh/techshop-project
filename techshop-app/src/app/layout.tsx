import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/component/Header'
import Footer from '@/component/Footer'
import { UIProvider } from '@/shared/context/UIContext'
import React from 'react'
import Overlay from '@/component/Overlay'
import Navigation from '@/component/Navigation'
import ProviderRedux from '@/shared/redux/provider'
import ApplyTheme from '@/component/ApplyTheme'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Techshop App',
  description: 'Techshop App with Technologies Production',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ProviderRedux>
        <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col`}>
          <UIProvider>
            <ApplyTheme />
            <div className="relative z-10 flex w-full flex-col overflow-auto scrollbar-thin scrollbar-track-gray-950 scrollbar-thumb-gray-800 scrollbar-corner-inherit">
              <Overlay />
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <div className={'absolute bottom-0 z-20 w-full'}>
              <Navigation />
            </div>
          </UIProvider>
        </body>
      </ProviderRedux>
    </html>
  )
}
