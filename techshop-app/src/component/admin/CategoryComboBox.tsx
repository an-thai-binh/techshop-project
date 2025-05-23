'use client'
import { TOKEN } from "@/utils/TokenTemp";
import axios from 'axios'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useAppSelector } from '@/shared/redux/hook'
import { selectToken } from '@/features/auth/authSelectors'

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

export default function CategoryComboBox({value, onChange}: CategoryComboBoxProps) {
    const token = useAppSelector(selectToken);
    const [categories, setCategories] = useState<Category[]>([]);
    

    useEffect(() => {
        axios.get('http://localhost:8080/techshop/category/all', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            setCategories(response.data.data);
        })
        .catch(error => {
            if(error.response) {
                console.error('Error fetching categories:', error.response.message);
            } else {
                console.error('Error fetching categories:', error.message);
            } 
        });
    }, []);

    const options: Option[] = categories.map(category => ({value: category.id, label: category.categoryName}));

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