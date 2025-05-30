import { CartItemType } from '@/features/cart/types/CartItemType'

export interface CartType {
  items: CartItemType[]
  totalPriceCart: number
}
