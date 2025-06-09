'use client'
import React from 'react'
import { useAppSelector } from '@/shared/redux/hook'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const cart = useAppSelector((r) => r.cart.items)
  console.log(cart)
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 via-blue-200 to-gray-200">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/30 via-white/5 to-transparent opacity-70 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  )
}
