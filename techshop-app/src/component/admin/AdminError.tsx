import Image from "next/image";

type AdminErrorProps = {
    message: string | null;
}

export default function AdminError({ message }: AdminErrorProps) {
    return (
        <div className="p-3 flex flex-col justify-center items-center">
            <p className="text-xl font-bold text-red-600">Đã có lỗi xảy ra trong quá trình thực hiện thao tác</p>
            <p>Vui lòng kiểm tra trong cửa sổ console và thử lại</p>
            <Image src={"/image/admin_error.png"} alt="error" width={500} height={500} />
        </div>
    );
}