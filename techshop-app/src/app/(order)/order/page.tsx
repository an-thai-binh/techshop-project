'use client'
import { selectCartItems } from "@/features/cart/cartSelectors";
import OrderStage from "@/features/createOrder/components/OrderStage";
import { useAppSelector } from "@/shared/redux/hook";
import Image from "next/image";
import { useEffect } from "react";

export default function OrderPage() {
    const carts = useAppSelector(selectCartItems)
    useEffect(() => {
        console.log(carts)
    }, [carts])
    return (
        <div className="max-w-fit mx-auto">
            <div>
                <OrderStage stage={1} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:order-2 max-h-fit bg-white p-4 rounded shadow-sm">
                    <h3 className="text-sm font-bold mb-4">1 SẢN PHẨM</h3>
                    <div className="flex gap-4 mb-4">
                        <Image src="http://binhan.io.vn/api/file_upload/public_img/balo_huawei_honor_ad60_210525160944.jpg" alt="product" width={60} height={60}
                            className="w-[60px] h-[60px] flex justify-center items-center object-cover"
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
                        <div className="flex justify-between font-bold text-sm mt-2">
                            <span>Thành tiền</span>
                            <span>3.000.000đ</span>
                        </div>
                    </div>
                </div>
                <div className="lg:order-1 lg:col-span-2 space-y-6">
                    <div className="text-2xl font-bold uppercase">
                        <p className="text-center tracking-widest">Thông tin đặt hàng</p>
                    </div>

                    <div className="p-3 bg-white shadow-sm">
                        <label className="block text-md font-bold mb-1 uppercase">Tên khách hàng</label>
                        <div className="flex gap-2">
                            <input type="text" className="w-full border px-4 py-2 rounded" placeholder="VD: Nguyễn Văn A" />
                        </div>
                    </div>
                    <div className="p-3 bg-white shadow-sm">
                        <label className="block text-md font-bold mb-1 uppercase">Email</label>
                        <div className="flex gap-2">
                            <input type="email" className="w-full border px-4 py-2 rounded" placeholder="VD: examplee@gmail.com" />
                        </div>
                    </div>
                    <div className="p-3 bg-white shadow-sm">
                        <label className="block text-md font-bold mb-1 uppercase">Số điện thoại</label>
                        <div className="flex gap-2">
                            <input type="text" className="w-full border px-4 py-2 rounded" placeholder="VD: 0909090909" />
                        </div>
                    </div>
                    <div className="p-3 bg-white shadow-sm">
                        <label className="block text-md font-bold mb-1 uppercase">Địa chỉ nhận hàng</label>
                        <div className="flex gap-2">
                            <input type="text" className="w-full border px-4 py-2 rounded" placeholder="VD: 3/6/9 đường Tesla, quận Edison" />
                        </div>
                    </div>
                    <button className="w-full bg-green-200 text-white font-bold py-3 rounded mt-4 uppercase" disabled>
                        Thanh toán
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                        Bằng việc đặt hàng, bạn đồng ý với {' '}
                        <a href="#" className="underline">Điều khoản và các chính sách</a> về{' '}
                        <a href="#" className="underline">quyền riêng tư</a> và{' '}
                        <a href="#" className="underline">trả hàng</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}