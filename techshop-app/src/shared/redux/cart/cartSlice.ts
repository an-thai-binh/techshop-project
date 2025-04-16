import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCartFromApi } from '@/shared/redux/cart/cartThunks'

export interface CartItem {
  productId: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = state.items.find((i) => i.productId === action.payload.productId)
      if (item) item.quantity += action.payload.quantity
      else state.items.push(action.payload)
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.productId !== action.payload)
    },
    updateQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const item = state.items.find((i) => i.productId === action.payload.productId)
      if (item) item.quantity = action.payload.quantity
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload
    },
    clearCart(state) {
      state.items = []
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchCartFromApi.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
    }),
})

export const { addToCart, removeFromCart, updateQuantity, setCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
