import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/features/cart/cartSlice'
import productReducer from '@/features/product/productSlice'
import cartMiddleware from '@/features/cart/cartMiddleware'
import authReducer from '@/features/auth/authSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
