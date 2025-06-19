'use client'

import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatVietNamCurrency } from "@/utils/AppFormatter";
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import ActionConfirmDialog from "./ActionConfirmDialog";
import toast from "react-hot-toast";
import Image from "next/image";
import api from "@/utils/APIAxiosConfig";
import { EndpointAPI } from "@/api/EndpointAPI";
import { FunnelIcon } from "@heroicons/react/20/solid";

interface Product {
    id: string;
    categoryId: string;
    categoryName: string;
    productName: string;
    productDescription: string;
    productBasePrice: number;
    productImgUrl: string;
}

export default function ProductDataTable() {
    const token = useAppSelector(selectToken);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(5);
    const [sort, setSort] = useState<string>('id');
    const [direction, setDirection] = useState<string>('desc');
    const [reload, setReload] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string>("");
    // filter
    const [productId, setProductId] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [minBasePrice, setMinBasePrice] = useState<string>("");
    const [maxBasePrice, setMaxBasePrice] = useState<string>("");
    const [minBasePriceError, setMinBasePriceError] = useState<string>("");
    const [maxBasePriceError, setMaxBasePriceError] = useState<string>("");

    const handleChangeMinBasePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinBasePrice(value);
        if (isNaN(Number(value))) {
            setMinBasePriceError("Số không hợp lệ");
            return;
        }
        if (maxBasePrice !== "" && (Number(value) > Number(maxBasePrice))) {
            setMinBasePriceError("Không thể lớn hơn giá cao nhất");
            return;
        }
        setMinBasePriceError("");
    }

    const handleChangeMaxBasePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxBasePrice(value);
        if (isNaN(Number(value))) {
            setMaxBasePriceError("Số không hợp lệ");
            return;
        }
        if (minBasePrice !== "" && (Number(value) < Number(minBasePrice))) {
            setMaxBasePriceError("Không thể nhỏ hơn giá thấp nhất");
            return;
        }
        setMaxBasePriceError("");
    }

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchProducts = async () => {
            if (minBasePriceError !== "" || maxBasePriceError !== "") {
                return;
            }
            console.log("Code reach here");
            const min = minBasePrice === "" ? 0 : Number(minBasePrice);
            const max = maxBasePrice === "" ? -1 : Number(maxBasePrice);
            try {
                const response = await api.get(EndpointAPI.PRODUCT_DISPLAY_FILTER, {
                    params: {
                        page: page,
                        size: size,
                        sort: sort,
                        direction: direction,
                        productId: productId,
                        productName: productName,
                        minBasePrice: min,
                        maxBasePrice: max
                    }
                });
                if (response.data.success) {
                    setProducts(response.data.data.content);
                    setTotalItems(response.data.data.page.totalElements);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                toast.error(message);
                throw new Error(message);
            }
        }
        fetchProducts();
    }, [token, page, size, sort, direction, reload]);

    const handleOnClickDeleteButton = (id: string) => {
        setDeleteId(id);
        setShowConfirmDialog(true);
    }

    const handleDeleteAction = async () => {
        setShowConfirmDialog(false);
        try {
            const response = await api.delete(EndpointAPI.PRODUCT_DELETE + deleteId);
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
            field: 'productImgUrl',
            headerName: 'Ảnh',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return <Image src={params.row.productImgUrl} alt={params.row.productName} width={64} height={64} className="w-16 h-16 object-contain" />
            }
        },
        { field: 'categoryName', headerName: 'Danh mục', flex: 1 },
        { field: 'productName', headerName: 'Tên sản phẩm', flex: 5 },
        {
            field: 'productBasePrice',
            headerName: 'Giá ban đầu',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return formatVietNamCurrency(params.row.productBasePrice);
            }
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <div className="py-2 grid grid-cols-1 gap-1">
                        <Link href={`/admin/product/update/${params.row.id}`}>
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
            <div className="mx-3 bg-white shadow-md">
                <div className="flex items-center pl-3 pt-3">
                    <p className="text-xl">Lọc dữ liệu</p>
                    <FunnelIcon className="size-5" />
                </div>
                <div className="grid grid-cols-1 gap-2 p-3 lg:grid-cols-2">
                    <div>
                        <p className="ms-1 font-semibold">ID sản phẩm</p>
                        <input
                            type="text"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                            placeholder="VD: 1"
                        />
                    </div>
                    <div>
                        <p className="ms-1 font-semibold">Tên sản phẩm</p>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                            placeholder="VD: iPhone 15"
                        />
                    </div>
                    <div>
                        <p className="ms-1 font-semibold">Giá thấp nhất</p>
                        <input
                            type="number"
                            value={minBasePrice}
                            onChange={handleChangeMinBasePrice}
                            className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                            placeholder="VD: 0"
                        />
                        <span className="ms-2 text-sm font-medium text-red-500">{minBasePriceError}</span>
                    </div>
                    <div>
                        <p className="ms-1 font-semibold">Giá cao nhất</p>
                        <input
                            type="number"
                            value={maxBasePrice}
                            onChange={handleChangeMaxBasePrice}
                            className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                            placeholder="VD: 100000000"
                        />
                        <span className="ms-2 text-sm font-medium text-red-500">{maxBasePriceError}</span>
                    </div>
                </div>
                <div className="flex justify-center pb-3">
                    <button
                        type="button"
                        className="bg-blue-400 px-2 py-1 font-bold text-white hover:bg-blue-500"
                        onClick={() => setReload(prev => !prev)}>
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <div className="mx-3 my-3 h-fit bg-white shadow-md">
                <div className="w-full">
                    <DataGrid
                        columns={columns}
                        rows={products}
                        rowCount={totalItems}
                        pageSizeOptions={[5, 10, 15]}
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
                </div>
            </div>
            <ActionConfirmDialog
                display={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleDeleteAction}
                description={`DELETE PRODUCT ID = ${deleteId}`}
            />
        </>
    );
}