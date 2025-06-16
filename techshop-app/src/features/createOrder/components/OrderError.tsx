import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderError() {
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
            <Image src="/image/order_error.png" alt="success" width={300} height={300} className="w-[300] h-[300]" />

            <p className="mt-3 text-xl font-bold text-center text-red-500 uppercase">CÓ LỖI XẢY RA</p>
            <p className="text-lg font-medium text-center">Vui lòng thực hiện lại thao tác</p>
            <p className="mt-3 text-lg font-medium text-center">Quay về trong <b>{seconds}</b> giây...</p>
        </div>
    )
}