import { createAsyncThunk } from '@reduxjs/toolkit'
import { ChoiceType } from '@/features/product/types/ProductChoiceType'
import { fetchChoiceByProductId } from '@/api/ProductAPI'
import { setChoiceGetByProduct } from '@/features/product/productSlice'

// export const fetchProductDetailFromApi = createAsyncThunk<ProductDetailType, number>(
//   'product/fetchProductDetail', async (productId, {dispatch}) => {
//     const  = await fetchProductDetails(productId)
//     if (!success) {
//       console.error('fetchChoiceGetByProductId', data)
//     }
//     dispatch(setChoiceGetByProduct(data))
//     return data
//   }
// )
export const fetchChoiceGetByProductIdFromApi = createAsyncThunk<ChoiceType[], number>(
  'product/fetchChoiceGetByProductId',
  async (productId, { dispatch }) => {
    const data = await fetchChoiceByProductId(productId)
    if (!data) {
      console.error('fetchChoiceGetByProductId', data)
    }
    dispatch(setChoiceGetByProduct(data))
    return data
  },
)
