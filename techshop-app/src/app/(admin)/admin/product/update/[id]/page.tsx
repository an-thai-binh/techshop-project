'use client'
import AdminError from '@/component/admin/AdminError';
import ProductVariationItem from '@/component/admin/ProductVariationItem'
import UpdateProductForm from '@/component/admin/UpdateProductForm'
import { selectToken } from '@/features/auth/authSelectors';
import { useAppSelector } from '@/shared/redux/hook';
import { ProductDetail } from '@/types/product';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

export default function UpdateProductPage() {
  const token = useAppSelector(selectToken)
  const id = useParams().id;
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Update Product'
  }, []);

  useEffect(() => {
    if (!id || !token) {
      return;
    }
    const fetchToken = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/techshop/product/detail/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        if (response.data.success) {
          setProductDetail(response.data.data);

        }
      } catch (error: any) {
        const message = error.response.data?.message || error.message;
        setErrorMessage(message);
        throw new Error("Error fetching product: " + message);
      }
    }
    fetchToken();
  }, [id, token]);

  return (
    <>
      {errorMessage ? <AdminError message={errorMessage} />
        : productDetail &&
        <div className="flex h-screen flex-col">
          <h3 className="my-3 text-center text-3xl font-bold uppercase">Cập nhật sản phẩm</h3>
          <div className="mx-3 bg-white shadow-md">
            <UpdateProductForm
              id={productDetail.id}
              categoryId={productDetail.category.id}
              productName={productDetail.productName}
              productDescription={productDetail.productDescription}
              productBasePrice={productDetail.productBasePrice}
              imgUrl={productDetail.productImageList.find(productImage => productImage.first === true)?.image.imgUrl || ""}
            />
          </div>
          <div className="mx-3 my-3 bg-white shadow-md">
            <div className="m-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">Biến thể sản phẩm</p>
                  <p className="text-sm">Sản phẩm đang có <b>{productDetail.productVariationList.length || 0}</b> biến thể</p>
                </div>
                <Link href={`/admin/product/variation/add/${productDetail.id}`}>
                  <button className="px-3 h-full font-semibold shadow-lg bg-yellow-300 hover:bg-yellow-400 hover:shadow-sm">
                    Thêm biến thể
                  </button>
                </Link>
              </div>
              <hr className="mt-3 text-black" />
              <div className="max-h-[calc(100vh-400px)] divide-y divide-gray-200 overflow-y-auto lg:max-h-[calc(100vh-300px)]">
                {productDetail.productVariationList?.length ? (
                  productDetail.productVariationList.map(productVariation => {
                    const matchedImage = productDetail.productImageList.find(
                      image => image.image.id === productVariation.imageId
                    );
                    return (
                      <ProductVariationItem
                        key={productVariation.id}
                        id={productVariation.id}
                        sku={productVariation.sku}
                        basePrice={productDetail.productBasePrice}
                        priceChange={productVariation.variationPriceChange}
                        imgUrl={matchedImage?.image.imgUrl || ""}
                      />
                    );
                  })
                ) : null}
                {/* <ProductVariationItem
                id="35"
                sku="13_DEN_SAPHU"
                basePrice={1350000}
                priceChange={-50000}
                imgUrl="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1"
              /> */}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
