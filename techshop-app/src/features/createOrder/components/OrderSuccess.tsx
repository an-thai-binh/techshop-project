import Image from "next/image";

export default function OrderSuccess() {
    return (
        <div className="flex flex-col justify-center items-center">
            <Image src="/image/success.png" alt="success" width={300} height={300} className="w-[100] h-[100]" />
            <p className="mt-3 text-lg">Đặt hàng thành công. Bộ phận kinh doanh sẽ sớm liên hệ để xác nhận với bạn</p>
            <p className="text-lg">Bạn có thể kiểm tra lại thông tin đặt hàng trong email: </p>
        </div>
    )
}