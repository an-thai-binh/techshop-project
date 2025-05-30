'use client'
import Link from 'next/link'
import AppInitializer from '@/component/AppInitializer'
import React from 'react'

interface AdminSidebarItemProps {
  icon: React.ReactNode
  label: string
  page: string
}

export default function AdminSidebarItem({ icon, label, page }: AdminSidebarItemProps) {
  return (
    <Link href={page}>
      <AppInitializer />
      <div className="flex w-full flex-row items-center lg:mb-2 lg:hover:rounded-md lg:hover:bg-gray-700 lg:hover:font-bold">
        <div className="flex min-h-[50] min-w-[50] flex-shrink-0 items-center justify-center">
          <div className="size-8 text-white hover:size-9 lg:hover:size-8">{icon}</div>
        </div>
        <div className="flex-1 pl-3">
          <p className="hidden text-white lg:block">{label}</p>
        </div>
      </div>
    </Link>
  )
}
