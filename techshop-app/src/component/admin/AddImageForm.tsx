'use client'
import { ChangeEvent, useRef, useState } from "react";

export default function AddImageForm() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUpload, setImageUpload] = useState<boolean>(false);
    const [uploadUrl, setUploadUrl] = useState<string>("");
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [previewImg, setPreviewImg] = useState<string>("https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon.png");

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

    const handleAddImage = () => {
        // TO-DO
    }

    return (
        <>
            <div className="mx-3 bg-white shadow-sm">
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
            </div>
            <div className="m-3 bg-white shadow-sm">
                {imageUpload ?
                    <div className="p-3 flex justify-center items-center">
                        <div onClick={() => { fileInputRef.current?.click() }} className="w-[400px] h-[400px] flex justify-center items-center bg-gray-200 rounded-lg border border-dashed border-gray-700 cursor-pointer">
                            <input type="file" accept="image/*" onChange={handleUploadImageFile} ref={fileInputRef} className="hidden" />
                            <img className="object-contain" src={previewImg} />
                        </div>
                    </div>
                    :
                    <div className="p-3">
                        <input type="text" placeholder="Nhập đường dẫn ảnh. VD: http://binhan.io.vn/img..." onChange={handleUploadUrlChange} className="p-1 w-full min-h-[38] bg-white border border-[#cccccc] focus-visible:outline-[#2684FF] rounded-[4]" />
                    </div>}
                <div className="flex justify-center items-center mb-3">
                    <button onClick={handleAddImage} className="py-1 px-2 bg-yellow-400 hover:bg-yellow-500 font-semibold uppercase">Thêm</button>
                </div>
            </div>
        </>
    );
}