import { Middleware } from 'redux'
import { RootState } from '../types'

const cartMiddleware: Middleware<object, RootState> = (storeAPI) => (next) => (action) => {
  const result = next(action)

  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof action.type === 'string' &&
    action.type.startsWith('cart/')
  ) {
    const state = storeAPI.getState()
    localStorage.setItem('cart', JSON.stringify(state.cart.items))
  }

  return result
}

export default cartMiddleware
