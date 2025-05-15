'use client'
import Select from "react-select";

const options = [
    { value: '1', label: 'Laptop' },
    { value: '2', label: 'Outlet' },
    { value: '3', label: 'Phụ kiện Gaming' },
]

export default function CategoryComboBox() {
    return (
        <Select name="categoryId" options={options} />
    );
}