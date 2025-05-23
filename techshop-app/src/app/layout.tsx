import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import ProviderRedux from '@/shared/redux/provider'
import AppInitializer from '@/component/AppInitializer'

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
        <body className={`flex max-h-full flex-col`}>
          <AppInitializer />
          {children}
        </body>
      </ProviderRedux>
    </html>
  )
}
