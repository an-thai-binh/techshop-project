import { ProductType } from '@/features/product/types/ProductType'

export async function fetchAllProduct(): Promise<ProductType[]> {
  const fetchData = await fetch('http://localhost:5000/products')
  return await fetchData.json()
}

export async function fetchProductByCategoryId(categoryId: string): Promise<ProductType[]> {
  const fetchData = await fetch('http://localhost:5000/products')
  const data: ProductType[] = await fetchData.json()
  return data.filter((r) => String(r.category_id) == categoryId)
}

export async function fetchProductsByName(productName: string): Promise<ProductType | undefined> {
  const fetchData = await fetch('http://localhost:5000/products')
  const data: ProductType[] = await fetchData.json()
  return data.find((r) => String(r.product_name) === productName)
}
