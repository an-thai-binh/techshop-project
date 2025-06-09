import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchAddItemCart,
  fetchAddWithQuantityItemCart,
  fetchCart,
  fetchDeleteAllItemCart,
  fetchDeleteItemCart,
  fetchRemoveItemCart,
} from '@/api/CartAPI'
import { CartType } from '@/features/cart/types/CartType'
import { toast } from 'sonner'
import { setCart } from '@/features/cart/cartSlice'

export const fetchCartFromApi = createAsyncThunk<CartType>(
  'cart/fetchCart',
  async (_, { dispatch }) => {
    const { success, data } = await fetchCart()
    if (!success) {
      console.log('fetchCartFromApi Thunk', data)
    }
    dispatch(setCart(data.items))
    return data
  },
)

export const fetchAddItemCartFromApi = createAsyncThunk<string, number>(
  'cart/addItemCart',
  async (productVariationId, { dispatch }) => {
    const { success, message } = await fetchAddItemCart(productVariationId)
    if (!success) {
      // console.error('fetchAddCartFromApi Thunk', message)
      toast.error(message)
    }
    dispatch(fetchCartFromApi())
    return message
  },
)
export const fetchAddWithQuantityItemCartFromApi = createAsyncThunk<
  string,
  { productVariationId: number; quantity: number }
>('cart/addWithQuantityItemCart', async ({ productVariationId, quantity }, { dispatch }) => {
  const { success, message } = await fetchAddWithQuantityItemCart(productVariationId, quantity)
  if (!success) {
    // console.error('fetchAddCartFromApi Thunk', message)
    toast.error(message)
  }
  dispatch(fetchCartFromApi())
  return message
})
export const fetchSubtractItemCartFromApi = createAsyncThunk<string, number>(
  'cart/removeItemCart',
  async (cartItemId, { dispatch }) => {
    const { success, message } = await fetchRemoveItemCart(cartItemId)
    if (!success) {
      console.error('fetchAddCartFromApi Thunk', message)
    }
    dispatch(fetchCartFromApi())
    return message
  },
)
export const fetchDeleteItemCartFromApi = createAsyncThunk<string, number>(
  'cart/deleteItemCart',
  async (cartItemId, { dispatch }) => {
    const { success, message } = await fetchDeleteItemCart(cartItemId)
    if (!success) {
      console.error('fetchAddCartFromApi Thunk', message)
    }
    dispatch(fetchCartFromApi())
    return message
  },
)
export const fetchDeleteAllItemCartFromApi = createAsyncThunk<string, number>(
  'cart/deleteAllItemCart',
  async (_, { dispatch }) => {
    const { success, message } = await fetchDeleteAllItemCart()
    if (!success) {
      console.error('fetchAddCartFromApi Thunk', message)
    }
    dispatch(fetchCartFromApi())
    return message
  },
)
