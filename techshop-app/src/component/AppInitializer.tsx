'use client'
import { useAppDispatch, useAppSelector } from '@/shared/redux/hook'
import { useEffect } from 'react'
import { fetchTokenFromCookie } from '@/features/auth/authThunks'
import { fetchCartFromApi } from '@/features/cart/cartThunks'
import { selectIsAuthenticated } from '@/features/auth/authSelectors'
import { fetchUserIdFromApi } from '@/features/user/userThunks'
import { setRefreshToken, setToken } from '@/features/auth/authSlice'
import axios from 'axios'

export default function AppInitializer() {
  const dispatch = useAppDispatch()
  const refreshToken = useAppSelector((r) => r.auth.refreshToken)
  const token = useAppSelector((r) => r.auth.token)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  useEffect(() => {
    const tryRefresh = async () => {
      try {
        if (refreshToken && !token) {
          const res = await axios.post('http://localhost:8080/techshop/auth/refresh', {
            token: refreshToken,
          })
          const newRefreshToken = res.data.data.refreshToken
          const newToken = res.data.data.token
          document.cookie = `refreshToken=${newRefreshToken}; path=/; max-age=3600`
          document.cookie = `token=${newToken}; path=/; max-age=${24 * 3600}`
          dispatch(setToken(newToken))
          dispatch(setRefreshToken(newRefreshToken))
        }
      } catch (err) {
        console.log('Không thể refresh token:', err)
        // dispatch(setToken())
      }
    }

    tryRefresh()
  }, [dispatch, refreshToken, token])
  useEffect(() => {
    dispatch(fetchTokenFromCookie())
    if (isAuthenticated) {
      dispatch(fetchCartFromApi())
      dispatch(fetchUserIdFromApi())
    }
  }, [dispatch, isAuthenticated])
  return null
}
