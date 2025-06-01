'use client'

import AdminError from "@/component/admin/AdminError";
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import { Image } from "@/types/image";
import { Product } from "@/types/product";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

interface ProductVariationFull {
    id: string;
    product: Product;
    sku: string;
    variationPriceChange: number;
    image: Image;
    quantity: number;
}

export default function UpdateProductVariationPage() {
    useEffect(() => {
        document.title = "Update Variation";
    })
    const token = useAppSelector(selectToken);
    const variationId = useParams().id;
    const [productVariation, setProductVariation] = useState<ProductVariationFull | null>(null);
    const [fetchErrorMessage, setFetchErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!token || !variationId) {
            return;
        }
        const fetchVariation = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/techshop/productVariation/${variationId}/full`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (response.data.success) {
                    setProductVariation(response.data.data);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                setFetchErrorMessage(message);
                throw new Error(message);
            }
        }
        fetchVariation();
    }, [token, variationId]);

    return (
        <>
            {fetchErrorMessage ? <AdminError message={fetchErrorMessage} />
                : productVariation &&
                <div>

                </div>
            }
        </>
    );
} 