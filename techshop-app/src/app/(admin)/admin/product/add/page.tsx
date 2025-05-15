import CategoryComboBox from '@/component/admin/CategoryComboBox'

export const metadata = {
  title: 'Add Product',
}
export default function AddProductPage() {
  return (
    <div className="flex h-screen flex-col">
      <h3 className="my-3 text-center text-3xl font-bold uppercase">Thêm sản phẩm</h3>
      <div className="mx-3 bg-white shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="m-3">
            <p className="font-bold">
              Tên sản phẩm<span className="ms-1 text-red-500">*</span>
            </p>
            <input
              type="text"
              className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
              placeholder="VD: iPhone..."
            />
            {/* <span className="text-sm font-medium text-red-500"></span> */}
          </div>
          <div className="m-3">
            <p className="font-bold">
              Danh mục<span className="ms-1 text-red-500">*</span>
            </p>
            <CategoryComboBox />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="mb-3 bg-yellow-300 px-3 py-1 font-semibold uppercase shadow-lg hover:bg-yellow-400 hover:shadow-sm">
            Thêm
          </button>
        </div>
      </div>
    </div>
  )
}
