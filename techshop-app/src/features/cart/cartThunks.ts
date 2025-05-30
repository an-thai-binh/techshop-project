import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchAddItemCart,
  fetchCart,
  fetchDeleteAllItemCart,
  fetchDeleteItemCart,
  fetchRemoveItemCart,
} from '@/api/CartAPI'
import { CartType } from '@/features/cart/types/CartType'

export const fetchCartFromApi = createAsyncThunk<CartType>('cart/fetchCart', async () => {
  const { success, data } = await fetchCart()
  if (!success) {
    console.log('fetchCartFromApi Thunk', data)
  }
  return data
})

export const fetchAddItemCartFromApi = createAsyncThunk<string, number>(
  'cart/addItemCart',
  async (productId, { dispatch }) => {
    const { success, message } = await fetchAddItemCart(productId)
    if (!success) {
      console.error('fetchAddCartFromApi Thunk', message)
    }
    dispatch(fetchCartFromApi())
    return message
  },
)
export const fetchRemoveItemCartFromApi = createAsyncThunk<string, number>(
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
