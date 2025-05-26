'use client'
import axios from "axios";
import CategoryComboBox from "./CategoryComboBox";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/shared/redux/hook";
import { selectToken } from "@/features/auth/authSelectors";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";

const formSchema = z.object({
    categoryId: z.coerce.string(),
    productName: z.string().min(1, { message: "Tên sản phẩm không được để trống" }),
    productDescription: z.string(),
    productBasePrice: z.coerce.number().min(0, { message: "Giá sản phẩm phải lớn hơn hoặc bằng 0" })
});

type UpdateProductFormProps = {
    id: string;
    categoryId: string;
    productName: string;
    productDescription: string;
    productBasePrice: number;
    imgUrl: string;
};

type FormData = z.infer<typeof formSchema>;

export default function UpdateProductForm({ id: productId, productName, categoryId, productDescription, productBasePrice, imgUrl }: UpdateProductFormProps) {
    const token = useAppSelector(selectToken);
    const params = useParams();
    const id = params.id;
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormData>(
        {
            resolver: zodResolver(formSchema),
            mode: "onChange",
            defaultValues: {
                categoryId: categoryId,
                productName: productName,
                productDescription: productDescription,
                productBasePrice: productBasePrice
            }
        }
    );

    // image attributes
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUpload, setImageUpload] = useState<boolean>(false);
    const [uploadUrl, setUploadUrl] = useState<string>(imgUrl);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [previewImg, setPreviewImg] = useState<string>("/image/default_img.png");

    // error attributes
    const [imageError, setImageError] = useState<string>("");
    const [urlError, setUrlError] = useState<string>("");
    const [formError, setFormError] = useState<string>("");

    // message attributes
    const [success, setSuccess] = useState<boolean>(false);

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

    const handleAddProductWithImage = async () => {
        if (!uploadFile) {
            setImageError("Vui lòng tải file lên!");
            return;
        }
        const formData = new FormData();
        formData.append("file", uploadFile);
        try {
            const response = await axios.post("http://localhost:8080/techshop/image/file", formData, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                return response.data.data.id;
            }
            return;
        } catch (error: any) {
            const errorMessage = error.response.data?.message || error.message;
            console.error("Error uploading image: ", errorMessage);
            setImageError("Lỗi khi tải ảnh lên: " + errorMessage);
        }
    }

    const handleAddProductWithUrl = async () => {
        if (uploadUrl.trim() === "") {
            setUrlError("Vui lòng nhập đường dẫn ảnh!");
            return;
        }
        try {
            const response = await axios.get("http://localhost:8080/techshop/image/showByUrl", {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    url: uploadUrl
                },
            });
            if (response.data.success) {
                return response.data.data.id;
            }
            return;
        } catch (error: any) {
            const errorMessage = error.response.data?.message || error.message;
            console.error("Error uploading image: ", errorMessage);
            setUrlError("Lỗi khi lấy ảnh: " + errorMessage);
            return;
        }
    }

    const onSubmit = async (data: FormData) => {
        let imageId = imageUpload ? await handleAddProductWithImage() : await handleAddProductWithUrl();

        if (!imageId) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/techshop/product/storeWithImage", data, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    imageId: imageId
                }
            });

            if (response.data.success) {
                setSuccess(true);
            }
        } catch (error: any) {
            setSuccess(false);
            setFormError(error.response.data?.message || error.message);
        }
    }

    return (
        <>
            <div className="grid grid-cols-1">
                {success ?
                    <div className="mt-3 py-1 px-2 bg-green-100 w-fit mx-auto rounded-sm">
                        <p className="text-center font-bold text-green-500">Thêm sản phẩm thành công</p>
                    </div>
                    :
                    formError &&
                    <div className="mt-3 py-1 px-2 bg-red-100 w-fit mx-auto rounded-sm">
                        <p className="ext-center font-bold text-red-500">Lỗi khi thêm sản phẩm: {formError}</p>
                    </div>}
                <div className="m-3">
                    <p className="font-bold">
                        Tên sản phẩm<span className="ms-1 text-red-500">*</span>
                    </p>
                    <input
                        {...register("productName")}
                        className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
                        placeholder="VD: iPhone..."
                    />
                    {errors.productName && <span className="text-sm font-medium text-red-500">{errors.productName.message}</span>}
                </div>
                <div className="m-3">
                    <p className="font-bold">
                        Mô tả
                    </p>
                    <input
                        {...register("productDescription")}
                        type="text"
                        className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
                    />
                    {errors.productDescription && <span className="text-sm font-medium text-red-500">{errors.productDescription.message}</span>}
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="m-3">
                    <p className="font-bold">
                        Danh mục<span className="ms-1 text-red-500">*</span>
                    </p>
                    <Controller
                        name="categoryId"
                        control={control}
                        render={({ field }) => (
                            <CategoryComboBox
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.categoryId && <span className="text-sm font-medium text-red-500">{errors.categoryId.message}</span>}
                </div>
                <div className="m-3">
                    <p className="font-bold">
                        Giá<span className="ms-1 text-red-500">*</span>
                    </p>
                    <input
                        {...register("productBasePrice")}
                        type="number"
                        className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
                    />
                    {errors.productBasePrice && <span className="text-sm font-medium text-red-500">{errors.productBasePrice.message}</span>}
                </div>
            </div>
            <div className="grid grid-cols-1">
                <div className="m-3">
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
                            <input type="text" placeholder="Nhập đường dẫn ảnh đã tồn tại trong CSDL. VD: http://binhan.io.vn/img..." onChange={handleUploadUrlChange} value={imgUrl} className="p-1 w-full min-h-[38] bg-white border border-[#cccccc] focus-visible:outline-[#2684FF] rounded-[4]" />
                            {!success && urlError && <p className="text-center text-sm font-medium text-red-500">{urlError}</p>}
                        </div>
                    }
                </div>
            </div>
            <div className="flex justify-center">
                <button className="mb-3 bg-yellow-300 px-3 py-1 font-semibold uppercase shadow-lg hover:bg-yellow-400 hover:shadow-sm" onClick={handleSubmit(onSubmit)}>
                    Cập nhật
                </button>
            </div>
        </>
    );
}