'use client'
import { useAppDispatch } from '@/shared/redux/hook'
import { useEffect } from 'react'
import { fetchTokenFromCookie } from '@/features/auth/authThunks'
import { fetchCartFromApi } from '@/features/cart/cartThunks'

export default function AppInitializer() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTokenFromCookie())
    dispatch(fetchCartFromApi())
  }, [dispatch])
  return null
}
