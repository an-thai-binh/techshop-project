import HomePage from '@/view/HomePage'
import { fetchCategories } from '@/api/CategoriesAPI'
import { fetchAllProduct, fetchProductByCategoryId } from '@/api/ProductAPI'

export default async function Home() {
  const [categories, hotProduct, sliderProduct, gridProduct] = await Promise.all([
    fetchCategories(),
    fetchProductByCategoryId('1'),
    fetchProductByCategoryId('2'),
    fetchAllProduct(),
  ])
  return (
    <HomePage
      categories={categories}
      products={{
        hotProducts: hotProduct,
        sliderProducts: sliderProduct,
        gridProducts: gridProduct,
      }}
    />
  )
}
