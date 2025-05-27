'use client'

import AdminError from "@/component/admin/AdminError";
import ChoiceComboBox from "@/component/admin/ChoiceComboBox";
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import { Choice, Product } from "@/types/product";
import { formatVietNamCurrency } from "@/utils/CurrentyFormat";
import axios from "axios";
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";

export default function AddProductVariationPage() {
    const id = useParams().id;
    const token = useAppSelector(selectToken);
    const [product, setProduct] = useState<Product | null>(null);
    const [choices, setChoices] = useState<Choice[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const addButtonRef = useRef<HTMLDivElement>(null);
    const addFormRef = useRef<HTMLDivElement>(null);
    const inputAddFormRef = useRef<HTMLInputElement>(null);

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
                const message = error.response.data?.message || error.message;
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
                }
            } catch (error: any) {
                const message = error.response.data?.message || error.message;
                throw new Error("Error fetching choices: " + message);
            }
        };
        fetchChoices();
    }, [id, token]);

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


    return (
        <>
            {errorMessage ? <AdminError message={errorMessage} />
                : product &&
                <div className="flex h-screen flex-col">
                    <h3 className="my-3 text-center text-3xl font-bold uppercase">Thêm biến thể sản phẩm</h3>
                    <div className="mx-3 p-3 bg-white shadow-md">
                        <p><b>Tên sản phẩm:</b> {product.productName}</p>
                        <p className="mt-3"><b>Giá gốc:</b> {formatVietNamCurrency(product.productBasePrice)}</p>
                        <p className="mt-3 font-bold">
                            Nhập thay đổi giá<span className="ms-1 text-red-500">*</span>
                        </p>
                        <input
                            className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
                            placeholder="VD: -10000 (giảm 10.000đ) hoặc 10000 (tăng 10.000đ)"
                        />
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div className="flex-1 h-[2px] mx-3 bg-gray-700" />
                        <p className="font-bold">Lựa chọn</p>
                        <div className="flex-1 h-[2px] mx-3 bg-gray-700" />
                    </div>
                    {choices.map(choice => {
                        return (
                            <div className="m-3 bg-white shadow-md" key={choice.id}>
                                <div className="p-3 flex items-center">
                                    <p className="basis-1/5 text-center font-bold">{choice.choiceName}</p>
                                    <div className="basis-4/5">
                                        <ChoiceComboBox choiceId={choice.id} choiceValueList={choice.choiceValueList} onChange={() => { }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={addButtonRef} className="m-3 max-w-fit mx-auto">
                        <button className="p-3 font-semibold shadow-lg bg-yellow-300 hover:bg-yellow-400 hover:shadow-sm" onClick={handleDisplayAddChoiceForm}>
                            Thêm lựa chọn
                        </button>
                    </div>
                    <div ref={addFormRef} className="m-3 p-3 max-w-fit mx-auto bg-white shadow-md hidden">
                        <input ref={inputAddFormRef} type="text" className="h-[30px] rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]" placeholder="Nhập lựa chọn mới..." onBlur={handleHideAddChoiceForm} />
                        <button className="ms-2 px-2 h-[30px] font-semibold shadow-lg bg-yellow-300 hover:bg-yellow-400 hover:shadow-sm" onClick={handleAddChoice}>
                            Thêm
                        </button>
                    </div>
                </div>
            }
        </>
    );
}