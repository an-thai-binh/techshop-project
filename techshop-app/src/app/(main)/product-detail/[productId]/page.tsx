import SliderDetailProduct from '@/features/product/components/SliderDetailProduct'
import ProductDescription from '@/features/product/components/ProductDescription'
import {
  ArrowPathRoundedSquareIcon,
  BanknotesIcon,
  ChevronRightIcon,
  InboxIcon,
  InboxStackIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { fetchProductDetails } from '@/api/ProductAPI'
import { ProductDetailType } from '@/features/product/types/ProductDetailType'
import ProductChoice from '@/features/product/components/ProductChoice'

export default async function ProductDetail({ params }: { params: { productId: number } }) {
  const { productId } = await params
  const productDetail: ProductDetailType | undefined = await fetchProductDetails(productId)

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-white px-0 text-black dark:bg-gray-900 dark:text-white">
      <div className={'flex w-full items-center px-2 py-4'}>
        <div className={'flex items-center gap-2'}>
          <Link href={'/'}>
            <div className={'flex items-center justify-center'}>
              <h1 className={'text-xs font-bold'}>Trang chủ</h1>
            </div>
          </Link>
          <div className={'flex items-center justify-center'}>
            <ChevronRightIcon className={'size-3'} strokeWidth={2.5} />
          </div>
          <Link href={`/categories/${productDetail?.category.id}`}>
            <div className={'flex items-center justify-center'}>
              <h1 className={'text-xs font-bold'}>{productDetail?.category.categoryName}</h1>
            </div>
          </Link>
          <div className={'flex items-center justify-center'}>
            <ChevronRightIcon className={'size-3'} strokeWidth={2.5} />
          </div>
          <div className={'flex items-center justify-center'}>
            <h1 className={'w-64 truncate whitespace-nowrap text-xs font-bold'}>
              {productDetail?.productName}
            </h1>
          </div>
        </div>
      </div>
      <div className={'container px-2'}>
        <div className={'flex gap-4'}>
          <div className={'flex w-1/2 flex-col space-y-4'}>
            {/*Slider hình ảnh sản phẩm*/}
            <div className={'flex w-full items-center'}>
              <div className={'h-[50vh] w-full'}>
                <SliderDetailProduct productDetail={productDetail} />
              </div>
            </div>
            <hr className={'my-4 border-gray-700'} />
            {/*    Chính sách dành cho sản phẩm*/}
            <div className={'flex items-center'}>
              <div className={'flex flex-col justify-center gap-2 space-y-4'}>
                <div className={'flex flex-col gap-4'}>
                  <div className={'flex items-center'}>
                    <h1 className={'text-lg font-bold'}>Chính sách dành cho sản phẩm</h1>
                  </div>
                  <div className={'flex flex-wrap gap-4'}>
                    <div className={'flex items-center justify-center gap-2 border-r-2 pr-2'}>
                      <div className={'flex items-center justify-center'}>
                        <div className={'size-5 rounded-full'}>
                          <InboxStackIcon className={'size-5'} fill={'transparent'} />
                        </div>
                      </div>
                      <div className={'flex items-center justify-center'}>
                        <h1 className={'text-sm'}>Đóng gói chắc chắn</h1>
                      </div>
                    </div>

                    <div className={'flex items-center justify-center gap-2 border-r-2 pr-2'}>
                      <div className={'flex items-center justify-center'}>
                        <div className={'size-5 rounded-full'}>
                          <BanknotesIcon className={'size-5'} fill={'transparent'} />
                        </div>
                      </div>
                      <div className={'flex items-center justify-center'}>
                        <h1 className={'text-sm'}>Miễn phí giao hàng đơn trên 300k</h1>
                      </div>
                    </div>
                    <div className={'flex items-center justify-center gap-2 border-r-2 pr-2'}>
                      <div className={'flex items-center justify-center'}>
                        <div className={'size-5 rounded-full'}>
                          <PhoneIcon className={'size-5'} fill={'transparent'} />
                        </div>
                      </div>
                      <div className={'flex items-center justify-center'}>
                        <h1 className={'text-sm'}>Hỗ trợ 24/7</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={'flex flex-col gap-4'}>
                  <div className={'flex items-center'}>
                    <h1 className={'text-lg font-bold'}>Thông tin thêm</h1>
                  </div>
                  <div className={'flex flex-wrap gap-4'}>
                    <div className={'flex items-center justify-center gap-2'}>
                      <div className={'flex items-center justify-center'}>
                        <div className={'size-5 rounded-full'}>
                          <InboxIcon className={'size-5'} fill={'transparent'} />
                        </div>
                      </div>
                      <div className={'flex items-center justify-center'}>
                        <h1 className={'text-sm'}>Mở hợp kiểm tra nhận hàng</h1>
                      </div>
                    </div>
                    <div className={'flex items-center justify-center gap-2'}>
                      <div className={'flex items-center justify-center'}>
                        <div className={'size-5 rounded-full'}>
                          <ArrowPathRoundedSquareIcon className={'size-5'} fill={'transparent'} />
                        </div>
                      </div>
                      <div className={'flex items-center justify-center'}>
                        <h1 className={'text-sm'}>Đổi trả trong 7 ngày</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductChoice productDetail={productDetail} productId={productId} />
        </div>
        {/*Mô tả saản phẩm*/}
        <hr className={'my-8 border-[0.1px] border-gray-700 shadow shadow-blue-500 blur-md'} />
        <div className={'my-4 flex flex-col'}>
          <div className={'flex items-center justify-center'}>
            <h1 className={'my-2 text-3xl font-bold text-blue-500'}>MÔ TẢ SẢN PHẨM</h1>
          </div>
          <div className={'flex'}>
            <ProductDescription productDescription={productDetail?.productDescription} />
          </div>
        </div>
        <hr className={'my-4 border-[0.1px] border-gray-700 shadow shadow-blue-500 blur-md'} />
      </div>
    </div>
  )
}
