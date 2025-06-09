type OrderStageProps = {
    stage: number
}

export default function OrderStage({ stage }: OrderStageProps) {
    return (
        <>
            <div className="my-6 flex items-center">
                <div className={`lg:mb-10 flex-1 w-2 h-1 ${stage === 1 ? "bg-green-500" : "bg-gray-500"}`} />
                <div className="lg:w-[100px] flex flex-col justify-center items-center">
                    <div className={`w-10 h-10 flex justify-center items-center ${stage === 1 ? "bg-green-500" : "bg-gray-400"} rounded-full`}>
                        <p className="text-2xl text-white font-bold">1</p>
                    </div>
                    <p className="hidden lg:block h-12 text-center font-semibold">Nhập<br />thông tin</p>
                </div>
                <div className={`lg:mb-10 flex-1 w-2 h-1 ${stage === 2 ? "bg-green-500" : "bg-gray-500"}`} />
                <div className="lg:w-[100px] flex flex-col justify-center items-center">
                    <div className={`w-10 h-10 flex justify-center items-center ${stage === 2 ? "bg-green-500" : "bg-gray-400"} rounded-full`}>
                        <p className="text-2xl text-white font-bold">2</p>
                    </div>
                    <p className="hidden lg:block h-12 text-center font-semibold">Thanh toán</p>
                </div>
                <div className={`lg:mb-10 flex-1 w-2 h-1 ${stage === 3 ? "bg-green-500" : "bg-gray-500"}`} />
                <div className="lg:w-[100px] flex flex-col justify-center items-center">
                    <div className={`w-10 h-10 flex justify-center items-center ${stage === 3 ? "bg-green-500" : "bg-gray-400"} rounded-full`}>
                        <p className="text-2xl text-white font-bold">3</p>
                    </div>
                    <p className="hidden lg:block h-12 text-center font-semibold">Thành công</p>
                </div>
                <div className="lg:mb-10 flex-1 w-2 h-1 bg-gray-500" />
            </div >
        </>
    );
}