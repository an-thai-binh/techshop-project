import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from '@/features/product/types/ProductType'
import { ProductDetailType } from '@/features/product/types/ProductDetailType'
import { fetchChoiceGetByProductIdFromApi } from '@/features/product/productThunks'
import { ChoiceType } from '@/features/product/types/ProductChoiceType'

interface ProductsState {
  items: ProductType[]
  productDetail: ProductDetailType | null
  choices: ChoiceType[]
  selectedChoices: Record<number, number>
}

const initialState: ProductsState = {
  items: [],
  productDetail: null,
  choices: [],
  selectedChoices: {},
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.items = action.payload
    },
    setProductsDetail: (state, action: PayloadAction<ProductDetailType>) => {
      state.productDetail = action.payload
    },
    setChoiceGetByProduct: (state, action: PayloadAction<ChoiceType[]>) => {
      state.choices = action.payload
    },
    setSelectedChoice: (state, action: PayloadAction<Record<number, number>>) => {
      state.selectedChoices = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChoiceGetByProductIdFromApi.fulfilled, (state, action) => {
      state.choices = action.payload
    })
  },
})

export const { setProducts, setProductsDetail, setChoiceGetByProduct, setSelectedChoice } =
  productSlice.actions
export default productSlice.reducer
