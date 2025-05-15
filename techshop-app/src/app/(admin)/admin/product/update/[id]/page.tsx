'use client'
import CategoryComboBox from '@/component/admin/CategoryComboBox'
import ProductVariationItem from '@/component/admin/ProductVariationItem'
import { useParams } from 'next/navigation'

export default function UpdateProductPage() {
  const params = useParams()

  return (
    <div className="flex h-screen flex-col">
      <h3 className="my-3 text-center text-3xl font-bold uppercase">Cập nhật sản phẩm</h3>
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
            Cập nhật
          </button>
        </div>
      </div>
      <div className="mx-3 my-3 bg-white shadow-md">
        <div className="m-3">
          <div className="flex justify-between">
            <div>
              <p className="font-bold">Biến thể sản phẩm</p>
              <p className="text-sm">Sản phẩm đang có 0 biến thể</p>
            </div>
            <button className="bg-yellow-300 px-3 font-semibold shadow-lg hover:bg-yellow-400 hover:shadow-sm">
              Thêm biến thể
            </button>
          </div>
          <hr className="mt-3 text-black" />
          <div className="max-h-[calc(100vh-400px)] divide-y divide-gray-200 overflow-y-auto lg:max-h-[calc(100vh-300px)]">
            <ProductVariationItem
              id="35"
              sku="13_DEN_SAPHU"
              basePrice={1350000}
              priceChange={-50000}
              imgUrl="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1"
            />
            <ProductVariationItem
              id="35"
              sku="13_DEN_SAPHU"
              basePrice={1350000}
              priceChange={50000}
              imgUrl="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1"
            />
            <ProductVariationItem
              id="35"
              sku="13_DEN_SAPHU"
              basePrice={1350000}
              priceChange={-50000}
              imgUrl="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1"
            />
            <ProductVariationItem
              id="35"
              sku="13_DEN_SAPHU"
              basePrice={1350000}
              priceChange={50000}
              imgUrl="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1"
            />
            <ProductVariationItem
              id="35"
              sku="13_DEN_SAPHU"
              basePrice={1350000}
              priceChange={-50000}
              imgUrl="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
