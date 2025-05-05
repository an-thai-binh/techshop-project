import { createAsyncThunk } from '@reduxjs/toolkit'
import { CartItemType } from '@/features/cart/types/CartItemType'

export const fetchCartFromApi = createAsyncThunk<CartItemType[], string>(
  'cart/fetchCart',
  async (userId: string) => {
    const res = await fetch(`http://localhost:5000/cart/${userId}`)
    return res.json()
  },
)
