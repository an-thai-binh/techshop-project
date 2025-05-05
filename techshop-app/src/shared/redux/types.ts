import cartReducer from '@/features/cart/cartSlice'
import { store } from '@/shared/redux/store'
import productReducer from '@/features/product/productSlice'

export interface RootState {
  cart: ReturnType<typeof cartReducer>
  product: ReturnType<typeof productReducer>
}

export type AppDispatch = typeof store.dispatch
