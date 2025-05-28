'use client'

import AdminError from "@/component/admin/AdminError";
import ChoiceComboBox from "@/component/admin/ChoiceComboBox";
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import { Choice, Product } from "@/types/product";
import { formatVietNamCurrency } from "@/utils/CurrentyFormat";
import axios from "axios";
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function AddProductVariationPage() {
    // base
    const id = useParams().id;
    const token = useAppSelector(selectToken);
    const [product, setProduct] = useState<Product | null>(null);
    const [choices, setChoices] = useState<Choice[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    // element
    const addButtonRef = useRef<HTMLDivElement>(null);
    const addFormRef = useRef<HTMLDivElement>(null);
    const inputAddFormRef = useRef<HTMLInputElement>(null);
    // image attributes
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUpload, setImageUpload] = useState<boolean>(false);
    const [uploadUrl, setUploadUrl] = useState<string>("");
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [previewImg, setPreviewImg] = useState<string>("/image/default_img.png");
    const [imageError, setImageError] = useState<string>("");
    const [urlError, setUrlError] = useState<string>("");
    // submit data
    const [variationPriceChange, setVariationPriceChange] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [selectedChoiceValues, setSelectedChoiceValues] = useState<string[]>([]);
    // message attributes
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (!id || !token) {
            return;
        }
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/techshop/product/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if (response.data.success) {
                    setProduct(response.data.data);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                setErrorMessage(message);
                throw new Error("Error fetching product: " + message);
            }
        };
        fetchProduct();
    }, [id, token]);

    useEffect(() => {
        if (!id || !token) {
            return;
        }
        const fetchChoices = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/techshop/choice/getByProduct?productId=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if (response.data.success) {
                    setChoices(response.data.data);
                    setSelectedChoiceValues(choices.map(() => ""));
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                throw new Error("Error fetching choices: " + message);
            }
        };
        fetchChoices();
    }, [id, token]);

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

    const handleDisplayAddChoiceForm = () => {
        addButtonRef.current?.classList.add("hidden");
        addFormRef.current?.classList.remove("hidden");
        inputAddFormRef.current?.focus();
    }

    const handleHideAddChoiceForm = () => {
        if (inputAddFormRef.current?.value.trim() === "") {
            addButtonRef.current?.classList.remove("hidden");
            addFormRef.current?.classList.add("hidden");
        }
    }

    const handleAddChoice = async () => {
        if (inputAddFormRef.current?.value.trim() === "") {
            return;
        }
        const newChoice = {
            productId: id,
            choiceName: inputAddFormRef.current?.value.trim()
        }
        try {
            const response = await axios.post("http://localhost:8080/techshop/choice", newChoice, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.data.success) {
                const latestAddedChoice = {
                    id: response.data.data.id,
                    productId: response.data.data.productId,
                    choiceName: response.data.data.choiceName,
                    choiceValueList: []
                }
                console.log(latestAddedChoice);
                setChoices(prev => [...prev, latestAddedChoice]);
            }
        } catch (error: any) {
            const message = error.response?.data.message || error.message;
            throw new Error('Error insert new choice: ' + message);
        }
    }

    const handleSelectChoiceValue = (index: number, value: string) => {
        setSelectedChoiceValues(prev => {
            const current = [...prev];
            current[index] = value;
            return current;
        });
    }

    const uploadImage = async () => {
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
            setUrlError("Lỗi khi lấy ảnh: " + errorMessage);
            throw new Error("Error uploading image: " + errorMessage)
        }
    }

    const onSubmit = async () => {
        let imageId = imageUpload ? await uploadImage() : await getExistsImageByUrl();

        if (!imageId) {
            return;
        }

        if (selectedChoiceValues.find(value => value === "")) {
            return;
        }

        const data = {
            productId: id,
            variationPriceChange: variationPriceChange,
            imageId: imageId,
            quantity: quantity,
            choiceValueIds: selectedChoiceValues
        }

        try {
            const response = await axios.post("http://localhost:8080/techshop/productVariation/storeWithValues", data, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            });
            if (response.data.success) {
                setSuccess(true);
            }
        } catch (error: any) {
            setSuccess(false);
            // setFormError(error.response.data?.message || error.message);
            throw new Error(error.response?.data.message || error.message);
        }
    }

    return (
        <>
            {errorMessage ? <AdminError message={errorMessage} />
                : product &&
                <div className="flex h-screen flex-col">
                    <h3 className="my-3 text-center text-3xl font-bold uppercase">Thêm biến thể sản phẩm</h3>
                    <div className="mx-3 p-3 bg-white shadow-md">
                        <p><b>Tên sản phẩm:</b> {product.productName}</p>
                        <p className="mt-3"><b>Giá gốc:</b> {formatVietNamCurrency(product.productBasePrice)}</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3">
                            <div className="mt-3">
                                <p className=" font-bold">
                                    Thay đổi giá<span className="ms-1 text-red-500">*</span>
                                </p>
                                <input
                                    type="number"
                                    value={variationPriceChange}
                                    onChange={(e) => setVariationPriceChange(e.target.value)}
                                    className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
                                    placeholder="VD: -10000 (giảm 10.000đ) hoặc 10000 (tăng 10.000đ)"
                                />

                            </div>
                            <div className="mt-3">
                                <p className=" font-bold">
                                    Số lượng tồn kho<span className="ms-1 text-red-500">*</span>
                                </p>
                                <input
                                    type="number"
                                    min={0}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
                                    placeholder="Nhập số lượng biến thể đang có trong kho..."
                                />
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
                                    <input type="text" placeholder="Nhập đường dẫn ảnh đã tồn tại trong CSDL. VD: http://binhan.io.vn/img..." onChange={handleUploadUrlChange} className="p-1 w-full min-h-[38] bg-white border border-[#cccccc] focus-visible:outline-[#2684FF] rounded-[4]" />
                                    {!success && urlError && <p className="text-center text-sm font-medium text-red-500">{urlError}</p>}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div className="flex-1 h-[2px] mx-3 bg-gray-700" />
                        <p className="font-bold">Lựa chọn</p>
                        <div className="flex-1 h-[2px] mx-3 bg-gray-700" />
                    </div>
                    {choices.map((choice, index) => {
                        return (
                            <div className="m-3 bg-white shadow-md" key={index}>
                                <div className="p-3 flex items-center">
                                    <p className="basis-1/5 text-center font-bold">{choice.choiceName}</p>
                                    <div className="basis-4/5">
                                        <ChoiceComboBox choiceId={choice.id} choiceValueList={choice.choiceValueList} onChange={(value) => handleSelectChoiceValue(index, value)} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={addButtonRef} className="m-3 max-w-fit mx-auto">
                        <button className="p-3 font-semibold bg-yellow-300 hover:bg-yellow-400" onClick={handleDisplayAddChoiceForm}>
                            Thêm lựa chọn
                        </button>
                    </div>
                    <div ref={addFormRef} className="m-3 p-3 max-w-fit mx-auto bg-white shadow-md hidden">
                        <input ref={inputAddFormRef} type="text" className="h-[30px] rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]" placeholder="Nhập lựa chọn mới..." onBlur={handleHideAddChoiceForm} />
                        <button className="ms-2 px-2 h-[30px] font-semibold bg-yellow-300 hover:bg-yellow-400" onClick={handleAddChoice}>
                            Thêm
                        </button>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div className="flex-1 h-[2px] mx-3 bg-gray-700" />
                    </div>
                    <div className="m-3 max-w-fit mx-auto">
                        <button className="p-3 font-semibold bg-green-300 hover:bg-green-400 rounded-lg" onClick={onSubmit}>
                            Thêm biến thể
                        </button>
                    </div>
                </div>
            }
        </>
    );
}