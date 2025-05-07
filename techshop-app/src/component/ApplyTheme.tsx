'use client'
import { useUIContext } from '@/shared/context/UIContext'
import { useEffect } from 'react'

export default function ApplyTheme() {
  const { state } = useUIContext()
  useEffect(() => {
    const htmlElement = window.document.documentElement
    if (state.theme === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }, [state.theme])
  return null
}
