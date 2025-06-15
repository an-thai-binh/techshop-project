'use client'
const ProductDataTable = dynamic(() => import('@/component/admin/ProductDataTable'), {
    ssr: false,
})
import OrderDataTable from '@/component/admin/OrderDataTable'
import { FunnelIcon } from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

export default function AdminOrderPage() {
    useEffect(() => {
        document.title = 'Order Manager'
    });

    return (
        <div className="flex h-screen flex-col">
            <h3 className="my-3 text-center text-3xl font-bold uppercase">Quản lý đơn hàng</h3>
            <div className="mx-3 bg-white shadow-md">
                <div className="flex items-center pl-3 pt-3">
                    <p className="text-xl">Lọc dữ liệu</p>
                    <FunnelIcon className="size-5" />
                </div>
                <div className="grid grid-cols-1 gap-2 p-3 lg:grid-cols-2">
                    <div>
                        <p className="font-semibold">ID đơn hàng</p>
                        <input
                            type="text"
                            className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                            placeholder="VD: 1"
                        />
                    </div>
                    <div>
                        <p className="font-semibold">Trạng thái đơn hàng</p>
                        <input
                            type="text"
                            className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                            placeholder="VD: PENDING"
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
                    <OrderDataTable />
                </div>
            </div>
        </div>
    )
}
