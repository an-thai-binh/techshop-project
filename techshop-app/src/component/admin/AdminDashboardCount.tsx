'use client'
import { EndpointAPI } from "@/api/EndpointAPI";
import api from "@/utils/APIAxiosConfig";
import { InformationCircleIcon, RectangleGroupIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxIcon, CheckBadgeIcon, InboxArrowDownIcon, PhotoIcon, TruckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CountEntities {
    categoryCount: number,
    productCount: number,
    imageCount: number,
    pendingOrderCount: number,
    deliveringOrderCount: number,
    successOrderCount: number
}

export default function AdminDashboardCount() {
    const [countEntities, setCountEntities] = useState<CountEntities | null>(null);

    useEffect(() => {
        const fetchCountEntities = async () => {
            try {
                const response = await api.get(EndpointAPI.STATISTIC_COUNT_ENTITIES);
                if (response.data.success) {
                    setCountEntities(response.data.data);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                toast.error(message);
                throw new Error(message);
            }
        }
        fetchCountEntities();
    }, []);

    return (
        <>
            {countEntities ?
                <>
                    <Link href={"/admin/category"}>
                        <div className="w-full bg-amber-400 shadow-sm hover:shadow-lg cursor-pointer">
                            <div className="p-3 flex items-center">
                                <div className="basis-2/3">
                                    <p className="text-[60px] font-bold text-white">{countEntities.categoryCount}</p>
                                    <p className="font-bold text-white text-2xl">Thể loại</p>
                                </div>
                                <div className="basis-1/3">
                                    <RectangleGroupIcon className="text-amber-500 opacity-50" />
                                </div>
                            </div>
                            <div className="bg-amber-500 py-1">
                                <div className="flex justify-center items-center">
                                    <p className="text-white">Xem chi tiết</p>
                                    <InformationCircleIcon className="max-h-[20px] font-bold text-white" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href={"/admin/product"}>
                        <div className="w-full bg-cyan-400 shadow-sm hover:shadow-lg cursor-pointer">
                            <div className="p-3 flex items-center">
                                <div className="basis-2/3">
                                    <p className="text-[60px] font-bold text-white">{countEntities.productCount}</p>
                                    <p className="font-bold text-white text-2xl">Sản phẩm</p>
                                </div>
                                <div className="basis-1/3">
                                    <ArchiveBoxIcon className="text-cyan-500 opacity-50" />
                                </div>
                            </div>
                            <div className="bg-cyan-500 py-1">
                                <div className="flex justify-center items-center">
                                    <p className="text-white">Xem chi tiết</p>
                                    <InformationCircleIcon className="max-h-[20px] font-bold text-white" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href={"/admin/image"}>
                        <div className="w-full bg-red-400 shadow-sm hover:shadow-lg cursor-pointer">
                            <div className="p-3 flex items-center">
                                <div className="basis-2/3">
                                    <p className="text-[60px] font-bold text-white">{countEntities.imageCount}</p>
                                    <p className="font-bold text-white text-2xl">Hình ảnh</p>
                                </div>
                                <div className="basis-1/3">
                                    <PhotoIcon className="text-red-500 opacity-50" />
                                </div>
                            </div>
                            <div className="bg-red-500 py-1">
                                <div className="flex justify-center items-center">
                                    <p className="text-white">Xem chi tiết</p>
                                    <InformationCircleIcon className="max-h-[20px] font-bold text-white" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href={"/admin/order"}>
                        <div className="w-full bg-blue-400 shadow-sm hover:shadow-lg cursor-pointer">
                            <div className="p-3 flex items-center">
                                <div className="basis-2/3">
                                    <p className="text-[60px] font-bold text-white">{countEntities.pendingOrderCount}</p>
                                    <p className="font-bold text-white text-2xl">Đơn hàng cần chuẩn bị</p>
                                </div>
                                <div className="basis-1/3">
                                    <InboxArrowDownIcon className="text-blue-500 opacity-50" />
                                </div>
                            </div>
                            <div className="bg-blue-500 py-1">
                                <div className="flex justify-center items-center">
                                    <p className="text-white">Xem chi tiết</p>
                                    <InformationCircleIcon className="max-h-[20px] font-bold text-white" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href={"/admin/order"}>
                        <div className="w-full bg-cyan-600 shadow-sm hover:shadow-lg cursor-pointer">
                            <div className="p-3 flex items-center">
                                <div className="basis-2/3">
                                    <p className="text-[60px] font-bold text-white">{countEntities.deliveringOrderCount}</p>
                                    <p className="font-bold text-white text-2xl">Đơn hàng đang giao</p>
                                </div>
                                <div className="basis-1/3">
                                    <TruckIcon className="text-cyan-700 opacity-50" />
                                </div>
                            </div>
                            <div className="bg-cyan-700 py-1">
                                <div className="flex justify-center items-center">
                                    <p className="text-white">Xem chi tiết</p>
                                    <InformationCircleIcon className="max-h-[20px] font-bold text-white" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href={"/admin/order"}>
                        <div className="w-full bg-green-400 shadow-sm hover:shadow-lg cursor-pointer">
                            <div className="p-3 flex items-center">
                                <div className="basis-2/3">
                                    <p className="text-[60px] font-bold text-white">{countEntities.successOrderCount}</p>
                                    <p className="font-bold text-white text-2xl">Đơn hàng đã hoàn thành</p>
                                </div>
                                <div className="basis-1/3">
                                    <CheckBadgeIcon className="text-green-500 opacity-50" />
                                </div>
                            </div>
                            <div className="bg-green-500 py-1">
                                <div className="flex justify-center items-center">
                                    <p className="text-white">Xem chi tiết</p>
                                    <InformationCircleIcon className="max-h-[20px] font-bold text-white" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </>
                : <></>}
        </>
    )
}