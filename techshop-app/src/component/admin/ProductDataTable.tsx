'use client'

import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react";

const allRows = [
    { id: 1, name: 'Sản phẩm A', price: 100000 },
    { id: 2, name: 'Sản phẩm B', price: 200000 },
    { id: 3, name: 'Sản phẩm C', price: 300000 },
    { id: 4, name: 'Sản phẩm D', price: 400000 },
    { id: 5, name: 'Sản phẩm E', price: 500000 },
    { id: 6, name: 'Sản phẩm F', price: 600000 },
    { id: 7, name: 'Sản phẩm G', price: 700000 },
    { id: 8, name: 'Sản phẩm H', price: 800000 },
    { id: 9, name: 'Sản phẩm A', price: 100000 },
    { id: 10, name: 'Sản phẩm B', price: 200000 },
    { id: 11, name: 'Sản phẩm C', price: 300000 },
    { id: 12, name: 'Sản phẩm D', price: 400000 },
    { id: 13, name: 'Sản phẩm E', price: 500000 },
    { id: 14, name: 'Sản phẩm F', price: 600000 },
    { id: 15, name: 'Sản phẩm G', price: 700000 },
    { id: 16, name: 'Sản phẩm H', price: 800000 },
    { id: 17, name: 'Sản phẩm A', price: 100000 },
    { id: 18, name: 'Sản phẩm B', price: 200000 },
    { id: 19, name: 'Sản phẩm C', price: 300000 },
    { id: 20, name: 'Sản phẩm D', price: 400000 },
    { id: 21, name: 'Sản phẩm E', price: 500000 },
    { id: 22, name: 'Sản phẩm F', price: 600000 },
    { id: 23, name: 'Sản phẩm G', price: 700000 },
    { id: 24, name: 'Sản phẩm H', price: 800000 },
    { id: 25, name: 'Sản phẩm A', price: 100000 },
    { id: 26, name: 'Sản phẩm B', price: 200000 },
    { id: 27, name: 'Sản phẩm C', price: 300000 },
    { id: 28, name: 'Sản phẩm D', price: 400000 },
    { id: 29, name: 'Sản phẩm E', price: 500000 },
    { id: 30, name: 'Sản phẩm F', price: 600000 },
    { id: 31, name: 'Sản phẩm G', price: 700000 },
    { id: 32, name: 'Sản phẩm H', price: 800000 },
];

export default function ProductDataTable() {
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(30);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 2 },
        { field: 'name', headerName: 'Tên sản phẩm', flex: 4 },
        { field: 'price', headerName: 'Giá', flex: 3 },
        { field: 'actions', headerName: 'Thao tác', flex: 1 }
    ]

    const pageRows = allRows.slice(page * size, page * size + size);

    return (
        <DataGrid
            columns={columns}
            rows={pageRows}
            rowCount={allRows.length}
            pagination
            paginationMode="server"
        />
    );
}