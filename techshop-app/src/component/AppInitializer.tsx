'use client'
import { useAppDispatch, useAppSelector } from '@/shared/redux/hook'
import { useEffect } from 'react'
import { fetchTokenFromCookie } from '@/features/auth/authThunks'
import { fetchCartFromApi } from '@/features/cart/cartThunks'
import { selectIsAuthenticated } from '@/features/auth/authSelectors'

export default function AppInitializer() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  useEffect(() => {
    dispatch(fetchTokenFromCookie())
    if (isAuthenticated) {
      dispatch(fetchCartFromApi())
    }
  }, [dispatch, isAuthenticated])
  return null
}
