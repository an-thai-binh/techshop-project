'use client'
import AdditionFloatingButton from '@/component/admin/AdditionFloatingButton'
import AdminImageHolder from '@/component/admin/AdminImageHolder'
import { selectToken } from '@/features/auth/authSelectors'
import { useAppSelector } from '@/shared/redux/hook'
import { Image } from '@/types/image'
import { Page } from '@/types/page'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '@/utils/APIAxiosConfig'
import { EndpointAPI } from '@/api/EndpointAPI'

export default function AdminImagePage() {
  const token = useAppSelector(selectToken)
  const [images, setImages] = useState<Image[]>([])
  const [page, setPage] = useState<Page | null>(null)
  const pageNumber = 0
  const [size, setSize] = useState<number>(20)

  useEffect(() => {
    if (!token) {
      return
    }
    const fetchImages = async () => {
      try {
        const response = await api.get(EndpointAPI.IMAGE_GET_ALL, {
          params: {
            page: pageNumber,
            size: size,
          },
        })
        if (response.data.success) {
          setImages(response.data.data.content)
          setPage(response.data.data.page)
        }
      } catch (error: any) {
        const message = error.response?.data.message || error.message
        toast.error(message)
        throw new Error(message)
      }
    }
    fetchImages()
  }, [token, size])

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-wrap justify-center gap-3 p-3">
        {images.map((image) => {
          return <AdminImageHolder key={image.id} url={image.imgUrl} />
        })}
      </div>
      {page && page.totalPages > 1 && (
        <div className="mb-3 flex items-center justify-center">
          <button
            onClick={() => setSize((prev) => prev + 20)}
            className="mt-3 bg-yellow-400 px-2 py-1 font-semibold uppercase hover:bg-yellow-500"
          >
            Xem thêm
          </button>
        </div>
      )}
      <AdditionFloatingButton url={'/admin/image/add'} />
    </div>
  )
}
