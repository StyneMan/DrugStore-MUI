import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PurchaseState {
  currentCustomer: object | null;
  paymentMethod: string;
}

// Define the initial state using that type
const initialState: PurchaseState = {
  currentCustomer: null,
  paymentMethod: "",
};

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setCurrentCustomer: (state, action: PayloadAction<object | null>) => {
      state.currentCustomer = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const { setCurrentCustomer, setPaymentMethod } = purchaseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getAuth = (state: RootState) => state.auth.isAuth;
// export const getProfile = (state: RootState) => state.auth.profile;

export default purchaseSlice.reducer;
