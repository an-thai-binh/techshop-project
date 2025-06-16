import { useAppSelector } from "@/shared/redux/hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { selectOrderInformation } from "../createOrderSelectors";

export default function OrderSuccess() {
    const { orderEmail } = useAppSelector(selectOrderInformation);
    const [seconds, setSeconds] = useState<number>(5);
    const router = useRouter();

    useEffect(() => {
        if (seconds <= 0) {
            router.push("/");
            return;
        }
        const timer = setTimeout(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [seconds])

    return (
        <div className="flex flex-col justify-center items-center">
            <Image src="/image/order_success.png" alt="success" width={300} height={300} className="w-[300] h-[300]" />

            <p className="mt-3 text-xl font-bold text-center text-blue-500 uppercase">Đặt hàng thành công</p>
            <p className="text-lg font-medium text-center">Nhân viên sẽ sớm liên hệ cho bạn để xác nhận lại</p>
            <p className="text-lg font-medium text-center">Bạn có thể kiểm tra lại thông tin đơn hàng trong email: {orderEmail}</p>
            <p className="mt-3 text-lg font-medium text-center">Quay về trong <b>{seconds}</b> giây...</p>
        </div>
    )
}