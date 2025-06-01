import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import('@/view/HomePage'))
import { fetchCategories } from '@/api/CategoriesAPI'
import { fetchAllProduct, fetchProductByCategoryId } from '@/api/ProductAPI'

export default async function Home() {
  const [categories, hotProduct, sliderProduct, gridProduct] = await Promise.all([
    fetchCategories(),
    fetchProductByCategoryId(1, 0, 10),
    fetchProductByCategoryId(2, 0, 10),
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
