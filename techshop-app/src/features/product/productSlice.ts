import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from '@/features/product/types/ProductType'

interface ProductsState {
  items: ProductType[]
}

const initialState: ProductsState = {
  items: [],
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.items = action.payload
    },
  },
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer
