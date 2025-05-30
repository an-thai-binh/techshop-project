'use client'

import { useEffect, useState } from 'react'
import { useAppSelector } from '@/shared/redux/hook'
import { selectProducts } from '@/features/product/productSelectors'

export interface ProductResponse {
  id: number
  categoryId: number
  productName: string
  productDescription: string
  productBasePrice: number
}

export function useSearch(query: string) {
  const [results, setResults] = useState<ProductResponse[]>([])
  const products = useAppSelector(selectProducts)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timeout = setTimeout(() => {
      const keyword = query.toLowerCase()
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(keyword),
      )
      setResults(filtered)
    }, 300) // debounce 300ms

    return () => clearTimeout(timeout)
  }, [query, products])

  return { results, loading: false }
}
