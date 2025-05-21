
import { formatVietNamCurrency } from "@/utils/CurrentyFormat";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

interface ProductVariationItemProps {
    id: string;
    sku: string;
    basePrice: number;
    priceChange: number;
    imgUrl: string;
}

export default function ProductVariationItem({ id, sku, basePrice, priceChange, imgUrl }: ProductVariationItemProps) {
    return (
        <div className="py-3 flex items-center">
            <img className="w-[120] h-[120] object-fill rounded-lg" src={imgUrl} />
            <div className="flex-1 pl-3">
                <p>ID: <span className="font-semibold">{id}</span></p>
                <p>Mã SKU: {sku}</p>
                <p>Giá: <span className="font-medium">{formatVietNamCurrency(basePrice + priceChange)}</span></p>
                <p>Chênh lệch giá: <span className={"font-medium" + " " + (priceChange < 0 ? "text-red-600" : "text-green-600")}>{formatVietNamCurrency(priceChange)}</span></p>
            </div>
            <div className="flex flex-col">
                <PencilSquareIcon className="text-gray-500 hover:text-green-600 size-9 mb-1 cursor-pointer" />
                <TrashIcon className="text-gray-500 hover:text-red-500 size-9 mt-1 cursor-pointer" />
            </div>
        </div>
    );
}