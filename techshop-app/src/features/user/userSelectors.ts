import { RootState } from '@/shared/redux/store'

export const selectUserId = (state: RootState) => state.user.userId
