import { CategoriesType } from '@/features/categories/types/CategoriesType'

export async function fetchCategories(): Promise<CategoriesType[]> {
  const fetchData = await fetch('http://localhost:5000/categories')
  return await fetchData.json()
}

export async function fetchCategoriesById(categoryId: string): Promise<CategoriesType | undefined> {
  const fetchData = await fetch('http://localhost:5000/categories')
  const categories: CategoriesType[] = await fetchData.json()
  return categories.find((r) => String(r.id) === categoryId)
}
