'use client'
import { useState } from "react";
import OrderInformation from "../../../features/createOrder/components/OrderInformation";
import OrderPayment from "../../../features/createOrder/components/OrderPayment";
import OrderSuccess from "@/features/createOrder/components/OrderSuccess";
import toast from "react-hot-toast";
import OrderError from "@/features/createOrder/components/OrderError";

export default function OrderPage() {
  const [stage, setStage] = useState<number>(1);

  // đang ở 0 thì không được làm gì cả -> quay về trang chủ sau 5s
  // đang ở 1 thì không được chuyển sang 2, 3
  // đang ở 2 thì không được chuyển sang 3
  // đang ở 3 thì không được chuyển sang 1, 2
  // => chỉ có stage 2 được phép quay về stage 1
  const returnInformationStage = () => {
    if (stage !== 2) {
      return;
    }
    setStage(1);
    toast.success("Đã về 1", {
      className: "mt-[50px] lg:mt-[75px] font-bold",
      duration: 2000
    });
  }

  return (
    <div className="mx-auto max-w-90% lg:max-w-[70%]">
      <div>
        <div className="my-6 flex items-center">
          <div className={`lg:mb-10 flex-1 w-2 h-1 ${stage >= 1 ? "bg-blue-500" : "bg-gray-500"}`} />
          <div className={`lg:w-[100px] flex flex-col justify-center items-center ${stage === 2 ? "cursor-pointer" : ""}`} onClick={() => returnInformationStage()}>
            <div className={`w-10 h-10 flex justify-center items-center ${stage >= 1 ? "bg-blue-500" : "bg-gray-400"} rounded-full`}>
              <p className="text-2xl text-white font-bold">1</p>
            </div>
            <p className="hidden lg:block h-12 text-center font-semibold">Nhập<br />thông tin</p>
          </div>
          <div className={`lg:mb-10 flex-1 w-2 h-1 ${stage >= 2 ? "bg-blue-500" : "bg-gray-500"}`} />
          <div className={`lg:w-[100px] flex flex-col justify-center items-center`}>
            <div className={`w-10 h-10 flex justify-center items-center ${stage >= 2 ? "bg-blue-500" : "bg-gray-400"} rounded-full`}>
              <p className="text-2xl text-white font-bold">2</p>
            </div>
            <p className="hidden lg:block h-12 text-center font-semibold">Thanh toán</p>
          </div>
          <div className={`lg:mb-10 flex-1 w-2 h-1 ${stage === 3 ? "bg-blue-500" : "bg-gray-500"}`} />
          <div className={`lg:w-[100px] flex flex-col justify-center items-center`}>
            <div className={`w-10 h-10 flex justify-center items-center ${stage === 3 ? "bg-blue-500" : "bg-gray-400"} rounded-full`}>
              <p className="text-2xl text-white font-bold">3</p>
            </div>
            <p className="hidden lg:block h-12 text-center font-semibold">Thành công</p>
          </div>
          <div className="lg:mb-10 flex-1 w-2 h-1 bg-gray-500" />
        </div >
      </div>
      {stage === 0 && <OrderError />}
      {stage === 1 && <OrderInformation setStage={setStage} />}
      {stage === 2 && <OrderPayment setStage={setStage} />}
      {stage === 3 && <OrderSuccess />}
    </div>
  );
}