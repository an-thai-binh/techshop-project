
import { formatVietNamCurrency } from "@/utils/CurrentyFormat";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

interface ProductVariationItemProps {
    id: string;
    sku: string;
    basePrice: number;
    priceChange: number;
    imgUrl: string;
    quantity: number;
}

export default function ProductVariationItem({ id, sku, basePrice, priceChange, quantity, imgUrl }: ProductVariationItemProps) {
    return (
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
                <PencilSquareIcon className="text-gray-500 hover:text-green-600 size-9 mb-1 cursor-pointer" />
                <TrashIcon className="text-gray-500 hover:text-red-500 size-9 mt-1 cursor-pointer" />
            </div>
        </div>
    );
}