import { RootState } from '@/shared/redux/types'
import { ProductType } from '@/features/product/types/ProductType'

export const selectProducts = (state: RootState): ProductType[] => state.product.items
