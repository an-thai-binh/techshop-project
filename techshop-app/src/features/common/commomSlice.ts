import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type GlobalUIState = {
  loadingMap: Record<string, boolean>
  errorMap: Record<string, string | null>
}

const initialState: GlobalUIState = {
  loadingMap: {},
  errorMap: {},
}

const uiSlice = createSlice({
  name: 'commom',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ key: string; value: boolean }>) => {
      state.loadingMap[action.payload.key] = action.payload.value
    },
    setError: (state, action: PayloadAction<{ key: string; value: string | null }>) => {
      state.errorMap[action.payload.key] = action.payload.value
    },
    clearUIState: (state, action: PayloadAction<{ key: string }>) => {
      delete state.loadingMap[action.payload.key]
      delete state.errorMap[action.payload.key]
    },
  },
})

export const { setLoading, setError, clearUIState } = uiSlice.actions
export default uiSlice.reducer
