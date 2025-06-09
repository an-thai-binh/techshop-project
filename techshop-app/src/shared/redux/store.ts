import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/features/cart/cartSlice'
import productReducer from '@/features/product/productSlice'
import cartMiddleware from '@/features/cart/cartMiddleware'
import authReducer from '@/features/auth/authSlice'
import createOrderReducer from '@/features/createOrder/createOrderSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    auth: authReducer,
    createOrder: createOrderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(cartMiddleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
