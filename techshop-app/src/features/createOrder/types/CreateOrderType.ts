export interface OrderType {
    orderId: number,
    info: OrderInformationType
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