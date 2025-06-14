import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderInformation } from "./types/CreateOrderType";

const initialState: OrderInformation = {
    orderName: "",
    orderAddress: "",
    orderEmail: "",
    orderPhoneNumber: ""
}

export const createOrderSlice = createSlice({
    name: 'createOrder',
    initialState,
    reducers: {
        updateInformation: (state, action: PayloadAction<{ field: keyof OrderInformation; value: string}>) => {
            const { field, value} = action.payload;
            state[field] = value;
        },
        resetInformation: () => initialState
    }
})

export const { updateInformation, resetInformation } = createOrderSlice.actions;
export default createOrderSlice.reducer;