'use client'
import AdditionFloatingButton from '@/component/admin/AdditionFloatingButton'
const CategoryDataTable = dynamic(() => import('@/component/admin/CategoryDataTable'), {
    ssr: false,
})
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

export default function AdminCategoryPage() {
    useEffect(() => {
        document.title = 'Category Manager'
    });

    return (
        <div className="flex h-screen flex-col">
            <h3 className="my-3 text-center text-3xl font-bold uppercase">Quản lý thể loại</h3>
            <div className="mx-3 h-fit bg-white shadow-md">
                <div className="w-full">
                    <CategoryDataTable />
                </div>
            </div>
            <AdditionFloatingButton url="/admin/category/add" />
        </div>
    )
}
