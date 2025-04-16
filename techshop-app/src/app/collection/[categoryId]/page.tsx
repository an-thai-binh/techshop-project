import CollectionListGrid from '@/shared/component/CollectionListGrid'
export interface Product {
  id: number
  category_id: number
  product_name: string
  product_description: string
  product_base_price: number
  product_img_url: string
}

export default async function CollectionProduct({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params
  const res = await fetch(`http://localhost:5000/products?category_id=${categoryId}`)
  const products: Product[] = await res.json()
  // const filePath = path.join(process.cwd(), 'public/data/collection_product_data.json')
  // const fileContent = fs.readFileSync(filePath, 'utf-8')
  // const dataJson = JSON.parse(fileContent)
  // const collectionData: CartItemProps[] = dataJson.products.map((product: ProductProps) => ({
  //   productProps: product,
  // }))
  return (
    <div className="flex size-full flex-col items-center gap-4 bg-gray-900 px-0">
      <div className={'flex h-fit w-full items-center px-2 py-4'}>
        <div className={'flex items-center gap-4'}>
          <div className={'flex items-center justify-center'}>
            <h1 className={'text-xs font-bold'}>Trang chủ</h1>
          </div>
          <div className={'flex items-center justify-center'}>
            <h1 className={'text-xs font-bold'}>Danh mục</h1>
          </div>
          <div className={'flex items-center justify-center'}>
            <h1 className={'text-xs font-bold'}>Sản phẩm</h1>
          </div>
        </div>
      </div>
      <div className={'container'}>
        <CollectionListGrid collectionData={products} />
      </div>
    </div>
  )
}
