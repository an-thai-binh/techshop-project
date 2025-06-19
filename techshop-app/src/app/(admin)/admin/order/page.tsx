'use client'
import OrderDataTable from '@/component/admin/OrderDataTable'
import { useEffect } from 'react'

export default function AdminOrderPage() {
    useEffect(() => {
        document.title = 'Order Manager'
    });

    return (
        <div className="flex h-screen flex-col">
            <h3 className="my-3 text-center text-3xl font-bold uppercase">Quản lý đơn hàng</h3>
            <OrderDataTable />
        </div>
    )
}