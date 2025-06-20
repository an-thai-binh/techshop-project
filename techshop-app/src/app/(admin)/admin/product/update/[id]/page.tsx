'use client'
import { EndpointAPI } from '@/api/EndpointAPI'
import AdminError from '@/component/admin/AdminError'
import ProductVariationItem from '@/component/admin/ProductVariationItem'
import UpdateProductForm from '@/component/admin/UpdateProductForm'
import { selectToken } from '@/features/auth/authSelectors'
import { useAppSelector } from '@/shared/redux/hook'
import { ProductDetail } from '@/types/product'
import api from '@/utils/APIAxiosConfig'
import axios from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UpdateProductPage() {
  const token = useAppSelector(selectToken)
  const id = useParams().id
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Update Product'
  }, [])

  useEffect(() => {
    if (!id || !token) {
      return
    }
    const fetchToken = async () => {
      try {
        const response = await api.get(EndpointAPI.PRODUCT_GET_DETAIL + id);
        if (response.data.success) {
          setProductDetail(response.data.data)
        }
      } catch (error: any) {
        const message = error.response.data?.message || error.message
        setErrorMessage(message)
        throw new Error('Error fetching product: ' + message)
      }
    }
    fetchToken()
  }, [id, token])

  const onDeleteVariationSuccess = (deletedId: string) => {
    setProductDetail((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        productVariationList: prev.productVariationList.filter(
          (variation) => variation.id !== deletedId,
        ),
      }
    })
  }

  return (
    <>
      {errorMessage ? (
        <AdminError message={errorMessage} />
      ) : (
        productDetail && (
          <div className="flex h-screen flex-col">
            <h3 className="my-3 text-center text-3xl font-bold uppercase">Cập nhật sản phẩm</h3>
            <div className="mx-3 bg-white shadow-md">
              <UpdateProductForm
                id={productDetail.id}
                categoryId={productDetail.category.id}
                productName={productDetail.productName}
                productDescription={productDetail.productDescription}
                productBasePrice={productDetail.productBasePrice}
                imgUrl={
                  productDetail.productImageList.find((productImage) => productImage.first === true)
                    ?.image.imgUrl || ''
                }
              />
            </div>
            <div className="mx-3 my-3 bg-white shadow-md">
              <div className="m-3">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">Biến thể sản phẩm</p>
                    <p className="text-sm">
                      Sản phẩm đang có <b>{productDetail.productVariationList.length || 0}</b> biến
                      thể
                    </p>
                  </div>
                  <Link href={`/admin/product/variation/add/${productDetail.id}`}>
                    <button className="h-full bg-yellow-300 px-3 font-semibold shadow-lg hover:bg-yellow-400 hover:shadow-sm">
                      Thêm biến thể
                    </button>
                  </Link>
                </div>
                <hr className="mt-3 text-black" />
                <div className="max-h-[calc(100vh-400px)] divide-y divide-gray-200 overflow-y-auto lg:max-h-[calc(100vh-300px)]">
                  {productDetail.productVariationList?.length
                    ? productDetail.productVariationList.map((productVariation) => {
                      const matchedImage = productDetail.productImageList.find(
                        (image) => image.image.id === productVariation.imageId,
                      )
                      return (
                        <ProductVariationItem
                          key={productVariation.id}
                          id={productVariation.id}
                          sku={productVariation.sku}
                          basePrice={productDetail.productBasePrice}
                          priceChange={productVariation.variationPriceChange}
                          quantity={productVariation.quantity}
                          imgUrl={matchedImage?.image.imgUrl || ''}
                          onDeleteVariationSuccess={onDeleteVariationSuccess}
                        />
                      )
                    })
                    : null}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  )
}
