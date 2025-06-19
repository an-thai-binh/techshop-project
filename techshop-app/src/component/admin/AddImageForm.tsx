'use client'
import { EndpointAPI } from "@/api/EndpointAPI";
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import { Image } from "@/types/image";
import api from "@/utils/APIAxiosConfig";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function AddImageForm() {
    const token = useAppSelector(selectToken);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [previewImg, setPreviewImg] = useState<string>("/image/default_img.png");
    const [image, setImage] = useState<Image | null>(null);

    const handleUploadImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setUploadFile(selectedFile);
        if (selectedFile) {
            setPreviewImg(URL.createObjectURL(selectedFile));
        }
    }

    const uploadImage = async () => {
        if (!uploadFile) {
            toast.error("Vui lòng tải file lên");
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
                setImage(response.data.data);
            }
            return;
        } catch (error: any) {
            const errorMessage = error.response?.data.message || error.message;
            toast.error("Lỗi khi tải ảnh lên: " + errorMessage);
            throw new Error("Error uploading image: " + errorMessage);
        }
    }

    return (
        <>
            <div className="mx-3 bg-white shadow-sm">
                <p className="mt-3 text-center font-semibold text-xl">Click vào ô bên dưới để tải file từ máy tính...</p>
                <div className="p-3 flex justify-center items-center">
                    <div onClick={() => { fileInputRef.current?.click() }} className="w-[400px] h-[400px] flex justify-center items-center bg-gray-200 rounded-lg border border-dashed border-gray-700 cursor-pointer">
                        <input type="file" accept="image/*" onChange={handleUploadImageFile} ref={fileInputRef} className="hidden" />
                        <img className="object-contain" src={previewImg} />
                    </div>
                </div>
                {image &&
                    <div className="flex flex-col justify-center items-center">
                        <p className="px-2 py-1 text-center max-w-fit bg-green-200 font-semibold text-green-500">Tải ảnh thành công</p>
                        <div className="flex">
                            <b>Đường dẫn:</b>
                            <a href={image.imgUrl} className="ms-1 mb-3 max-w-96 truncate">{image.imgUrl}</a>
                        </div>
                    </div>}
                <div className="flex justify-center items-center mb-3">
                    <button onClick={uploadImage} className="py-1 px-2 bg-yellow-400 hover:bg-yellow-500 font-semibold uppercase">Thêm</button>
                </div>
            </div>
        </>
    );
}