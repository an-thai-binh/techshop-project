'use client'
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatDateTime, formatOrderStatus, formatVietNamCurrency } from "@/utils/AppFormatter";
import toast from "react-hot-toast";
import api from "@/utils/APIAxiosConfig";
import { EndpointAPI } from "@/api/EndpointAPI";
import { Order } from "@/types/order";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { useSearchParams } from "next/navigation";
import { max } from "date-fns";

export default function OrderDataTable() {
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [sort, setSort] = useState<string>('id');
    const [direction, setDirection] = useState<string>('desc');
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(false);
    // filter
    const [orderId, setOrderId] = useState<string>("");
    const [orderName, setOrderName] = useState<string>("");
    const [status, setStatus] = useState<string>(useSearchParams().get("status") ?? "");
    const [afterTime, setAfterTime] = useState<string>("");
    const [beforeTime, setBeforeTime] = useState<string>("");
    const [minAmount, setMinAmount] = useState<string>("");
    const [maxAmount, setMaxAmount] = useState<string>("");
    const [minAmountError, setMinAmountError] = useState<string>("");
    const [maxAmountError, setMaxAmountError] = useState<string>("");

    const handleChangeMinAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinAmount(value);
        if (isNaN(Number(value))) {
            setMinAmountError("Số không hợp lệ");
            return;
        }
        compareAmountFilter(value, maxAmount);
    }

    const handleChangeMaxAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxAmount(value);
        if (isNaN(Number(value))) {
            setMaxAmountError("Số không hợp lệ");
            return;
        }
        compareAmountFilter(minAmount, value);
    }

    const compareAmountFilter = (min: string, max: string) => {
        if (max !== "" && min !== "") {
            if (Number(min) > Number(max)) {
                setMinAmountError("Không thể lớn hơn tổng cao nhất");
                setMaxAmountError("Không thể nhỏ hơn tổng thấp nhất");
                return;
            }
        }
        setMinAmountError("");
        setMaxAmountError("");
    }

    useEffect(() => {
        const fetchOrder = async () => {
            if (minAmountError !== "" || maxAmountError !== "") {
                return;
            }
            try {
                const response = await api.get(EndpointAPI.ORDER_GET_FILTER, {
                    params: {
                        page: page,
                        size: size,
                        sort: sort,
                        direction: direction,
                        orderId: orderId,
                        orderName: orderName,
                        status: status,
                        afterTime: afterTime,
                        beforeTime: beforeTime,
                        minAmount: minAmount,
                        maxAmount: maxAmount
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
    }, [page, size, sort, direction, reload]);

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
                return (
                    <div style={{ backgroundColor: color }} className="px-2 rounded-xl opacity-65">
                        <p className="font-bold text-white">{formatted}</p>
                    </div >
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
            <div className="mx-3 bg-white shadow-md">
                <div className="flex items-center pl-3 pt-3">
                    <p className="text-xl">Lọc dữ liệu</p>
                    <FunnelIcon className="size-5" />
                </div>
                <div className="grid grid-cols-1 gap-2 p-3 lg:grid-cols-2">
                    <div>
                        <p className="ms-1 font-semibold">ID đơn hàng</p>
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                            placeholder="VD: Nguyễn Văn A"
                        />
                    </div>
                    <div>
                        <p className="ms-1 font-semibold">Tên khách hàng</p>
                        <input
                            type="text"
                            value={orderName}
                            onChange={(e) => setOrderName(e.target.value)}
                            className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                            placeholder="VD: Nguyễn Văn A"
                        />
                    </div>
                    <div>
                        <p className="ms-1 font-semibold">Trạng thái đơn hàng</p>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full min-h-[36px] rounded-md border-2 border-gray-300 px-3 py-1">
                            <option value={""}>Tất cả</option>
                            <option value={"PENDING"}>Đang chuẩn bị</option>
                            <option value={"DELIVERING"}>Đang giao hàng</option>
                            <option value={"SUCCESS"}>Đã hoàn thành</option>
                            <option value={"FAILED"}>Huỷ</option>
                        </select>
                    </div>
                    <div>
                        <div className="grid grid-cols-2 gap-x-2">
                            <div>
                                <p className="ms-1 font-semibold">Tổng tiền thấp nhất</p>
                                <input
                                    type="number"
                                    value={minAmount}
                                    onChange={handleChangeMinAmount}
                                    className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                                    placeholder="VD: Nguyễn Văn A"
                                />
                                <span className="ms-2 text-sm font-medium text-red-500">{minAmountError}</span>
                            </div>
                            <div>
                                <p className="ms-1 font-semibold">Tổng tiền cao nhất</p>
                                <input
                                    type="number"
                                    value={maxAmount}
                                    onChange={handleChangeMaxAmount}
                                    className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                                    placeholder="VD: Nguyễn Văn A"
                                />
                                <span className="ms-2 text-sm font-medium text-red-500">{maxAmountError}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="ms-1 font-semibold">Đặt hàng từ</p>
                        <input
                            type="datetime-local"
                            value={afterTime}
                            onChange={(e) => setAfterTime(e.target.value)}
                            className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                            placeholder="VD: 1"
                        />
                    </div>
                    <div>
                        <p className="ms-1 font-semibold">Đặt hàng trước</p>
                        <input
                            type="datetime-local"
                            value={beforeTime}
                            onChange={(e) => setBeforeTime(e.target.value)}
                            className="w-full rounded-md border-2 border-gray-300 px-3 py-1"
                            placeholder="VD: 1"
                        />
                    </div>
                </div>
                <div className="flex justify-center pb-3">
                    <button
                        type="button"
                        className="bg-blue-400 px-2 py-1 font-bold text-white hover:bg-blue-500"
                        onClick={() => setReload(prev => !prev)}
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <div className="mx-3 my-3 h-fit bg-white shadow-md">
                <div className="w-full">
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
                </div>
            </div>
        </>
    );
}