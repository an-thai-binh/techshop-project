import { CartItemType } from '@/features/cart/types/CartItemType'
import { RootState } from '@/shared/redux/store'

export const selectCartItems = (state: RootState): CartItemType[] => state.cart.items
export const selectCartTotalItems = (state: RootState): number => state.cart.items.length
export const selectCartTotalPrice = (state: RootState): number => state.cart.totalPriceCart
