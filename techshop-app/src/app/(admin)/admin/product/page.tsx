'use client'
import AdditionFloatingButton from '@/component/admin/AdditionFloatingButton'
import ProductDataTable from '@/component/admin/ProductDataTable';
import { useEffect } from 'react'

export default function AdminProductPage() {
  useEffect(() => {
    document.title = 'Product Manager'
  });

  return (
    <div className="flex h-screen flex-col">
      <h3 className="my-3 text-center text-3xl font-bold uppercase">Quản lý sản phẩm</h3>
      <ProductDataTable />
      <AdditionFloatingButton url="/admin/product/add" />
    </div>
  )
}