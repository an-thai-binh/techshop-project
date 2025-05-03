import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/shared/redux/types'

export const useDispatchApp = () => useDispatch<AppDispatch>()
export const useSelectorApp: TypedUseSelectorHook<RootState> = () => useSelector
