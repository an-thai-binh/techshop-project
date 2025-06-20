import { selectCartItems } from '@/features/cart/cartSelectors'
import { CartItemType } from '@/features/cart/types/CartItemType'
import { useAppDispatch, useAppSelector } from '@/shared/redux/hook'
import { formatVietNamCurrency } from '@/utils/AppFormatter'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { selectOrderInformation } from '../createOrderSelectors'
import { updateInformation, updateOrderId } from '../createOrderSlice'
import { OrderInformationType } from '../types/CreateOrderType'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import api from '@/utils/APIAxiosConfig'
import { EndpointAPI } from '@/api/EndpointAPI'
import { getUserId } from '@/app/(auth)/auth/action'

type InformationPageProps = {
  setStage: React.Dispatch<React.SetStateAction<number>>
}

const formSchema = z.object({
  orderName: z.string().min(1, 'Vui lòng nhập họ tên của bạn'),
  orderAddress: z.string().min(1, 'Vui lòng nhập địa chỉ nhận hàng'),
  orderEmail: z.string().email('Email chưa hợp lệ').min(1, 'Vui lòng nhập địa chỉ email'),
  orderPhoneNumber: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .max(15, 'Số điện thoại phải chỉ được có tối đa 15 ký tự'),
})

type FormData = z.infer<typeof formSchema>

export default function OrderInformation({ setStage }: InformationPageProps) {
  const dispatch = useAppDispatch()
  const carts: CartItemType[] = useAppSelector(selectCartItems)
  const { orderName, orderAddress, orderEmail, orderPhoneNumber } =
    useAppSelector(selectOrderInformation)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      orderName,
      orderAddress,
      orderEmail,
      orderPhoneNumber,
    },
  })

  useEffect(() => {
    watch((value) => {
      for (const key in value) {
        dispatch(
          updateInformation({
            field: key as keyof OrderInformationType,
            value: value[key as keyof FormData] ?? '',
          }),
        )
      }
    })
  }, [watch, dispatch])

  const onSubmit = async (data: FormData) => {
    const items = carts.map(({ productVariationId, productFinalPrice, quantity }) => ({
      variationId: productVariationId,
      unitPrice: productFinalPrice,
      quantity: quantity,
    }))
    if (!items) {
      setStage(0)
      throw new Error('Empty order items')
    }
    const userId = await getUserId()
    const requestBody = {
      userId: userId,
      orderName: data.orderName,
      orderAddress: data.orderAddress,
      orderEmail: data.orderEmail,
      orderPhoneNumber: data.orderPhoneNumber,
      orderItems: items,
    }
    try {
      const response = await api.post(EndpointAPI.ORDER_STORE, requestBody)
      if (response.data.success) {
        const orderId = response.data.data.id
        dispatch(updateOrderId(orderId))
        setStage(2)
      }
    } catch (error: any) {
      setStage(0)
      const message = error.response?.data.message || error.message
      throw new Error('Create order failed: ' + message)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="max-h-fit rounded bg-white p-4 shadow-sm lg:order-2">
        <h3 className="mb-4 text-sm font-bold">{carts.length} SẢN PHẨM</h3>
        {carts.map((item) => {
          return (
            <div key={item.id} className="mb-4 flex gap-4">
              <Image
                src={item.productImgUrl}
                alt="product"
                width={60}
                height={60}
                className="flex h-[60px] w-[60px] items-center justify-center object-cover"
              />
              <div className="w-full">
                <p className="text-sm font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">{item.sku}</p>
                <div className="flex">
                  <p className="basis-1/4 text-sm text-gray-500">
                    SL: <b>{item.quantity}</b>
                  </p>
                  <div className="basis-2/4"></div>
                  <p className="basis-2/4 text-sm text-gray-500">
                    ĐG: <b>{formatVietNamCurrency(item.productFinalPrice)}</b>
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        <div className="border-t pt-4">
          <div className="flex justify-between text-sm">
            <span>Tổng</span>
            <span>
              {formatVietNamCurrency(
                carts.reduce((sum, item) => {
                  return sum + item.productFinalPrice * item.quantity
                }, 0),
              )}
            </span>
          </div>
          <div className="mt-2 flex justify-between text-sm font-bold">
            <span>Thành tiền</span>
            <span>
              {formatVietNamCurrency(
                carts.reduce((sum, item) => {
                  return sum + item.productFinalPrice * item.quantity
                }, 0),
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-6 lg:order-1 lg:col-span-2">
        <div className="text-2xl font-bold uppercase">
          <p className="text-center tracking-widest">Thông tin đặt hàng</p>
        </div>

        <div className="bg-white p-3 shadow-sm">
          <label className="text-md mb-1 block font-bold uppercase">Tên khách hàng</label>
          <div className="flex gap-2">
            <input
              {...register('orderName')}
              className="w-full rounded border bg-white px-4 py-2 dark:bg-gray-950"
              placeholder="VD: Nguyễn Văn A"
            />
          </div>
          {errors.orderName && (
            <span className="ms-1 text-sm font-medium text-red-500">
              {errors.orderName.message}
            </span>
          )}
        </div>
        <div className="bg-white p-3 shadow-sm">
          <label className="text-md mb-1 block font-bold uppercase">Email</label>
          <div className="flex gap-2">
            <input
              {...register('orderEmail')}
              className="w-full rounded border bg-white px-4 py-2"
              placeholder="VD: examplee@gmail.com"
            />
          </div>
          {errors.orderEmail && (
            <span className="ms-1 text-sm font-medium text-red-500">
              {errors.orderEmail.message}
            </span>
          )}
        </div>
        <div className="bg-white p-3 shadow-sm">
          <label className="text-md mb-1 block font-bold uppercase">Số điện thoại</label>
          <div className="flex gap-2">
            <input
              {...register('orderPhoneNumber')}
              className="w-full rounded border bg-white px-4 py-2"
              placeholder="VD: 0909090909"
            />
          </div>
          {errors.orderPhoneNumber && (
            <span className="ms-1 text-sm font-medium text-red-500">
              {errors.orderPhoneNumber.message}
            </span>
          )}
        </div>
        <div className="bg-white p-3 shadow-sm">
          <label className="text-md mb-1 block font-bold uppercase">Địa chỉ nhận hàng</label>
          <div className="flex gap-2">
            <input
              {...register('orderAddress')}
              className="w-full rounded border bg-white px-4 py-2"
              placeholder="VD: 3/6/9 đường Tesla, quận Edison"
            />
          </div>
          {errors.orderAddress && (
            <span className="ms-1 text-sm font-medium text-red-500">
              {errors.orderAddress.message}
            </span>
          )}
        </div>
        <button
          className="mt-4 w-full rounded bg-blue-500 py-3 font-bold uppercase text-white hover:shadow-md"
          onClick={handleSubmit(onSubmit)}
        >
          Thanh toán
        </button>
        <p className="my-2 text-sm text-gray-600">
          Bằng việc đặt hàng, bạn đồng ý với{' '}
          <a href="#" className="underline">
            Điều khoản và các chính sách
          </a>{' '}
          về{' '}
          <a href="#" className="underline">
            quyền riêng tư
          </a>{' '}
          và{' '}
          <a href="#" className="underline">
            trả hàng
          </a>
          .
        </p>
      </div>
    </div>
  )
}
