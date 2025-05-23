import { AuthType } from '@/features/auth/types/AuthType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTokenFromCookie } from '@/features/auth/authThunks'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
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
      state.token = ''
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTokenFromCookie.fulfilled, (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
    })
  },
})

export const { setToken, clearToken } = authSlice.actions
export default authSlice.reducer
