import { CartItemType } from '@/features/cart/types/CartItemType'
import { RootState } from '@/shared/redux/store'

export const selectCartItems = (state: RootState): CartItemType[] => state.cart.items
export const selectCartTotal = (state: RootState): number =>
  state.cart.items.reduce((sum: number, item: CartItemType) => sum + item.price * item.quantity, 0)
