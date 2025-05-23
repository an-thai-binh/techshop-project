'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useAppSelector } from '@/shared/redux/hook'
import { selectToken } from '@/features/auth/authSelectors'

interface Category {
  id: string
  categoryName: string
}

export default function CategoryComboBox({
  defaultId,
  onCategoryChange,
}: {
  defaultId: string
  onCategoryChange: (categoryId: string) => void
}) {
  const [categories, setCategories] = useState<Category[]>([])
  const token = useAppSelector(selectToken)
  useEffect(() => {
    axios
      .get('http://localhost:8080/techshop/category/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data.data)
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error fetching categories:', error.response.message)
        } else {
          console.error('Error fetching categories:', error.message)
        }
      })
  }, [token])

  return (
    <Select
      name="categoryId"
      options={categories.map((category) => ({ value: category.id, label: category.categoryName }))}
      value={
        categories.find((category) => category.id == defaultId)
          ? {
              value: defaultId,
              label: categories.find((category) => category.id == defaultId)?.categoryName,
            }
          : null
      }
      onChange={(e) => onCategoryChange(e?.value || '1')}
    />
  )
}
