'use client'

import { useEffect, useState } from 'react'
import { ProductType } from '@/features/product/types/ProductType'

interface SearchPageParams {
  page?: number
  size?: number
  sort?: string
  direction?: 'asc' | 'desc'
}

export function useSearch(query: string, pageParams?: SearchPageParams) {
  const [results, setResults] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setTotal(0)
      return
    }

    const timeout = setTimeout(() => {
      const controller = new AbortController()
      const signal = controller.signal

      const fetchSearch = async () => {
        setLoading(true)
        try {
          const { page = 0, size = 10, sort = 'id', direction = 'desc' } = pageParams || {}

          const url = `http://localhost:8080/techshop/product/display/searchPage?query=${encodeURIComponent(
            query,
          )}&page=${page}&size=${size}&sort=${sort}&direction=${direction}`

          const res = await fetch(url, { signal })
          const json = await res.json()

          const originalResults: ProductType[] = json.data?.content || []
          const normalizedQuery = query.trim().toLowerCase()

          const sortedResults = [...originalResults].sort((a, b) => {
            const aName = a.productName.toLowerCase()
            const bName = b.productName.toLowerCase()

            const aIncludes = aName.includes(normalizedQuery)
            const bIncludes = bName.includes(normalizedQuery)

            const aIndex = aName.indexOf(normalizedQuery)
            const bIndex = bName.indexOf(normalizedQuery)

            if (!aIncludes && !bIncludes) return 0
            if (aIncludes && !bIncludes) return -1
            if (!aIncludes && bIncludes) return 1
            return aIndex - bIndex
          })

          setResults(sortedResults)
          setTotal(json.data?.totalElements || 0)
        } catch (err) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (err.name !== 'AbortError') {
            console.error('Search API error:', err)
          }
        } finally {
          setLoading(false)
        }
      }

      fetchSearch()

      return () => controller.abort()
    }, 300) // debounce 300ms

    return () => clearTimeout(timeout)
  }, [query, pageParams])

  return { results, total, loading }
}
