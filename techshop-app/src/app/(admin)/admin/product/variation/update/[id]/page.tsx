'use client'

import { EndpointAPI } from "@/api/EndpointAPI";
import AdminError from "@/component/admin/AdminError";
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import { Image } from "@/types/image";
import { Product } from "@/types/product";
import api from "@/utils/APIAxiosConfig";
import { formatVietNamCurrency } from "@/utils/AppFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProductVariationFull {
    id: string;
    product: Product;
    sku: string;
    variationPriceChange: number;
    image: Image;
    quantity: number;
}

const formSchema = z.object({
    variationPriceChange: z.coerce.number(),
    quantity: z.coerce.number().min(0, { message: "Số lượng tồn kho phải lớn hơn hoặc bằng 0" })
});

type FormData = z.infer<typeof formSchema>;

export default function UpdateProductVariationPage() {
    useEffect(() => {
        document.title = "Update Variation";
    })
    const token = useAppSelector(selectToken);
    const variationId = useParams().id;
    const [productVariation, setProductVariation] = useState<ProductVariationFull | null>(null);
    const [fetchErrorMessage, setFetchErrorMessage] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);
    // image attributes
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUpload, setImageUpload] = useState<boolean>(false);
    const [uploadUrl, setUploadUrl] = useState<string>("");
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [previewImg, setPreviewImg] = useState<string>("/image/default_img.png");
    const [imageError, setImageError] = useState<string>("");
    const [urlError, setUrlError] = useState<string>("");
    // submit data
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>(
        {
            resolver: zodResolver(formSchema),
            mode: "onChange"
        }
    )

    // message attributes
    const [success, setSuccess] = useState<boolean>(false);
    const [formErrorMessage, setFormErrorMessage] = useState<string>("");

    useEffect(() => {
        if (!token || !variationId) {
            return;
        }
        const fetchVariation = async () => {
            try {
                const response = await api.get(EndpointAPI.PRODUCT_VARIATION_GET_BY_ID + variationId + '/full');
                if (response.data.success) {
                    const variation: ProductVariationFull = response.data.data;
                    setProductVariation(variation);
                    reset({
                        variationPriceChange: variation.variationPriceChange,
                        quantity: variation.quantity
                    });
                    setUploadUrl(variation.image.imgUrl);
                    setPreviewImg(variation.image.imgUrl);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                setFetchErrorMessage(message);
                throw new Error(message);
            }
        }
        fetchVariation();
    }, [token, variationId, reload]);

    useEffect(() => {

    }, [productVariation])

    const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setImageUpload(event.target.value === "true" ? true : false);
    }

    const handleUploadUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUploadUrl(event.target.value);
    }

    const handleUploadImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setUploadFile(selectedFile);
        if (selectedFile) {
            setPreviewImg(URL.createObjectURL(selectedFile));
        }
    }

    const uploadImage = async () => {
        if (!uploadFile) {
            setImageError("Vui lòng tải file lên!");
            return;
        }
        const formData = new FormData();
        formData.append("file", uploadFile);
        try {
            const response = await api.post(EndpointAPI.IMAGE_CREATE_BY_FILE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                return response.data.data.id;
            }
            return;
        } catch (error: any) {
            const errorMessage = error.response?.data.message || error.message;
            setImageError("Lỗi khi tải ảnh lên: " + errorMessage);
            throw new Error("Error uploading image: " + errorMessage);
        }
    }

    const getExistsImageByUrl = async () => {
        if (uploadUrl.trim() === "") {
            setUrlError("Vui lòng nhập đường dẫn ảnh!");
            return;
        }
        try {
            const response = await api.get(EndpointAPI.IMAGE_GET_BY_URL, {
                params: {
                    url: uploadUrl
                }
            });
            if (response.data.success) {
                return response.data.data.id;
            }
            return;
        } catch (error: any) {
            const errorMessage = error.response.data?.message || error.message;
            setUrlError("Lỗi khi lấy ảnh: " + errorMessage);
            throw new Error("Error uploading image: " + errorMessage)
        }
    }

    const onSubmit = async (data: FormData) => {
        let imageId = imageUpload ? await uploadImage() : await getExistsImageByUrl();

        if (!imageId) {
            return;
        }

        try {
            const response = await api.patch(EndpointAPI.PRODUCT_VARIATION_PATCH + variationId, {}, {
                params: {
                    variationPriceChange: data.variationPriceChange,
                    quantity: data.quantity,
                    imageId: imageId
                }
            });
            if (response.data.success) {
                setSuccess(true);
                setReload(prev => !prev);
            }
        } catch (error: any) {
            setSuccess(false);
            setFormErrorMessage(error.response.data?.message || error.message);
        }
    }

    return (
        <>
            {fetchErrorMessage ? <AdminError message={fetchErrorMessage} />
                : productVariation &&
                <div className="flex h-screen flex-col">
                    <h3 className="my-3 text-center text-3xl font-bold uppercase">Cập nhật biến thể sản phẩm</h3>
                    <div className="mx-3 p-3 bg-white shadow-md">
                        {success ?
                            <div className="mb-2 py-1 px-2 bg-green-100 w-fit mx-auto rounded-sm">
                                <p className="text-center font-bold text-green-500">Cập nhật biến thể thành công</p>
                            </div>
                            :
                            formErrorMessage &&
                            <div className="mb-2 py-1 px-2 bg-red-100 w-fit mx-auto rounded-sm">
                                <p className="ext-center font-bold text-red-500">Lỗi khi cập nhật biến thể: {formErrorMessage}</p>
                            </div>}
                        <p><b>Tên sản phẩm:</b> {productVariation.product.productName}</p>
                        <p className="mt-3"><b>SKU:</b> {productVariation.sku}</p>
                        <p className="mt-3"><b>Giá gốc:</b> {formatVietNamCurrency(productVariation.product.productBasePrice)}</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3">
                            <div className="mt-3">
                                <p className=" font-bold">
                                    Thay đổi giá<span className="ms-1 text-red-500">*</span>
                                </p>
                                <input
                                    {...register("variationPriceChange")}
                                    className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
                                    placeholder="VD: -10000 (giảm 10.000đ) hoặc 10000 (tăng 10.000đ)"
                                />
                                {errors.variationPriceChange && <span className="text-sm font-medium text-red-500">{errors.variationPriceChange.message}</span>}
                            </div>
                            <div className="mt-3">
                                <p className=" font-bold">
                                    Số lượng tồn kho<span className="ms-1 text-red-500">*</span>
                                </p>
                                <input
                                    {...register("quantity")}
                                    className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
                                    placeholder="Nhập số lượng biến thể đang có trong kho..."
                                />
                                {errors.quantity && <span className="text-sm font-medium text-red-500">{errors.quantity.message}</span>}
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="font-bold">
                                Ảnh sản phẩm
                            </p>
                            <div className="flex justify-around lg:justify-center items-center">
                                <div className="flex justify-center items-center py-3 lg:me-3">
                                    <input type="radio" name="uploadType" value="false" onChange={handleTypeChange} checked={imageUpload === false} className="w-6 h-6" />
                                    <label className="ms-1 font-semibold">Sử dụng URL</label>
                                </div>
                                <div className="flex justify-center items-center py-3 lg:ms-3">
                                    <input type="radio" name="uploadType" value="true" onChange={handleTypeChange} checked={imageUpload === true} className="w-6 h-6" />
                                    <label className="ms-1 font-semibold">Tải File</label>
                                </div>
                            </div>
                            {imageUpload ?
                                <div className="flex flex-col justify-center items-center">
                                    <div onClick={() => { fileInputRef.current?.click() }} className="w-[300px] h-[300px] flex justify-center items-center bg-gray-200 rounded-lg border border-dashed border-gray-700 cursor-pointer">
                                        <input type="file" accept="image/*" onChange={handleUploadImageFile} ref={fileInputRef} className="hidden" />
                                        <img className="object-contain" src={previewImg} />
                                    </div>
                                    {!success && imageError && <p className="text-center text-sm font-medium text-red-500">{imageError}</p>}
                                </div>
                                :
                                <div>
                                    <input type="text" placeholder="Nhập đường dẫn ảnh đã tồn tại trong CSDL. VD: http://binhan.io.vn/img..." value={uploadUrl} onChange={handleUploadUrlChange} className="p-1 w-full min-h-[38] bg-white border border-[#cccccc] focus-visible:outline-[#2684FF] rounded-[4]" />
                                    {!success && urlError && <p className="text-center text-sm font-medium text-red-500">{urlError}</p>}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="m-3 max-w-fit mx-auto">
                        <button className="py-1 px-2 bg-yellow-400 hover:bg-yellow-500 font-semibold uppercase" onClick={handleSubmit(onSubmit)}>
                            Cập nhật
                        </button>
                    </div>
                </div>
            }
        </>
    );
} 