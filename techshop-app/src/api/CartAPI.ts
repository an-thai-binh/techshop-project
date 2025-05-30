import { apiFetch } from '@/api/index'
import { CartType } from '@/features/cart/types/CartType'

export async function fetchCart() {
  return await apiFetch<{ success: boolean; data: CartType }>(
    'http://localhost:8080/techshop/cart/show',
    {
      method: 'GET',
    },
  )
}

export async function fetchAddItemCart(productVariationId: number) {
  return await apiFetch<{ success: boolean; message: string }>(
    `http://localhost:8080/techshop/cart/add?productVariationId=${productVariationId}`,
    {
      method: 'POST',
    },
  )
}

export async function fetchRemoveItemCart(cartItemId: number) {
  return await apiFetch<{ success: boolean; message: string }>(
    `http://localhost:8080/techshop/cart/remove?cartItemId=${cartItemId}`,
    {
      method: 'POST',
    },
  )
}
export async function fetchDeleteItemCart(cartItemId: number) {
  return await apiFetch<{ success: boolean; message: string }>(
    `http://localhost:8080/techshop/cart/delete?cartItemId=${cartItemId}`,
    {
      method: 'POST',
    },
  )
}
export async function fetchDeleteAllItemCart() {
  return await apiFetch<{ success: boolean; message: string }>(
    `http://localhost:8080/techshop/cart/removeAll}`,
    {
      method: 'POST',
    },
  )
}
