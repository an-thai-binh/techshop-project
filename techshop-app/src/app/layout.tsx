import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/shared/component/Header'
import Footer from '@/shared/component/Footer'
import { UIProvider } from '@/shared/context/UIContext'
import React from 'react'
import Overlay from '@/shared/component/Overlay'
import Navigation from '@/shared/component/Navigation'

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
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col`}>
        <UIProvider>
          <div className="relative z-10 flex w-full flex-col overflow-auto scrollbar-thin scrollbar-track-gray-950 scrollbar-thumb-gray-800 scrollbar-corner-inherit">
            <Overlay />
            <Header />
            <main className="flex-grow bg-gray-950">{children}</main>
            <Footer />
          </div>
          <div className={'absolute bottom-0 z-20 w-full'}>
            <Navigation />
          </div>
        </UIProvider>
      </body>
    </html>
  )
}
