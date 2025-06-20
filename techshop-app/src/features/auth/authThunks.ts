import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearToken, setToken } from '@/features/auth/authSlice'
import { RootState } from '@/shared/redux/store'
import { toast } from 'sonner'

export const fetchTokenFromCookie = createAsyncThunk<string | undefined>(
  'auth/fetchTokenFromCookie',
  async (_, { dispatch }) => {
    if (typeof document === 'undefined') throw new Error('Not in browser')
    const refreshToken = document.cookie
      .split(';')
      .map((r) => r.trim())
      .find((r) => r.startsWith('refreshToken'))
      ?.trim()
      .split('=')[1]
    const token = document.cookie
      .split(';')
      .map((r) => r.trim())
      .find((r) => r.startsWith('token'))
      ?.trim()
      .split('=')[1]
    if (!token) {
      dispatch(
        setToken({
          token: token,
          isAuthenticated: false,
          refreshToken: refreshToken,
        }),
      )
      throw new Error('Token is undefined')
    } else {
      dispatch(
        setToken({
          token: token,
          isAuthenticated: true,
          refreshToken: refreshToken,
        }),
      )
    }

    return token
  },
)

export const removeTokenFromCookie = createAsyncThunk<void, void, { state: RootState }>(
  'auth/removeTokenCookie',
  async (_, { dispatch, getState }) => {
    const state = getState()
    await fetch('http://localhost:8080/techshop/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: state.auth.token }),
    })
    document.cookie = 'token=; Max-Age=0; Path=/; SameSite=Lax'
    document.cookie = 'refreshToken=; Max-Age=0; Path=/; SameSite=Lax'
    dispatch(clearToken())
    toast.info('Đăng xuất thành công')
    window.location.href = '/auth/login'
  },
)
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:8080/techshop/auth/refresh')
      return res.json()
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)
