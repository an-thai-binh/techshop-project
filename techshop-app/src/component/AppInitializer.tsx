'use client'
import { useAppDispatch } from '@/shared/redux/hook'
import { useEffect } from 'react'
import { fetchTokenFromCookie } from '@/features/auth/authThunks'

export default function AppInitializer() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTokenFromCookie())
  }, [dispatch])
  return null
}
