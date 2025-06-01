import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import ProviderRedux from '@/shared/redux/provider'
import { Toaster } from 'sonner'

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
        <ProviderRedux>
          {children}
          <Toaster
            position="bottom-right"
            duration={4000}
            toastOptions={{
              className: 'bg-blue-50 border border-blue-200 shadow-md',
              style: {
                borderRadius: 12,
                fontWeight: 500,
                color: 'blue',
              },
            }}
          />
        </ProviderRedux>
      </body>
    </html>
  )
}
