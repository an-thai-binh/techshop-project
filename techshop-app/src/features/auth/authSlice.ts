import { AuthType } from '@/features/auth/types/AuthType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTokenFromCookie } from '@/features/auth/authThunks'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  loading: boolean
  error: null
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<AuthType>) {
      state.token = action.payload.token
      state.isAuthenticated = action.payload.isAuthenticated
    },
    clearToken(state) {
      state.token = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTokenFromCookie.pending, (state, action) => {
      state.error = null
      state.loading = true
    })
    builder.addCase(fetchTokenFromCookie.fulfilled, (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
      state.loading = false
    })
  },
})

export const { setToken, clearToken } = authSlice.actions
export default authSlice.reducer
