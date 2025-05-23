'use client'

import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { formatVietNamCurrency } from "@/utils/CurrentyFormat";
import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";

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
    const [size, setSize] = useState<number>(10);
    const [sort, setSort] = useState<string>('id');
    const [direction, setDirection] = useState<string>('desc');
    const [products, setProducts] = useState<Product[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);

    useEffect(() => {
        axios.get('http://localhost:8080/techshop/product/display', {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                page: page,
                size: size,
                sort: sort,
                direction: direction
            }
        })
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.data.content);
                    setTotalItems(response.data.data.page.totalElements);
                }
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error fetching products:', error.response.data.message);
                } else {
                    console.error('Error fetching products:', error.message);
                }
            });
    }, [token, page, size, sort, direction]);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { 
            field: 'productImgUrl', 
            headerName: 'Ảnh', 
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return <img src={params.row.productImgUrl} alt={params.row.productName} className="w-16 h-16 object-contain" />
            }
        },
        { field: 'categoryName', headerName: 'Danh mục', flex: 1 },
        { field: 'productName', headerName: 'Tên sản phẩm', flex: 5 },
        { 
            field: 'productBasePrice', 
            headerName: 'Giá ban đầu', 
            flex: 1 ,
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
                    <div>
                        <Link href={`/admin/product/update/${params.row.id}`}>
                            <button className="px-2 py-1 text-white font-bold bg-blue-400 hover:bg-blue-500 shadow-sm hover:shadow-lg">EDIT</button>
                        </Link>
                    </div>
                );
            }
        }
    ]

    return (
        <DataGrid
            columns={columns}
            rows={products}
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
                '& .MuiDataGrid-columnHeader': {
                    fontFamily: 'Quicksand, sans-serif',
                    fontSize: '16px'
                },
                '& .MuiDataGrid-cell': {
                    fontFamily: 'Quicksand, sans-serif',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center'
                }
            }}
        />
    );
}