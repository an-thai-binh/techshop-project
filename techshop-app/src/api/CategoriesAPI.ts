import { CategoryType } from '@/features/categories/types/CategoriesType'

export async function fetchCategories(): Promise<CategoryType[]> {
  const fetchData = await fetch(`http://localhost:8080/techshop/category/all`)
  return await fetchData.json().then((r) => r.data)
}

export async function fetchCategoriesById(categoryId: number): Promise<CategoryType | undefined> {
  const fetchData = await fetch(`http://localhost:8080/techshop/category/${categoryId}`)
  return await fetchData.json().then((r) => r.data)
}
