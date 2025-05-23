import { RootState } from '@/shared/redux/store'

export const selectToken = (state: RootState) => state.auth.token
