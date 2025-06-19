'use client'
import { formatVietNamCurrency } from "@/utils/AppFormatter";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState } from "react";
import ActionConfirmDialog from "./ActionConfirmDialog";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppSelector } from "@/shared/redux/hook";
import { selectToken } from "@/features/auth/authSelectors";
import Link from "next/link";
import api from "@/utils/APIAxiosConfig";
import { EndpointAPI } from "@/api/EndpointAPI";

interface ProductVariationItemProps {
    id: string;
    sku: string;
    basePrice: number;
    priceChange: number;
    imgUrl: string;
    quantity: number;
    onDeleteVariationSuccess: (id: string) => void
}

export default function ProductVariationItem({ id, sku, basePrice, priceChange, quantity, imgUrl, onDeleteVariationSuccess }: ProductVariationItemProps) {
    const token = useAppSelector(selectToken)
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

    const handleDeleteAction = async () => {
        setShowConfirmDialog(false);
        try {
            const response = await api.delete(EndpointAPI.PRODUCT_VARIATION_DELETE + id);
            if (response.data.success) {
                onDeleteVariationSuccess(id);
            }
        } catch (error: any) {
            const message = error.response?.data.message || error.message;
            toast.error("Error deleting variation: " + message);
            throw new Error(message);
        }
    }

    return (
        <>
            <div className="py-3 flex items-center">
                {/* <img className="w-[120px] h-[120px] object-fill rounded-lg" src={imgUrl} /> */}
                <Image src={imgUrl || "/image/default_img.png"} alt="product_variation" width={120} height={120} className="w-[120px] h-[120px] object-fill rounded-lg" />
                <div className="flex-1 pl-3">
                    <p>ID: <span className="font-semibold">{id}</span></p>
                    <p>Mã SKU: {sku}</p>
                    <p>Giá: <span className="font-semibold">{formatVietNamCurrency(basePrice + priceChange)}</span></p>
                    <p>Chênh lệch giá: <span className={"font-semibold" + " " + (priceChange < 0 ? "text-red-600" : "text-green-600")}>{formatVietNamCurrency(priceChange)}</span></p>
                    <p>Tồn kho: <span className="font-bold">{quantity}</span></p>
                </div>
                <div className="flex flex-col">
                    <Link href={`/admin/product/variation/update/${id}`}>
                        <PencilSquareIcon className="text-gray-500 hover:text-green-600 size-9 mb-1 cursor-pointer" />
                    </Link>
                    <TrashIcon className="text-gray-500 hover:text-red-500 size-9 mt-1 cursor-pointer" onClick={() => setShowConfirmDialog(true)} />
                </div>
            </div>
            <ActionConfirmDialog
                display={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleDeleteAction}
                description={`DELETE VARIATION ID = ${id}`}
            />
        </>
    );
}