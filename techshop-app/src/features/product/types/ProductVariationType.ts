export interface ProductVariationType {
  id: number
  sku: string
  variationPriceChange: number
  imageId: number | null
  quantity: number
  choiceValueIds: number[]
}
