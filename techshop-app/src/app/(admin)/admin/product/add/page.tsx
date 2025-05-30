import AddProductForm from '@/component/admin/AddProductForm'

export const metadata = {
  title: 'Add Product',
}
export default function AddProductPage() {
  return (
    <div className="flex h-screen flex-col text-gray-800">
      <h3 className="my-3 text-center text-3xl font-bold uppercase">Thêm sản phẩm</h3>
      <div className="mx-3 bg-white shadow-md">
        <AddProductForm />
      </div>
    </div>
  )
}
