'use client'

import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDateTime, formatOrderStatus, formatVietNamCurrency } from "@/utils/CurrentyFormat";
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import toast from "react-hot-toast";
import api from "@/utils/APIAxiosConfig";
import { EndpointAPI } from "@/api/EndpointAPI";
import { Order } from "@/types/order";

export default function OrderDataTable() {
    const token = useAppSelector(selectToken);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [sort, setSort] = useState<string>('id');
    const [direction, setDirection] = useState<string>('desc');
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchOrder = async () => {
            try {
                const response = await api.get(EndpointAPI.ORDER_GET_ALL, {
                    params: {
                        page: page,
                        size: size,
                        sort: sort,
                        direction: direction
                    }
                });
                if (response.data.success) {
                    setOrders(response.data.data.content);
                    setTotalItems(response.data.data.page.totalElements);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                toast.error(message);
                throw new Error(message);
            }
        }
        fetchOrder();
    }, [token, page, size, sort, direction]);

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'orderName', headerName: 'Khách hàng', flex: 1 },
        { field: 'orderPhoneNumber', headerName: 'Số điện thoại', flex: 1 },
        {
            field: 'totalAmount',
            headerName: 'Tổng tiền',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return formatVietNamCurrency(params.row.totalAmount);
            }
        },
        {
            field: 'orderTime',
            headerName: 'Thời gian đặt hàng',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return formatDateTime(params.row.orderTime);
            }
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                const { formatted, color } = formatOrderStatus(params.row.status);
                return <p style={{ color }} className="font-bold ">{formatted}</p>;
            }
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <div className="py-2 grid grid-cols-1 gap-1">
                        <Link href={`/admin/order/update/${params.row.id}`}>
                            <button className="px-2 py-1 min-w-[50px] text-white uppercase font-bold bg-blue-400 hover:bg-blue-500 shadow-sm hover:shadow-lg">Cập nhật</button>
                        </Link>
                    </div>
                );
            }
        }
    ]

    return (
        <>
            <DataGrid
                columns={columns}
                rows={orders}
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
        </>
    );
}