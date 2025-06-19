'use client'

import { EndpointAPI } from "@/api/EndpointAPI";
import ActionConfirmDialog from "@/component/admin/ActionConfirmDialog";
import AdminError from "@/component/admin/AdminError";
import ChoiceComboBox from "@/component/admin/ChoiceComboBox";
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import { Choice, Product } from "@/types/product";
import api from "@/utils/APIAxiosConfig";
import { formatVietNamCurrency } from "@/utils/AppFormatter";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
    variationPriceChange: z.coerce.number(),
    quantity: z.coerce.number().min(0, { message: "Số lượng tồn kho phải lớn hơn hoặc bằng 0" })
});

type FormData = z.infer<typeof formSchema>;

export default function AddProductVariationPage() {
    useEffect(() => {
        document.title = "Add Variation"
    });
    // base
    const id = useParams().id;
    const token = useAppSelector(selectToken);
    const [product, setProduct] = useState<Product | null>(null);
    const [choices, setChoices] = useState<Choice[]>([]);
    const [fetchingErrorMessage, setFetchingErrorMessage] = useState<string | null>(null);
    const [showAddChoiceDialog, setShowAddChoiceDialog] = useState<boolean>(false);
    const [showDeleteChoiceDialog, setShowDeleteChoiceDialog] = useState<boolean>(false);
    const [choiceId, setChoiceId] = useState<string>("");
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
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>(
        {
            resolver: zodResolver(formSchema),
            mode: "onChange",
            defaultValues: {
                quantity: 0
            }
        }
    )
    const [selectedChoiceValues, setSelectedChoiceValues] = useState<string[]>([]);
    // message attributes
    const [choiceErrorMessage, setChoiceErrorMessage] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [formErrorMessage, setFormErrorMessage] = useState<string>("");

    useEffect(() => {
        if (!id || !token) {
            return;
        }
        const fetchData = async () => {
            try {
                const response = await api.get(EndpointAPI.PRODUCT_GET_BY_ID + id);
                if (response.data.success) {
                    setProduct(response.data.data);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                setFetchingErrorMessage(message);
                throw new Error("Error fetching product: " + message);
            }
            try {
                const response = await api.get(EndpointAPI.CHOICE_GET_BY_PRODUCT, {
                    params: {
                        productId: id
                    }
                });
                if (response.data.success) {
                    const choicesData = response.data.data;
                    setChoices(choicesData);
                    setSelectedChoiceValues(choicesData.map(() => ""));
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                throw new Error("Error fetching choices: " + message);
            }
            try {
                const response = await api.get(EndpointAPI.IMAGE_GET_BY_PRODUCT, {
                    params: {
                        productId: id
                    }
                })
                if (response.data.success) {
                    const imgUrl = response.data.data.imgUrl;
                    setUploadUrl(imgUrl);
                    setPreviewImg(imgUrl);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                throw new Error("Error fetching image: " + message);
            }
        };
        fetchData();
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
        setShowAddChoiceDialog(false);
        if (inputAddFormRef.current?.value.trim() === "") {
            return;
        }
        const newChoice = {
            productId: id,
            choiceName: inputAddFormRef.current?.value.trim()
        }
        try {
            const response = await api.post(EndpointAPI.CHOICE_CREATE, newChoice);
            if (response.data.success) {
                const latestAddedChoice = {
                    id: response.data.data.id,
                    productId: response.data.data.productId,
                    choiceName: response.data.data.choiceName,
                    choiceValueList: []
                }
                setChoices(prev => [...prev, latestAddedChoice]);
            }
        } catch (error: any) {
            const message = error.response?.data.message || error.message;
            throw new Error('Error insert new choice: ' + message);
        }
    }

    const handleOnClickDeleteChoiceButton = (choiceId: string) => {
        setChoiceId(choiceId);
        setShowDeleteChoiceDialog(true);
    }

    const handleDeleteChoice = async () => {
        setShowDeleteChoiceDialog(false);
        try {
            const response = await api.delete(EndpointAPI.CHOICE_DELETE, {
                params: {
                    choiceId: choiceId,
                    productId: id
                }
            })
            if (response.data.success) {
                setChoices(prev => prev.filter(choice => choice.id !== choiceId));
            }
        } catch (error: any) {
            const message = error.response?.data.message || error.message;
            toast.error("Error deleting choice: " + message);
            throw new Error(message);
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

        if (selectedChoiceValues.includes("")) {
            setChoiceErrorMessage("Vui lòng chọn giá trị cho tất cả lựa chọn!");
            return;
        }

        const requestData = {
            productId: id,
            variationPriceChange: data.variationPriceChange,
            imageId: imageId,
            quantity: data.quantity,
            choiceValueIds: selectedChoiceValues
        }

        try {
            const response = await api.post(EndpointAPI.PRODUCT_VARIATION_CREATE_WITH_VALUES, requestData);
            if (response.data.success) {
                setSuccess(true);
            }
        } catch (error: any) {
            setSuccess(false);
            setFormErrorMessage(error.response.data?.message || error.message);
            throw new Error(error.response?.data.message || error.message);
        }
    }

    return (
        <>
            {fetchingErrorMessage ? <AdminError message={fetchingErrorMessage} />
                : product &&
                <>
                    <div className="flex h-screen flex-col">
                        <h3 className="my-3 text-center text-3xl font-bold uppercase">Thêm biến thể sản phẩm</h3>
                        <div className="mx-3 p-3 bg-white shadow-md">
                            {success ?
                                <div className="mb-2 py-1 px-2 bg-green-100 w-fit mx-auto rounded-sm">
                                    <p className="text-center font-bold text-green-500">Thêm biến thể thành công</p>
                                </div>
                                :
                                formErrorMessage &&
                                <div className="mb-2 py-1 px-2 bg-red-100 w-fit mx-auto rounded-sm">
                                    <p className="ext-center font-bold text-red-500">Lỗi khi thêm biến thể: {formErrorMessage}</p>
                                </div>}
                            <p><b>Tên sản phẩm:</b> {product.productName}</p>
                            <p className="mt-3"><b>Giá gốc:</b> {formatVietNamCurrency(product.productBasePrice)}</p>
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
                        <div className="mt-3 flex justify-between items-center">
                            <div className="flex-1 h-[2px] mx-3 bg-gray-700" />
                            <p className="font-bold">Lựa chọn</p>
                            <div className="flex-1 h-[2px] mx-3 bg-gray-700" />
                        </div>
                        <span className="text-center font-bold text-red-500">{choiceErrorMessage}</span>
                        {choices.map((choice, index) => {
                            return (
                                <div className="m-3 bg-white shadow-md" key={index}>
                                    <div className="py-3 ps-3 flex items-center">
                                        <p className="w-64 text-center font-bold">{choice.choiceName}</p>
                                        <div className="flex-1">
                                            <ChoiceComboBox choiceId={choice.id} choiceValueList={choice.choiceValueList} onChange={(value) => handleSelectChoiceValue(index, value)} />
                                        </div>
                                        <XMarkIcon onClick={() => handleOnClickDeleteChoiceButton(choice.id)} className="w-8 text-center text-gray-400 hover:text-red-500 cursor-pointer" />
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
                            <button className="ms-2 px-2 h-[30px] font-semibold bg-yellow-300 hover:bg-yellow-400" onClick={() => setShowAddChoiceDialog(true)}>
                                Thêm
                            </button>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                            <div className="flex-1 h-[2px] mx-3 bg-gray-700" />
                        </div>
                        <div className="m-3 max-w-fit mx-auto">
                            <button className="p-3 font-semibold bg-green-300 hover:bg-green-400 rounded-lg" onClick={handleSubmit(onSubmit)}>
                                Thêm biến thể
                            </button>
                        </div>
                    </div>
                    <ActionConfirmDialog
                        display={showAddChoiceDialog}
                        onClose={() => setShowAddChoiceDialog(false)}
                        onConfirm={handleAddChoice}
                        message="Việc thêm 1 lựa chọn sẽ xoá toàn bộ các biến thể đang tồn tại của sản phẩm. Hãy chắc chắn khi thực hiện!"
                    />
                    <ActionConfirmDialog
                        display={showDeleteChoiceDialog}
                        onClose={() => setShowDeleteChoiceDialog(false)}
                        onConfirm={handleDeleteChoice}
                        message="Việc xoá 1 lựa chọn sẽ xoá toàn bộ các biến thể đang tồn tại của sản phẩm. Hãy chắc chắn khi thực hiện!"
                        description={`DELETE CHOICE ID = ${choiceId}`}
                    />
                </>
            }
        </>
    );
}