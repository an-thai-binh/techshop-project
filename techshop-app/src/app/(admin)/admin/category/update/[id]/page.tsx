'use client'
import { EndpointAPI } from "@/api/EndpointAPI";
import AdminError from "@/component/admin/AdminError";
import UpdateCategoryForm from "@/component/admin/UpdateCategoryForm";
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import { Category } from "@/types/product";
import api from "@/utils/APIAxiosConfig";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddCategoryPage() {
    const token = useAppSelector(selectToken);
    const id = useParams().id;
    const [category, setCategory] = useState<Category | null>(null);
    const [fetchErrorMessage, setFetchErrorMessage] = useState<string>("");

    useEffect(() => {
        if (!token || !id) {
            return;
        }
        const fetchCategory = async () => {
            try {
                const response = await api.get(EndpointAPI.CATEGORY_GET_BY_ID + id);
                if (response.data.success) {
                    setCategory(response.data.data);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                setFetchErrorMessage(message);
                throw new Error(message);
            }
        }
        fetchCategory();
    }, [token, id]);

    return (
        <>
            {fetchErrorMessage ? <AdminError message={fetchErrorMessage} />
                : category &&
                <div className="flex h-screen flex-col text-gray-800">
                    <h3 className="my-3 text-center text-3xl font-bold uppercase">Cập nhật thể loại</h3>
                    <div className="mx-3 bg-white shadow-md">
                        <UpdateCategoryForm
                            id={category.id}
                            categoryName={category.categoryName}
                            categoryImgUrl={category.categoryImgUrl}
                        />
                    </div>
                </div>
            }
        </>
    );
}