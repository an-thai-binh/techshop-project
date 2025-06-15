import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUserIdFromApi } from '@/features/user/userThunks'

interface UserState {
  userId: number | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  userId: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.userId = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserIdFromApi.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserIdFromApi.fulfilled, (state, action: PayloadAction<number>) => {
        state.userId = action.payload
        state.loading = false
      })
      .addCase(fetchUserIdFromApi.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearUser } = userSlice.actions
export default userSlice.reducer
