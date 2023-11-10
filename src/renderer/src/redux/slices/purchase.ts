import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PurchaseState {
  currentCustomer: any | null;
  paymentMethod: string;
  paymentMethods: any[] | undefined;
  carts: any[] | undefined;
  drafts: any[] | undefined;
}

// Define the initial state using that type
const initialState: PurchaseState = {
  currentCustomer: null,
  paymentMethod: "",
  paymentMethods: [],
  carts: [],
  drafts: [],
};

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setCurrentCustomer: (state, action: PayloadAction<any | null>) => {
      state.currentCustomer = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    setPaymentMethods: (state, action: PayloadAction<any[] | undefined>) => {
      state.paymentMethods = action.payload;
    },
    setCarts: (state, action: PayloadAction<any[] | undefined>) => {
      state.carts = action.payload
    },
    setDrafts: (state, action: PayloadAction<any[] | undefined>) => {
      state.drafts = action.payload
    }
  },
});

export const { setCurrentCustomer, setPaymentMethod, setPaymentMethods, setCarts, setDrafts } = purchaseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getAuth = (state: RootState) => state.auth.isAuth;
// export const getProfile = (state: RootState) => state.auth.profile;

export default purchaseSlice.reducer;
