import { Middleware } from 'redux'
const cartMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action)

  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof action.type === 'string'
  ) {
    if (action.type.startsWith('cart/')) {
      const state = storeAPI.getState()
      // (storeAPI.dispatch as AppDispatch)(fetchCartFromApi())
      localStorage.setItem('cart', JSON.stringify(state.cart.items))
    }
  }

  return result
}

export default cartMiddleware
