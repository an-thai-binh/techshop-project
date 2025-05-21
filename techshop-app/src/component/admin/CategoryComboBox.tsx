'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

interface Category {
    id: string;
    categoryName: string;
}

export default function CategoryComboBox({defaultId, onCategoryChange}: {defaultId: string, onCategoryChange: (categoryId: string) => void}) {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        axios.get('http://localhost:8080/techshop/category/all', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNzQ3ODQyNTQ0LCJpYXQiOjE3NDc4Mzg5NDQsInNjb3BlIjoiUk9MRV9VU0VSIHByb2R1Y3Q6dmlldyB1c2VyOnZpZXcgdXNlcjp1cGRhdGUgb3JkZXI6dmlldyBvcmRlcjpjcmVhdGUiLCJ1c2VybmFtZSI6ImJpbmhhbiJ9.OLEooWc-HI8AdQW3KTZFNl8i4l-pAQSamdU0ZEk9ASg_Tv_zIVO81nJlhCmM_s5xHbaOcIDLHqU_Y0co6AKacA'
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

    return (
        <Select 
            name="categoryId" 
            options={categories.map(category => ({value: category.id, label: category.categoryName}))} 
            value={categories.find(category => category.id == defaultId) ? 
                {
                    value: defaultId, 
                    label: categories.find(category => category.id == defaultId)?.categoryName} 
                : null}
            onChange={(e) => onCategoryChange(e?.value || "1")} />
    );
}