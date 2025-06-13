import { RootState } from "@/shared/redux/store";
import { OrderInformationType } from "./types/CreateOrderType";

export const selectOrderInformation = (state: RootState): OrderInformationType => state.createOrder;