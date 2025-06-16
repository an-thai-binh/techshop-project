import { selectCartItems } from "@/features/cart/cartSelectors";
import { CartItemType } from "@/features/cart/types/CartItemType";
import { useAppSelector } from "@/shared/redux/hook";
import React, { useState } from "react";
import { selectOrderId, selectOrderInformation } from "../createOrderSelectors";
import { formatVietNamCurrency } from "@/utils/CurrentyFormat";
import { EndpointAPI } from "@/api/EndpointAPI";
import api from "@/utils/APIAxiosConfig";

type PaymentPageProps = {
    setStage: React.Dispatch<React.SetStateAction<number>>;
}

export default function OrderPayment({ setStage }: PaymentPageProps) {
    const carts: CartItemType[] = useAppSelector(selectCartItems)
    const orderId = useAppSelector(selectOrderId);
    const { orderName, orderAddress, orderEmail, orderPhoneNumber } = useAppSelector(selectOrderInformation);
    const [paymentMethod, setPaymentMethod] = useState<string>("cod");

    const handleChangePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    }

    const onSubmitPaymentMethod = () => {
        if (paymentMethod === "cod") {
            handleCodMethod();
        } else {
            handleTransferMethod();
        }
    }

    const handleCodMethod = async () => {
        try {
            const response = await api.post(EndpointAPI.CHECKOUT_COD + orderId);
            if (response.data.success) {
                setStage(3);
            }
        } catch (error: any) {
            setStage(0);
            const message = error.response?.data.message || error.message;
            throw new Error('Set payment method failed: ' + message);
        }

    }

    const handleTransferMethod = async () => {
        try {
            const response = await api.post(EndpointAPI.CHECKOUT_TRANSFER + orderId);
            if (response.data.success) {
                const sessionUrl = response.data.data.sessionUrl;
                const popup = window.open(sessionUrl, "_blank", "width=500,height=800");

                const interval = setInterval(() => {
                    if (popup?.closed) {
                        clearInterval(interval);
                        throw new Error("Set payment method failed: User has closed payment window");
                    }
                }, 500);

                const handlePopupMessage = (e: MessageEvent) => {
                    const expectedOrigin = window.location.origin;
                    if (e.source !== popup || e.origin != expectedOrigin) {
                        return;
                    }
                    if (e.data?.status === "success") {
                        clearInterval(interval);
                        setStage(3);
                        setTimeout(() => {
                            popup?.close();
                        }, 1500);
                    } else if (e.data?.status === "cancel") {
                        clearInterval(interval);
                        setTimeout(() => {
                            popup?.close();
                        }, 1500);
                    }
                    window.removeEventListener("message", handlePopupMessage);
                }
                window.addEventListener("message", handlePopupMessage);
            }
        } catch (error: any) {
            setStage(0);
            const message = error.response?.data.message || error.message;
            throw new Error('Set payment method failed: ' + message);
        }
    }

    return (
        <>
            <div className="mx-auto p-4 max-w-[500px] bg-white shadow-md">
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
                    <div className="my-2 py-1 px-2 bg-blue-100 rounded-lg">
                        {carts.map((item) => {
                            return (
                                <div key={item.id} className="flex items-center">
                                    <p className="basis-5/6 text-sm text-justify">{item.productName}</p>
                                    <p className="basis-1/6 text-center">SL: <b></b>{item.quantity}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex">
                    <p className="basis-2/6 font-semibold">Thành tiền:</p>
                    <p className="basis-4/6 text-center text-xl font-bold text-red-600">{formatVietNamCurrency(carts.reduce((sum, item) => { return sum + (item.productFinalPrice * item.quantity) }, 0))}</p>
                </div>
                <hr />
                <div className="mt-3">
                    <p className="text-center font-bold">Chọn hình thức thanh toán</p>
                </div>
                <div className="flex items-center">
                    <div className="p-3">
                        <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === "cod"} onChange={handleChangePaymentMethod} />
                    </div>
                    <label className="flex-1">Thanh toán khi nhận hàng</label>
                </div>
                <div className="flex items-center">
                    <div className="p-3">
                        <input type="radio" name="paymentMethod" value="transfer" checked={paymentMethod === "transfer"} onChange={handleChangePaymentMethod} />
                    </div>
                    <label className="flex-1">Trả trước thông qua chuyển khoản trực tuyến</label>
                </div>
            </div >
            <div className="my-3 mx-auto max-w-fit">
                <button className="bg-blue-500 px-3 py-2 font-bold text-white hover:shadow-md" onClick={onSubmitPaymentMethod}>Tiếp tục</button>
            </div>
        </>
    );
}