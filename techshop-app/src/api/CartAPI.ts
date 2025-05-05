import { CartItemType } from '@/features/cart/types/CartItemType'

export async function fetchCart(): Promise<CartItemType[]> {
  const fetchData = await fetch('http://localhost:5000/cart')
  return fetchData.json()
}
