export interface Order {
    id: number,
    orderName: string,
    orderAddress: string,
    orderEmail: string,
    orderPhoneNumber: string,
    orderTime: string,
    status: string,
    totalAmount: number
}

export interface OrderDetail {
    id: number,
    userId: number,
    orderName: string,
    orderAddress: string,
    orderEmail: string,
    orderPhoneNumber: string,
    orderTime: string,
    status: string,
    totalAmount: number,
    orderItemList: OrderItemDetail[],
    payment: PaymentDetail
}

export interface OrderItemDetail {
    id: number,
    productName: string,
    sku: string,
    imgUrl: string,
    unitPrice: number,
    quantity: number
}

export interface PaymentDetail {
    id: number,
    amount: number,
    paymentMethod: string,
    paymentStatus: string,
    paymentGateway: string
}