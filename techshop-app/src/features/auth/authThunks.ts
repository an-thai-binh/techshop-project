import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearToken, setToken } from '@/features/auth/authSlice'

export const fetchTokenFromCookie = createAsyncThunk<string>(
  'auth/fetchTokenFromCookie',
  async (_, { dispatch }) => {
    if (typeof document === 'undefined') throw new Error('Not in browser')
    const token = document.cookie
      .split(';')
      .map((r) => r.trim())
      .find((r) => r.startsWith('token'))
      ?.trim()
      .split('=')[1]
    if (!token) throw new Error('Token not found in cookie')
    dispatch(setToken({ token: token, isAuthenticated: true }))
    return token
  },
)

export const removeTokenFromCookie = createAsyncThunk(
  'auth/removeTokenCookie',
  async (_, { dispatch }) => {
    document.cookie = 'token=; Max-Age=0; Path=/; SameSite=Lax'
    dispatch(clearToken())
  },
)
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:8080/techshop/refresh')
      return res.json()
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)
