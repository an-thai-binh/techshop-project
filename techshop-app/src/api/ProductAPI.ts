import { ProductDataType, ProductType } from '@/features/product/types/ProductType'
import { ProductDetailType } from '@/features/product/types/ProductDetailType'
import { ChoiceType } from '@/features/product/types/ProductChoiceType'

export async function fetchAllProduct(): Promise<ProductDataType> {
  const fetchData = await fetch('http://localhost:8080/techshop/product/display?page=0&size=20')
  return await fetchData.json().then((r) => r.data)
}

export async function fetchProductByCategoryId(
  categoryId: number,
  page: number,
  size: number,
): Promise<ProductDataType> {
  const fetchData = await fetch(
    `http://localhost:8080/techshop/product/display/getByCategory?categoryId=${categoryId}&page=${page}&size=${size}&sort=id&direction=desc`,
  )
  return await fetchData.json().then((r) => r.data)
}

export async function fetchProductsByName(productName: string): Promise<ProductType | undefined> {
  const fetchData = await fetch('http://localhost:5000/products')
  const data: ProductType[] = await fetchData.json()
  return data.find((r) => String(r.productName) === productName)
}

export async function fetchProductDetails(
  productId: number,
): Promise<ProductDetailType | undefined> {
  const fetchData = await fetch(`http://localhost:8080/techshop/product/detail/${productId}`)
  return await fetchData.json().then((r) => r.data)
}

// export async function fetchChoiceByProductId(productId: number) {
//   return await apiFetch<apiResponse<ChoiceType[]>>(
//     `http://localhost:8080/techshop/choice/getByProduct?productId=${productId}`,
//     {
//       method: 'GET',
//     },
//   )
// }
export async function fetchChoiceByProductId(productId: number): Promise<ChoiceType[]> {
  const fetchData = await fetch(
    `http://localhost:8080/techshop/choice/getByProduct?productId=${productId}`,
  )
  return await fetchData.json().then((r) => r.data)
}
