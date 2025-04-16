import cartReducer from './cart/cartSlice'
import { store } from '@/shared/redux/store'

export interface RootState {
  cart: ReturnType<typeof cartReducer>
}

export type AppDispatch = typeof store.dispatch
