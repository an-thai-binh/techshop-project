'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/shared/redux/store'

interface ProviderProps {
  children: React.ReactNode
}
export default function ProviderRedux({ children }: ProviderProps) {
  console.log('Redux Render')
  return <Provider store={store}>{children}</Provider>
}
