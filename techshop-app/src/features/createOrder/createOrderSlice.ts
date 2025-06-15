import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderInformationType, OrderType } from "./types/CreateOrderType";

const initialState: OrderType = {
    orderId: 0,
    info: {
        orderName: "",
        orderAddress: "",
        orderEmail: "",
        orderPhoneNumber: ""
    }
}

export const createOrderSlice = createSlice({
    name: 'createOrder',
    initialState,
    reducers: {
        updateInformation: (state, action: PayloadAction<{ field: keyof OrderInformationType; value: string}>) => {
            const { field, value} = action.payload;
            state.info[field] = value;
        },
        updateOrderId: (state, action: PayloadAction<number>) => {
            state.orderId = action.payload;
        },
        resetInformation: () => initialState
    }
})

export const { updateInformation, updateOrderId, resetInformation } = createOrderSlice.actions;
export default createOrderSlice.reducer;