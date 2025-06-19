'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useAppSelector } from '@/shared/redux/hook'
import { selectToken } from '@/features/auth/authSelectors'
import { EndpointAPI } from '@/api/EndpointAPI'
import api from '@/utils/APIAxiosConfig'

interface Category {
    id: string
    categoryName: string
}

interface Option {
    value: string;
    label: string;
}

type CategoryComboBoxProps = {
    value: string;
    onChange: (value: string) => void;
}

export default function CategoryComboBox({ value, onChange }: CategoryComboBoxProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get(EndpointAPI.CATEGORY_GET_ALL);
                if (response.data.success) {
                    setCategories(response.data.data);
                }
            } catch (error: any) {
                const message = error.response?.data.message || error.message;
                throw new Error(message);
            }
        }
        fetchCategories();
    }, []);

    const options: Option[] = categories.map(category => ({ value: category.id, label: category.categoryName }));

    const selectedOption = options.find(option => option.value == value) || null;

    return (
        <Select
            name="categoryId"
            options={options}
            value={selectedOption}
            onChange={(e) => onChange(e?.value || value)}
        />
    );
}