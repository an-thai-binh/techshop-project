'use client'

import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import ActionConfirmDialog from "./ActionConfirmDialog";
import toast from "react-hot-toast";
import { Category } from "@/types/product";

export default function ProductDataTable() {
    const token = useAppSelector(selectToken);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [sort, setSort] = useState<string>('id');
    const [direction, setDirection] = useState<string>('desc');
    const [reload, setReload] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string>("");

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/techshop/category', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    params: {
                        page: page,
                        size: size,
                        sort: sort,
                        direction: direction
                    }
                });
                if (response.data.success) {
                    setCategories(response.data.data.content);
                    setTotalItems(response.data.data.page.totalElements);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                toast.error(message);
                throw new Error(message);
            }
        }
        fetchCategories();
    }, [token, page, size, sort, direction, reload]);

    const handleOnClickDeleteButton = (id: string) => {
        setDeleteId(id);
        setShowConfirmDialog(true);
    }

    const handleDeleteAction = async () => {
        setShowConfirmDialog(false);
        try {
            const response = await axios.delete(`http://localhost:8080/techshop/category/${deleteId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.data.success) {
                setReload(prev => !prev);
            }
        } catch (error: any) {
            const message = error.response?.data.message || error.message;
            toast.error("Error deleting product: " + message);
            throw new Error(message);
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        {
            field: 'categoryName',
            headerName: 'Danh mục',
            flex: 3,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <b>{params.row.categoryName}</b>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <div className="py-2 grid grid-cols-1 gap-1">
                        <Link href={`/admin/category/update/${params.row.id}`}>
                            <button className="px-2 py-1 min-w-[50px] text-white uppercase font-bold bg-blue-400 hover:bg-blue-500 shadow-sm hover:shadow-lg">Sửa</button>
                        </Link>
                        <button onClick={() => handleOnClickDeleteButton(params.row.id)} className="px-2 py-1 min-w-[50px] text-white uppercase font-bold bg-red-400 hover:bg-red-500 shadow-sm hover:shadow-lg">Xoá</button>
                    </div>
                );
            }
        }
    ]

    return (
        <>
            <DataGrid
                columns={columns}
                rows={categories}
                rowCount={totalItems}
                pageSizeOptions={[10, 15, 20]}
                pagination
                paginationMode="server"
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: size,
                            page: page
                        }
                    }
                }}
                onPaginationModelChange={(model) => {
                    console.log(model.page);
                    console.log(model.pageSize);
                    setPage(model.page);
                    setSize(model.pageSize);
                }}
                sortingMode="server"
                onSortModelChange={(model) => { // [{field: 'fieldName', sort: 'asc'}]
                    setSort(model[0]?.field || 'id');
                    setDirection(model[0]?.sort || 'desc');
                }}
                getRowHeight={() => 'auto'}
                sx={{
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontFamily: 'Quicksand, sans-serif',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    },
                    '& .MuiDataGrid-cell': {
                        fontFamily: 'Quicksand, sans-serif',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center'
                    }
                }}
            />
            <ActionConfirmDialog
                display={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleDeleteAction}
                description={`DELETE CATEGORY ID = ${deleteId}`}
            />
        </>
    );
}