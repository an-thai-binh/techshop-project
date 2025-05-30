export interface ImageType {
  id: number
  imgUrl: string
}

export interface ProductImageType {
  id: number
  productId: number
  image: ImageType
  first: boolean
}
