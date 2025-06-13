export interface OrderRequest {
    userId: number,
    orderName: string,
    orderAddress: string,
    orderEmail: string,
    orderPhoneNumber: string
    totalAmount: number
    orderItems: OrderItemRequest[]
}

export interface OrderInformationType {
    orderName: string,
    orderAddress: string,
    orderEmail: string,
    orderPhoneNumber: string
}

export interface OrderItemRequest {
    productVariationId: number,
    unitPrice: number,
    quantity: number
}