import { selectCartItems } from "@/features/cart/cartSelectors";
import { CartItemType } from "@/features/cart/types/CartItemType";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hook";
import React from "react";
import { selectOrderInformation } from "../createOrderSelectors";
import Image from "next/image";
import { formatVietNamCurrency } from "@/utils/CurrentyFormat";

type OrderPaymentProps = {
    setStage: React.Dispatch<React.SetStateAction<number>>;
}

export default function OrderPayment({ setStage }: OrderPaymentProps) {
    const carts: CartItemType[] = useAppSelector(selectCartItems)
    const { orderName, orderAddress, orderEmail, orderPhoneNumber } = useAppSelector(selectOrderInformation);

    const moveToSuccessPage = () => {
        setStage(3);
    }

    return (
        <>
            {/* <div className="text-2xl font-bold uppercase">
                <p className="text-center tracking-widest">Hình thức thanh toán</p>
            </div> */}
            <div className="mx-auto p-4 max-w-[500px] bg-white shadow-sm">
                <p className="text-center text-xl font-bold uppercase">Thông tin đặt hàng</p>
                <div className="flex">
                    <p className="basis-2/6 font-semibold">Tên khách hàng:</p>
                    <p className="basis-4/6">{orderName}</p>
                </div>
                <div className="flex">
                    <p className="basis-2/6 font-semibold">Email:</p>
                    <p className="basis-4/6">{orderEmail}</p>
                </div>
                <div className="flex">
                    <p className="basis-2/6 font-semibold">Số điện thoại:</p>
                    <p className="basis-4/6">{orderPhoneNumber}</p>
                </div>
                <div className="flex">
                    <p className="basis-2/6 font-semibold">Địa chỉ nhận hàng:</p>
                    <p className="basis-4/6">{orderAddress}</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold">Chi tiết đặt hàng:</p>
                    <div className="my-2">
                        {carts.map((item) => {
                            return (
                                <div key={item.id} className="flex">
                                    <p className="basis-5/6 text-sm text-justify">{item.productName}</p>
                                    <p className="basis-1/6 text-center">SL: {item.quantity}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex">
                    <p className="basis-2/6 font-semibold">Thành tiền:</p>
                    <p className="basis-4/6 text-center text-xl font-bold text-red-600">{formatVietNamCurrency(carts.reduce((sum, item) => { return sum + (item.productFinalPrice * item.quantity) }, 0))}</p>
                </div>
                {/* <div className="max-h-fit rounded bg-white lg:order-2">
                    <h3 className="mb-4 text-sm font-bold">{carts.length} SẢN PHẨM</h3>
                    {carts.map(item => {
                        return (
                            <div key={item.id} className="mb-4 flex gap-4">
                                <Image
                                    src={item.productImgUrl}
                                    alt="product"
                                    width={60}
                                    height={60}
                                    className="flex h-[60px] w-[60px] items-center justify-center object-cover"
                                />
                                <div className="w-full">
                                    <p className="text-sm font-medium">{item.productName}</p>
                                    <p className="text-sm text-gray-500">{item.sku}</p>
                                    <div className="flex">
                                        <p className="basis-1/4 text-sm text-gray-500">SL: <b>{item.quantity}</b></p>
                                        <div className="basis-2/4"></div>
                                        <p className="basis-2/4 text-sm text-gray-500">ĐG: <b>{formatVietNamCurrency(item.productFinalPrice)}</b></p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="border-t py-4">
                        <div className="flex justify-between text-sm">
                            <span>Tổng</span>
                            <span>{formatVietNamCurrency(carts.reduce((sum, item) => { return sum + (item.productFinalPrice * item.quantity) }, 0))}</span>
                        </div>
                        <div className="mt-2 flex justify-between text-sm font-bold">
                            <span>Thành tiền</span>
                            <span>{formatVietNamCurrency(carts.reduce((sum, item) => { return sum + (item.productFinalPrice * item.quantity) }, 0))}</span>
                        </div>
                    </div>
                </div> */}
                <hr />
                <div className="mt-3">
                    <p className="text-center font-bold">Chọn hình thức thanh toán</p>
                </div>
                <div className="flex items-center">
                    <div className="p-3">
                        <input type="radio" name="paymentMethod" />
                    </div>
                    <label className="flex-1 font-semibold">Thanh toán khi nhận hàng</label>
                </div>
                <div className="flex items-center">
                    <div className="p-3">
                        <input type="radio" name="paymentMethod" />
                    </div>
                    <label className="flex-1 font-semibold">Trả trước thông qua chuyển khoản trực tuyến</label>
                </div>
            </div >
            <div className="my-3 mx-auto max-w-fit">
                <button className="bg-green-500 px-3 py-2 font-bold text-white" onClick={moveToSuccessPage}>Tiếp tục</button>
            </div>
        </>
    );
}