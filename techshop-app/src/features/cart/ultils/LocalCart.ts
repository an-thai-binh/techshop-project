export function getCartFromLocalStorage() {
  try {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : {}
  } catch (err) {
    console.log('error', err)
    return {}
  }
}
