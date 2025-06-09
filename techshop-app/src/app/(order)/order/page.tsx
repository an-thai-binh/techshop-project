'use client'
import { selectCartItems } from '@/features/cart/cartSelectors'
import OrderStage from '@/features/createOrder/components/OrderStage'
import { useAppSelector } from '@/shared/redux/hook'
import Image from 'next/image'
import { useEffect } from 'react'

export default function OrderPage() {
  const carts = useAppSelector(selectCartItems)
  useEffect(() => {
    console.log(carts)
  }, [carts])
  return (
    <div className="mx-auto max-w-fit">
      <div>
        <OrderStage stage={1} />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="max-h-fit rounded bg-white p-4 shadow-sm lg:order-2">
          <h3 className="mb-4 text-sm font-bold">1 SẢN PHẨM</h3>
          <div className="mb-4 flex gap-4">
            <Image
              src="http://binhan.io.vn/api/file_upload/public_img/balo_huawei_honor_ad60_210525160944.jpg"
              alt="product"
              width={60}
              height={60}
              className="flex h-[60px] w-[60px] items-center justify-center object-cover"
            />
            <div>
              <p className="text-sm font-medium">ASOS DESIGN sustainable puffer jacket</p>
              <p className="text-sm text-gray-500">Black, XXS</p>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">SL: 1</p>
                <p className="text-sm text-gray-500">3.000.000đ</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-sm">
              <span>Tổng</span>
              <span>3.000.000đ</span>
            </div>
            <div className="mt-2 flex justify-between text-sm font-bold">
              <span>Thành tiền</span>
              <span>3.000.000đ</span>
            </div>
          </div>
        </div>
        <div className="space-y-6 lg:order-1 lg:col-span-2">
          <div className="text-2xl font-bold uppercase">
            <p className="text-center tracking-widest">Thông tin đặt hàng</p>
          </div>

          <div className="bg-white p-3 shadow-sm">
            <label className="text-md mb-1 block font-bold uppercase">Tên khách hàng</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full rounded border px-4 py-2"
                placeholder="VD: Nguyễn Văn A"
              />
            </div>
          </div>
          <div className="bg-white p-3 shadow-sm">
            <label className="text-md mb-1 block font-bold uppercase">Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                className="w-full rounded border px-4 py-2"
                placeholder="VD: examplee@gmail.com"
              />
            </div>
          </div>
          <div className="bg-white p-3 shadow-sm">
            <label className="text-md mb-1 block font-bold uppercase">Số điện thoại</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full rounded border px-4 py-2"
                placeholder="VD: 0909090909"
              />
            </div>
          </div>
          <div className="bg-white p-3 shadow-sm">
            <label className="text-md mb-1 block font-bold uppercase">Địa chỉ nhận hàng</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full rounded border px-4 py-2"
                placeholder="VD: 3/6/9 đường Tesla, quận Edison"
              />
            </div>
          </div>
          <button
            className="mt-4 w-full rounded bg-green-200 py-3 font-bold uppercase text-white"
            disabled
          >
            Thanh toán
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Bằng việc đặt hàng, bạn đồng ý với{' '}
            <a href="#" className="underline">
              Điều khoản và các chính sách
            </a>{' '}
            về{' '}
            <a href="#" className="underline">
              quyền riêng tư
            </a>{' '}
            và{' '}
            <a href="#" className="underline">
              trả hàng
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
