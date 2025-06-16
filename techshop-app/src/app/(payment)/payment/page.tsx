'use client'

import Image from "next/image";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function PaymentStatusPage() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status");
    useEffect(() => {
        if (window.opener) {
            if (status === "success") {
                window.opener.postMessage({ status: "success" }, "*");
            } else {
                window.opener.postMessage({ status: "cancel" }, "*");
            }
        }
    }, [status])

    return (
        <>
            {status === "success" ?
                <div className="flex flex-col justify-center items-center h-screen">
                    <Image src="/image/payment_success.png" alt="success" width={300} height={300} className="mb-3 w-[150px] h-[150px]" />
                    <p className="text-2xl font-bold text-blue-700">Thanh toán thành công</p>
                </div>
                :
                <div className="flex flex-col justify-center items-center h-screen">
                    <Image src="/image/payment_error.png" alt="cancel" width={300} height={300} className="mb-3 w-[150px] h-[150px]" />
                    <p className="text-2xl font-bold text-red-700">Thanh toán thất bại</p>
                </div>
            }
        </>
    );
}