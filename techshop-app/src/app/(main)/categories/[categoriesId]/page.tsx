import { fetchProductByCategoryId } from '@/api/ProductAPI'
import { fetchCategoriesById } from '@/api/CategoriesAPI'
import CategoriesPage from '@/view/CategoriesPage'

export default async function CollectionProduct({ params }: { params: { categoriesId: number } }) {
  const { categoriesId } = await params
  const [category, products] = await Promise.all([
    fetchCategoriesById(categoriesId),
    fetchProductByCategoryId(categoriesId, 0, 10),
  ])
  console.log(category)
  return <CategoriesPage items={products.content} category={category} />
}
