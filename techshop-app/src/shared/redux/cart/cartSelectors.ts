import { RootState } from '../types'
import { CartItem } from '@/shared/redux/cart/cartSlice'

export const selectCartItems = (state: RootState): CartItem[] => state.cart.items
export const selectCartTotal = (state: RootState): number =>
  state.cart.items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
