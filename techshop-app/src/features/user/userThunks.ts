import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserId } from '@/app/(auth)/auth/action'

export const fetchUserIdFromApi = createAsyncThunk<number>(
  'user/fetchUserId',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserId()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return rejectWithValue('Unable to fetch user ID')
    }
  },
)
