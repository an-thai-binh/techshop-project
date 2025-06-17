'use client'

import { EndpointAPI } from "@/api/EndpointAPI";
import AdminError from "@/component/admin/AdminError";
import { OrderDetail } from "@/types/order";
import api from "@/utils/APIAxiosConfig";
import { formatDateTime, formatOrderStatus, formatPaymentStatus, formatVietNamCurrency } from "@/utils/CurrentyFormat";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateOrderPage() {
    const id = useParams().id;
    const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
    const [fetchOrderDetailError, setFetchOrderDetailError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await api.get(EndpointAPI.ORDER_DETAIL + id);
                if (response.data.success) {
                    setOrderDetail(response.data.data);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                setFetchOrderDetailError(message);
                throw new Error("Fetch order detail error: " + message);
            }
        }
        fetchOrderDetail();
    }, [id]);

    return (
        <>
            {fetchOrderDetailError ? <AdminError message={fetchOrderDetailError} /> :
                orderDetail &&
                <div className="p-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div className="lg:col-span-2">
                        <div className="p-3 bg-white shadow-md">
                            <p className="text-center text-xl font-bold uppercase">Thông tin đơn hàng #{orderDetail.id}</p>
                            <div className="mt-3 flex flex-col gap-3">
                                <div className="flex items-center">
                                    <p className="basis-1/2 font-bold">Tên khách hàng</p>
                                    <p className="basis-1/2">{orderDetail.orderName}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="basis-1/2 font-bold">Email</p>
                                    <p className="basis-1/2">{orderDetail.orderEmail}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="basis-1/2 font-bold">Số điện thoại</p>
                                    <p className="basis-1/2">{orderDetail.orderPhoneNumber}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="basis-1/2 font-bold">Địa chỉ</p>
                                    <p className="basis-1/2">{orderDetail.orderAddress}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="basis-1/2 font-bold">Thời gian đặt hàng</p>
                                    <p className="basis-1/2">{formatDateTime(orderDetail.orderTime)}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="basis-1/2 font-bold">Trạng thái</p>
                                    <p className="basis-1/2 font-bold">{formatOrderStatus(orderDetail.status).formatted}</p>
                                </div>
                            </div>
                            <p className="mt-3 pt-3 text-center text-xl font-bold uppercase border-t-2">Cập nhật trạng thái</p>
                            <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <button className="bg-blue-500 py-2 font-bold text-white rounded-lg hover:shadow-md uppercase">Đang chuẩn bị</button>
                                <button className="bg-blue-500 py-2 font-bold text-white rounded-lg hover:shadow-md uppercase">Đang giao hàng</button>
                                <button className="bg-green-500 py-2 font-bold text-white rounded-lg hover:shadow-md uppercase">Đã hoàn thành</button>
                            </div>
                            <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
                                <button className="bg-red-500 py-2 font-bold text-white rounded-lg hover:shadow-md uppercase">Huỷ</button>
                                <input type="text" name="cancelReason" placeholder="Vui lòng nhập lý do nếu huỷ" className="mt-3 lg:mt-0 h-[40px] col-span-2 border-b-2 border-gray-500" />
                            </div>
                        </div>
                        <div className="mt-3 p-3 bg-white shadow-md">
                            <p className="text-center text-xl font-bold uppercase">Thông tin thanh toán</p>
                            <div className="mt-3 flex flex-col gap-3">
                                <div className="flex items-center">
                                    <p className="basis-1/2 font-bold">Mã giao dịch</p>
                                    <p className="basis-1/2">{orderDetail.payment.id}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="basis-1/2 font-bold">Tổng tiền</p>
                                    <p className="basis-1/2">{formatVietNamCurrency(orderDetail.payment.amount)}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="basis-1/2 font-bold">Phương thức thanh toán</p>
                                    <p className="basis-1/2">{orderDetail.payment.paymentMethod}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="basis-1/2 font-bold">Trạng thái thanh toán</p>
                                    <p className="basis-1/2"><b>{formatPaymentStatus(orderDetail.payment.paymentStatus).formatted}</b></p>
                                </div>
                                <div className="flex items-center">
                                    <p className="basis-1/2 font-bold">Cổng thanh toán</p>
                                    <p className="basis-1/2">{orderDetail.payment.paymentGateway ? orderDetail.payment.paymentGateway : ""}</p>
                                </div>
                                {orderDetail.payment.paymentMethod === "COD" && orderDetail.status !== "SUCCESS" ?
                                    <>
                                        <p className="mt-3 pt-3 text-center text-xl font-bold uppercase border-t-2">Cập nhật trạng thái</p>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            <button className="bg-red-500 py-2 font-bold text-white rounded-lg hover:shadow-md uppercase">Chưa thanh toán</button>
                                            <button className="bg-blue-500 py-2 font-bold text-white rounded-lg hover:shadow-md uppercase">Đã thanh toán</button>
                                        </div>
                                    </>
                                    : null}
                            </div>
                        </div>
                    </div>
                    <div className="max-h-fit bg-white p-3 shadow-md">
                        <h3 className="mb-4 text-sm font-bold">{orderDetail.orderItemList.length} SẢN PHẨM</h3>
                        {orderDetail.orderItemList.map(item => {
                            return (
                                <div key={item.id} className="mb-4 flex gap-4">
                                    <Image
                                        src={item.imgUrl}
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
                                            <p className="basis-2/4 text-sm text-gray-500">ĐG: <b>{formatVietNamCurrency(item.unitPrice)}</b></p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="border-t pt-4">
                            <div className="flex justify-between text-sm">
                                <span>Tổng</span>
                                <span>{formatVietNamCurrency(orderDetail.orderItemList.reduce((sum, item) => { return sum + (item.unitPrice * item.quantity) }, 0))}</span>
                            </div>
                            <div className="mt-2 flex justify-between text-sm font-bold">
                                <span>Thành tiền</span>
                                <span>{formatVietNamCurrency(orderDetail.orderItemList.reduce((sum, item) => { return sum + (item.unitPrice * item.quantity) }, 0))}</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}