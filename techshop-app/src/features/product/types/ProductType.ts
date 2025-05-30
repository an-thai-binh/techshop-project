export interface ProductType {
  id: number
  categoryName: string
  productName: string
  categoryId: number
  productDescription: string
  productBasePrice: number
  productImgUrl: string
}

export interface ProductPageableType {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

export interface ProductDataType {
  content: ProductType[]
  page: ProductPageableType
}
