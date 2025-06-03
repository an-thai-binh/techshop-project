'use client'
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"

const formSchema = z.object({
    categoryName: z.string().min(1, { message: "Tên thể loại không được để trống" }),
    categoryImgUrl: z.string()
})

type FormData = z.infer<typeof formSchema>;

export default function AddCategoryForm() {
    const token = useAppSelector(selectToken);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>(
        {
            resolver: zodResolver(formSchema),
            mode: "onSubmit"
        }
    );
    const [success, setSuccess] = useState<boolean>(false);
    const [formErrorMessage, setFormErrorMessage] = useState<string>("");

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post("http://localhost:8080/techshop/category", data, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.data.success) {
                setSuccess(true);
            }
        } catch (error: any) {
            setSuccess(false);
            setFormErrorMessage(error.response?.data.message || error.message);
        }
    }

    return (
        <>
            <div className="grid grid-cols-1">
                {success ?
                    <div className="mt-3 py-1 px-2 bg-green-100 w-fit mx-auto rounded-sm">
                        <p className="text-center font-bold text-green-500">Thêm thể loại thành công</p>
                    </div>
                    :
                    formErrorMessage &&
                    <div className="mt-3 py-1 px-2 bg-red-100 w-fit mx-auto rounded-sm">
                        <p className="ext-center font-bold text-red-500">Lỗi khi thêm thể loại: {formErrorMessage}</p>
                    </div>}
                <div className="m-3">
                    <p className="font-bold">
                        Tên thể loại<span className="ms-1 text-red-500">*</span>
                    </p>
                    <input
                        {...register("categoryName")}
                        className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
                        placeholder="VD: Phụ kiện Gaming..."
                    />
                    {errors.categoryName && <span className="text-sm font-medium text-red-500">{errors.categoryName.message}</span>}
                </div>
                <div className="m-3">
                    <p className="font-bold">
                        Đường dẫn ảnh
                    </p>
                    <input
                        {...register("categoryImgUrl")}
                        type="text"
                        className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
                    />
                    {errors.categoryImgUrl && <span className="text-sm font-medium text-red-500">{errors.categoryImgUrl.message}</span>}
                </div>
            </div>
            <div className="flex justify-center">
                <button className="mb-3 bg-yellow-300 px-3 py-1 font-semibold uppercase shadow-lg hover:bg-yellow-400 hover:shadow-sm" onClick={handleSubmit(onSubmit)}>
                    Thêm
                </button>
            </div>
        </>
    );
}