'use client'
import AdditionFloatingButton from '@/component/admin/AdditionFloatingButton'
const ProductDataTable = dynamic(() => import('@/component/admin/ProductDataTable'), {
  ssr: false,
})
import { FunnelIcon } from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

export default function AdminProductPage() {
  useEffect(() => {
    document.title = 'Product Manager'
  });

  return (
    <div className="flex h-screen flex-col">
      <h3 className="my-3 text-center text-3xl font-bold uppercase">Quản lý sản phẩm</h3>
      <div className="mx-3 bg-white shadow-md">
        <div className="flex items-center pl-3 pt-3">
          <p className="text-xl">Lọc dữ liệu</p>
          <FunnelIcon className="size-5" />
        </div>
        <div className="grid grid-cols-1 gap-2 p-3 lg:grid-cols-2">
          <div>
            <p className="font-semibold">ID sản phẩm</p>
            <input
              type="text"
              className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
              placeholder="VD: 1"
            />
          </div>
          <div>
            <p className="font-semibold">Tên sản phẩm</p>
            <input
              type="text"
              className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
              placeholder="VD: iPhone 15"
            />
          </div>
        </div>
        <div className="flex justify-center pb-3">
          <button
            type="button"
            className="bg-blue-400 px-2 py-1 font-bold text-white hover:bg-blue-500"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      <div className="mx-3 my-3 h-fit bg-white shadow-md">
        <div className="w-full">
          <ProductDataTable />
        </div>
      </div>
      <AdditionFloatingButton url="/admin/product/add" />
    </div>
  )
}
