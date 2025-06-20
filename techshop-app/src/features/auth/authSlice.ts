import { AuthType } from '@/features/auth/types/AuthType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTokenFromCookie } from '@/features/auth/authThunks'

interface AuthState {
  isAuthenticated: boolean
  token: string | undefined
  refreshToken: string | undefined
  loading: boolean
  error: null
}

const initialState: AuthState = {
  isAuthenticated: false,
  refreshToken: undefined,
  token: undefined,
  loading: true,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<AuthType>) {
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = action.payload.isAuthenticated
    },
    setRefreshToken(state, action: PayloadAction<AuthType>) {
      state.refreshToken = action.payload.refreshToken
      state.token = action.payload.token
      // state.isAuthenticated = action.payload.isAuthenticated
    },
    clearToken(state) {
      state.token = undefined
      state.refreshToken = undefined
      state.isAuthenticated = false
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTokenFromCookie.pending, (state) => {
      state.error = null
      state.loading = true
    })
    builder.addCase(fetchTokenFromCookie.fulfilled, (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
      state.loading = false
    })
    builder.addCase(fetchTokenFromCookie.rejected, (state) => {
      state.token = undefined
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    })
  },
})

export const { setToken, setRefreshToken, clearToken } = authSlice.actions
export default authSlice.reducer
