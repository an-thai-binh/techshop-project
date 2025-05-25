import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import ProviderRedux from '@/shared/redux/provider'

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
      <body className={`flex max-h-full flex-col`}>
        <ProviderRedux>{children}</ProviderRedux>
      </body>
    </html>
  )
}
