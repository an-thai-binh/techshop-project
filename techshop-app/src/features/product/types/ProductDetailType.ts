import { ProductVariationType } from '@/features/product/types/ProductVariationType'
import { ProductImageType } from '@/features/product/types/ProductImageType'
import { CategoryType } from '@/features/categories/types/CategoriesType'

export interface ProductDetailType {
  id: number
  category: CategoryType
  productName: string
  productDescription: string | undefined
  productBasePrice: number
  productVariationList: ProductVariationType[]
  productImageList: ProductImageType[]
}
