import { fetchProductByCategoryId } from '@/api/ProductAPI'
import { fetchCategoriesById } from '@/api/CategoriesAPI'
import CategoriesPage from '@/view/CategoriesPage'

export default async function CollectionProduct({ params }: { params: { categoriesId: string } }) {
  const { categoriesId } = params
  const [category, products] = await Promise.all([
    fetchCategoriesById(categoriesId),
    fetchProductByCategoryId(categoriesId),
  ])
  return <CategoriesPage items={products} category={category} />
}
