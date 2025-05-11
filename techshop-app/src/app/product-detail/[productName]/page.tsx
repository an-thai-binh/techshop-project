import SliderDetailProduct from '@/features/product/components/SliderDetailProduct'
import path from 'node:path'
import * as fs from 'node:fs'
import ProductDescription from '@/features/product/components/ProductDescription'
import {
  ArrowPathRoundedSquareIcon,
  ArrowRightIcon,
  BanknotesIcon,
  ChevronRightIcon,
  InboxIcon,
  InboxStackIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ProductType } from '@/features/product/types/ProductType'
import { fetchProductsByName } from '@/api/ProductAPI'

export default async function ProductDetail({ params }: { params: { productName: string } }) {
  const { productName } = params
  const filePath = path.join(process.cwd(), 'data/product_block_test.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const blocks = JSON.parse(fileContent)
  const product: ProductType | undefined = await fetchProductsByName(
    decodeURIComponent(productName),
  )
  console.log(decodeURIComponent(productName))

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-gray-900 px-0">
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
          <Link href={`/categories/${product?.category_id}`}>
            <div className={'flex items-center justify-center'}>
              <h1 className={'text-xs font-bold'}>Danh mục</h1>
            </div>
          </Link>
          <div className={'flex items-center justify-center'}>
            <ChevronRightIcon className={'size-3'} strokeWidth={2.5} />
          </div>
          <div className={'flex items-center justify-center'}>
            <h1 className={'text-xs font-bold'}>Chi tiết</h1>
          </div>
        </div>
      </div>
      <div className={'container px-2'}>
        <div className={'flex gap-4'}>
          <div className={'flex w-1/2 flex-col space-y-4'}>
            {/*Slider hình ảnh sản phẩm*/}
            <div className={'flex w-full items-center'}>
              <div className={'h-[50vh] w-full'}>
                <SliderDetailProduct />
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
            <hr className={'my-4 border-gray-700'} />
            <div className={'flex w-full items-center'}>
              <div className={'flex w-full items-center justify-between'}>
                <div className={'flex items-center'}>
                  <h1 className={'text-lg font-bold'}>Thông số kĩ thật</h1>
                </div>
                <div className={'flex items-center gap-2'}>
                  <div className={'flex items-center justify-center'}>
                    <h1 className={'text-xs'}>Xem tất cả</h1>
                  </div>
                  <div className={'flex items-center'}>
                    <div className={'size-4 rounded-full'}>
                      <ArrowRightIcon className={'size-4'} fill={'transparent'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className={'my-4 border-gray-700'} />
            <div className={'flex w-full items-center'}>
              <div className={'flex w-full items-center justify-between'}>
                <div className={'flex items-center'}>
                  <h1 className={'text-lg font-bold'}>Video liên quan</h1>
                </div>
                <div className={'flex items-center gap-2'}>
                  <div className={'flex items-center justify-center'}>
                    <h1 className={'text-xs'}>Xem tất cả</h1>
                  </div>
                  <div className={'flex items-center'}>
                    <div className={'size-4 rounded-full'}>
                      <ArrowRightIcon className={'size-4'} fill={'transparent'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={'flex w-1/2 flex-col'}>
            <div className={'flex w-full flex-col'}>
              <div className={'flex w-full flex-col justify-center gap-2 px-2'}>
                <div className={'flex items-center'}>
                  <h1 className={'text-xl font-bold'}>iPhone 16 Pro Max 256GB</h1>
                </div>
                <div className={'flex items-center justify-between py-2'}>
                  <div className={'flex items-center'}>
                    <h2 className={'text-sm font-medium text-gray-400'}>No.00911048</h2>
                  </div>
                  <div className={'flex items-center'}>
                    <h2 className={'text-sm font-medium text-gray-400'}>
                      Tình trạng:{' '}
                      <span className={'text-sm font-bold text-blue-500'}>Còn hàng</span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className={'flex w-full flex-col justify-center gap-2 px-2'}>
                <div className={'flex w-full items-center'}>
                  <div className={'flex w-[20%] items-center'}>
                    <h1 className={'text-md font-medium'}>Dung lượng</h1>
                  </div>
                  <div className={'flex w-[80%] items-center'}>
                    <div className={'mx-2 flex items-center justify-between gap-2 px-2'}>
                      <div className={'flex items-center justify-center'}>
                        <label className={'flex items-center'}>
                          <input type="radio" name={'option'} className={'peer hidden'} />
                          <span
                            className={
                              'rounded-md border-2 px-4 py-2 text-sm peer-checked:border-blue-500'
                            }
                          >
                            256 GB
                          </span>
                        </label>
                      </div>
                      <div className={'flex items-center justify-center'}>
                        <label className={'flex items-center'}>
                          <input type="radio" name={'option'} className={'peer hidden'} />
                          <span
                            className={
                              'rounded-md border-2 px-4 py-2 text-sm peer-checked:border-blue-500'
                            }
                          >
                            512 GB
                          </span>
                        </label>
                      </div>
                      <div className={'flex items-center justify-center'}>
                        <label className={'flex items-center'}>
                          <input type="radio" name={'option'} className={'peer hidden'} />
                          <span
                            className={
                              'rounded-md border-2 px-4 py-2 text-sm peer-checked:border-blue-500'
                            }
                          >
                            1 TB
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={'flex w-full items-center'}>
                  <div className={'flex w-[20%] items-center'}>
                    <h1 className={'text-md font-medium'}>Màu sắc</h1>
                  </div>
                  <div className={'flex w-[80%] items-center'}>
                    <div className={'mx-2 flex flex-wrap items-center justify-start gap-2 px-2'}>
                      <div className={'flex items-center justify-center gap-2 rounded-md'}>
                        <label className={'flex items-center'}>
                          <input type="radio" name={'option-color'} className={'peer hidden'} />
                          <div
                            className={
                              'flex gap-2 rounded-md border-2 px-2 py-2 text-sm peer-checked:border-blue-500'
                            }
                          >
                            <div className={'flex items-center justify-center'}>
                              <p className={'size-8 bg-blue-500'}></p>
                            </div>
                            <div className={'flex items-center justify-center'}>
                              <span className={'text-sm'}>Titan Sa mạc</span>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className={'flex items-center justify-center gap-2 rounded-md'}>
                        <label className={'flex items-center'}>
                          <input type="radio" name={'option-color'} className={'peer hidden'} />
                          <div
                            className={
                              'flex gap-2 rounded-md border-2 px-2 py-2 text-sm peer-checked:border-blue-500'
                            }
                          >
                            <div className={'flex items-center justify-center'}>
                              <p className={'size-8 bg-blue-500'}></p>
                            </div>
                            <div className={'flex items-center justify-center'}>
                              <span className={'text-sm'}>Titan Sa mạc</span>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className={'flex items-center justify-center gap-2 rounded-md'}>
                        <label className={'flex items-center'}>
                          <input type="radio" name={'option-color'} className={'peer hidden'} />
                          <div
                            className={
                              'flex gap-2 rounded-md border-2 px-2 py-2 text-sm peer-checked:border-blue-500'
                            }
                          >
                            <div className={'flex items-center justify-center'}>
                              <p className={'size-8 bg-blue-500'}></p>
                            </div>
                            <div className={'flex items-center justify-center'}>
                              <span className={'text-sm'}>Titan Sa mạc</span>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className={'flex items-center justify-center gap-2 rounded-md'}>
                        <label className={'flex items-center'}>
                          <input type="radio" name={'option-color'} className={'peer hidden'} />
                          <div
                            className={
                              'flex gap-2 rounded-md border-2 px-2 py-2 text-sm peer-checked:border-blue-500'
                            }
                          >
                            <div className={'flex items-center justify-center'}>
                              <p className={'size-8 bg-blue-500'}></p>
                            </div>
                            <div className={'flex items-center justify-center'}>
                              <span className={'text-sm'}>Titan Sa mạc</span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={'flex w-full items-center rounded-sm bg-gray-800 px-2 py-6'}>
                  <div className={'flex w-[20%] items-center'}>
                    <h1 className={'text-md font-medium'}>Giá</h1>
                  </div>
                  <div className={'flex w-[80%] items-center'}>
                    <div className={'mx-2 flex flex-wrap items-center justify-start gap-2 px-2'}>
                      <div className={'flex items-center'}>
                        <h1 className={'text-2xl font-bold text-blue-500'}>239.000đ</h1>
                      </div>
                      <div className={'flex items-center'}>
                        <h1 className={'text-xl font-bold text-gray-500 line-through'}>399.000đ</h1>
                      </div>
                      <div className={'flex items-center border border-blue-500 px-2'}>
                        <h1 className={'text-xl font-bold text-blue-500'}>-40%</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={'flex w-full items-center gap-2 px-2'}>
                  <div className={'flex w-[20%] items-center'}>
                    <h1 className={'text-md font-medium'}>Số lượng</h1>
                  </div>
                  <div className={'flex w-[80%] items-center'}>
                    <div className={'flex items-center px-2'}>
                      <div className="flex items-center justify-center gap-0 border border-gray-500">
                        <div className="flex items-center justify-center">
                          <button className="box-content bg-gray-500 px-4 py-2">-</button>
                        </div>
                        <div className="flex items-center justify-center">
                          <span className="text-md px-4 py-2 font-bold">1</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <button className="box-content bg-gray-500 px-4 py-2">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={'flex w-full items-center gap-2'}>
                  <div className={'flex w-full items-center gap-2'}>
                    <div className={'flex w-[50%] items-center'}>
                      <div className={'flex w-full items-center'}>
                        <button
                          className={
                            'w-full scale-100 transform rounded-sm border-2 border-blue-500 px-4 py-2 text-center shadow shadow-gray-700 drop-shadow-md transition-all duration-500 active:scale-95'
                          }
                        >
                          `<h1 className={'text-xl font-bold'}>THÊM VÀO GIỎ</h1>
                        </button>
                      </div>
                    </div>
                    <div className={'flex w-[50%] items-center'}>
                      <div className={'flex w-full items-center'}>
                        <button
                          className={
                            'w-full scale-100 transform rounded-sm border border-blue-500 bg-blue-500 px-4 py-2 text-center shadow shadow-gray-700 drop-shadow-md transition-all duration-500 active:scale-95'
                          }
                        >
                          <h1 className={'text-shadow text-xl font-bold'}>MUA NGAY</h1>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Mô tả saản phẩm*/}
        <hr className={'my-8 border-[0.1px] border-gray-700 shadow shadow-blue-500 blur-sm'} />
        <div className={'my-4 flex flex-col'}>
          <div className={'flex items-center justify-center'}>
            <h1 className={'my-2 text-3xl font-bold text-blue-500'}>MÔ TẢ SẢN PHẨM</h1>
          </div>
          <div className={'flex'}>
            <ProductDescription blocks={blocks} />
          </div>
        </div>
        <hr className={'my-4 border-[0.1px] border-gray-700 shadow shadow-blue-500 blur-sm'} />
      </div>
    </div>
  )
}
