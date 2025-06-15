export default function UpdateOrderPage() {
    return (
        <div className="p-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2">
                <div className="p-3 bg-white shadow-md">
                    <p className="text-center text-xl font-bold uppercase">thông tin đơn hàng #xxx</p>
                    <div className="mt-3 flex flex-col gap-3">
                        <div className="flex items-center">
                            <p className="basis-1/2 font-bold">Tên khách hàng</p>
                            <p className="basis-1/2">Nguyễn Văn A</p>
                        </div>
                        <div className="flex items-center">
                            <p className="basis-1/2 font-bold">Email</p>
                            <p className="basis-1/2">Nguyễn Văn A</p>
                        </div>
                        <div className="flex items-center">
                            <p className="basis-1/2 font-bold">Số điện thoại</p>
                            <p className="basis-1/2">Nguyễn Văn A</p>
                        </div>
                        <div className="flex items-center">
                            <p className="basis-1/2 font-bold">Địa chỉ</p>
                            <p className="basis-1/2">Đây là một địa chỉ rất da2iiiiiiiiiiiiiiiiii</p>
                        </div>
                        <div className="flex items-center">
                            <p className="basis-1/2 font-bold">Thời gian đặt hàng</p>
                            <p className="basis-1/2">15/06/2025 10:38:00</p>
                        </div>
                        <div className="flex items-center">
                            <p className="basis-1/2 font-bold">Trạng thái</p>
                            <p className="basis-1/2">PENDING</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 p-3 bg-white shadow-md">
                    cập nhật trạng thái
                </div>
                <div className="mt-3 p-3 bg-white shadow-md">
                    thông tin thanh toán
                </div>
            </div>
            <div className="max-h-fit bg-white p-3 shadow-md">
                chi tiết đơn hàng
            </div>
        </div>
    );
}