import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchAddItemCartFromApi,
  fetchCartFromApi,
  fetchDeleteAllItemCartFromApi,
  fetchDeleteItemCartFromApi,
  fetchSubtractItemCartFromApi,
} from './cartThunks'
import { CartItemType } from '@/features/cart/types/CartItemType'

interface CartState {
  items: CartItemType[]
  totalPriceCart: number
}

const initialState: CartState = {
  items: [],
  totalPriceCart: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.productId === action.payload)
      if (item) {
        item.quantity += 1
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.productId !== action.payload)
    },
    updateQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const item = state.items.find((i) => i.productId === action.payload.productId)
      if (item) item.quantity = action.payload.quantity
    },
    setCart(state, action: PayloadAction<CartItemType[]>) {
      state.items = action.payload
    },
    clearCart(state) {
      state.items = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartFromApi.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.totalPriceCart = action.payload.totalPriceCart
    })

    builder.addCase(fetchAddItemCartFromApi.fulfilled, (state, action) => {
      console.log('Add item cart successful', action.payload)
    })

    builder.addCase(fetchSubtractItemCartFromApi.fulfilled, (state, action) => {
      console.log('Remove item cart successful', action.payload)
    })
    builder.addCase(fetchDeleteItemCartFromApi.fulfilled, (state, action) => {
      console.log('Delete item cart successful', action.payload)
    })
    builder.addCase(fetchDeleteAllItemCartFromApi.fulfilled, (state, action) => {
      console.log('Delete all item cart successful', action.payload)
    })
  },
})

export const { addToCart, removeFromCart, updateQuantity, setCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
