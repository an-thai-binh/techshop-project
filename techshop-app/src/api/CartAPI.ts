import { apiFetch } from '@/api/index'
import { CartType } from '@/features/cart/types/CartType'
import api from '@/utils/APIAxiosConfig'

export async function fetchCart() {
  // return await apiFetch<{ success: boolean; data: CartType }>(
  //   'http://localhost:8080/techshop/cart/show',
  //   {
  //     method: 'GET',
  //   },
  // )
  return await api.get(`/cart/show`).then((response) => response.data)
}

export async function fetchAddItemCart(productVariationId: number) {
  // return await apiFetch<{ success: boolean; message: string }>(
  //   `http://localhost:8080/techshop/cartItem/add?productVariationId=${productVariationId}`,
  //   {
  //     method: 'POST',
  //   },
  // )
  return await api
    .post(`/cartItem/add?productVariationId=${productVariationId}`)
    .then((response) => response.data)
}
export async function fetchAddWithQuantityItemCart(productVariationId: number, quantity: number) {
  // return await apiFetch<{ success: boolean; message: string }>(
  //   `http://localhost:8080/techshop/cartItem/addWithQuantity`,
  //   {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       productVariationId,
  //       quantity,
  //     }),
  //   },
  // )
  return await api
    .post(`/cartItem/addWithQuantity`, {
      productVariationId,
      quantity,
    })
    .then((response) => response.data)
}

export async function fetchRemoveItemCart(cartItemId: number) {
  // return await apiFetch<{ success: boolean; message: string }>(
  //   `http://localhost:8080/techshop/cartItem/subtract?cartItemId=${cartItemId}`,
  //   {
  //     method: 'POST',
  //   },
  // )
  return await api
    .post(`/cartItem/subtract?cartItemId=${cartItemId}`)
    .then((response) => response.data)
}
export async function fetchDeleteItemCart(cartItemId: number) {
  // return await apiFetch<{ success: boolean; message: string }>(
  //   `http://localhost:8080/techshop/cartItem/delete?cartItemId=${cartItemId}`,
  //   {
  //     method: 'POST',
  //   },
  // )
  return await api
    .post(`/cartItem/delete?cartItemId=${cartItemId}`)
    .then((response) => response.data)
}
export async function fetchDeleteAllItemCart() {
  // return await apiFetch<{ success: boolean; message: string }>(
  //   `http://localhost:8080/techshop/cartItem/deleteAll}`,
  //   {
  //     method: 'POST',
  //   },
  // )
  return await api.post(`/cartItem/deleteAll`).then((response) => response.data)
}
