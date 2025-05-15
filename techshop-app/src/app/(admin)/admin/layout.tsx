import AdminSidebarItem from '@/component/admin/AdminSidebarItem'
import {
  ArchiveBoxIcon,
  HomeIcon,
  PhotoIcon,
  RectangleGroupIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col-reverse lg:flex-row">
      <div className="basis-1/12 bg-gray-800 md:h-full lg:basis-2/12">
        <div className="flex w-full flex-row items-center lg:flex-col">
          <div className="my-5 ml-5 border-r-2 border-gray-400 pr-3 lg:ml-0 lg:border-b-2 lg:border-r-0 lg:pr-0">
            <h3 className="font-bold text-gray-100 lg:text-center">
              <Link href={'/admin'}>
                Techshop <span className="text-yellow-400">Admin</span>
              </Link>
            </h3>
          </div>
          <div className="flex flex-row px-3 lg:w-full lg:flex-col">
            <AdminSidebarItem
              icon={<RectangleGroupIcon />}
              label={'Thể loại'}
              page={'/admin/product'}
            />
            <AdminSidebarItem
              icon={<ArchiveBoxIcon />}
              label={'Sản phẩm'}
              page={'/admin/product'}
            />
            <AdminSidebarItem icon={<TruckIcon />} label={'Đơn hàng'} page={'/admin/product'} />
            <AdminSidebarItem icon={<PhotoIcon />} label={'Hình ảnh'} page={'/admin/image'} />
            <AdminSidebarItem icon={<HomeIcon />} label={'Về trang chủ'} page={'/'} />
          </div>
        </div>
      </div>
      <div className="basis-11/12 overflow-auto bg-gray-200 md:h-full lg:basis-10/12">
        {children}
      </div>
    </div>
  )
}
