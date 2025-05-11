import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/features/cart/cartSlice'
import productReducer from '@/features/product/productSlice'
import cartMiddleware from '@/features/cart/cartMiddleware'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware),
})
