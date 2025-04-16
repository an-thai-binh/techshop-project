import { createAsyncThunk } from '@reduxjs/toolkit'
import { CartItem } from '@/shared/redux/cart/cartSlice'

export const fetchCartFromApi = createAsyncThunk<CartItem[], string>(
  'cart/fetchCart',
  async (userId: string) => {
    const res = await fetch(`http://localhost:5000/cart/${userId}`)
    return res.json()
  },
)
