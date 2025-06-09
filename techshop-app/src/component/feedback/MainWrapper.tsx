'use client'

import { useEffect, useState } from 'react'
import PageLoading from './PageLoading'

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 300) // delay nhẹ cho UX mượt
    return () => clearTimeout(timeout)
  }, [])

  if (!ready) return <PageLoading />

  return <>{children}</>
}
