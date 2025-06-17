import { fetchProductDetails } from '@/api/ProductAPI'
import { ProductDetailType } from '@/features/product/types/ProductDetailType'
import ProductDetailPage from '@/view/ProductDetailPage'

export default async function ProductDetail({ params }: { params: { productId: number } }) {
  const { productId } = await params
  const productDetail: ProductDetailType | undefined = await fetchProductDetails(productId)

  return <ProductDetailPage productId={productId} productDetail={productDetail} />
}
