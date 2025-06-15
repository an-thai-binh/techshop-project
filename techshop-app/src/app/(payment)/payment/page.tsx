'use client'

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
                <div>
                    <p className="text-2xl font-bold">Thanh toán thành công</p>
                </div>
                :
                <div>
                    <p className="text-2xl font-bold">Thanh toán thất bại</p>
                </div>
            }
        </>
    );
}