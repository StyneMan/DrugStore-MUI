/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PurchaseState {
  paymentMethod: string;
  paymentMethods: unknown[] | undefined;
  carts: unknown[] | undefined;
  drafts: unknown[] | undefined;
  sales: any[] | undefined;
  salesMeta: unknown;
  change: number;
  amountPaid: number;
}

// Define the initial state using that type
const initialState: PurchaseState = {
  paymentMethod: "",
  paymentMethods: [],
  carts: [],
  drafts: [],
  sales: [],
  change: 0,
  salesMeta: null,
  amountPaid: 0,
};

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    setPaymentMethods: (
      state,
      action: PayloadAction<unknown[] | undefined>
    ) => {
      state.paymentMethods = action.payload;
    },
    setCarts: (state, action: PayloadAction<unknown[] | undefined>) => {
      state.carts = action.payload;
    },
    setDrafts: (state, action: PayloadAction<unknown[] | undefined>) => {
      state.drafts = action.payload;
    },
    setChange: (state, action: PayloadAction<number>) => {
      state.change = action.payload;
    },
    setAmountPaid: (state, action: PayloadAction<number>) => {
      state.amountPaid = action.payload;
    },
    setSales: (state, action: PayloadAction<any[] | undefined>) => {
      state.sales = action.payload;
    },
    setSalesMeta: (state, action: PayloadAction<unknown>) => {
      state.salesMeta = action.payload;
    },
  },
});

export const {
  setPaymentMethod,
  setPaymentMethods,
  setCarts,
  setDrafts,
  setAmountPaid,
  setChange,
  setSales,
  setSalesMeta,
} = purchaseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getAuth = (state: RootState) => state.auth.isAuth;
// export const getProfile = (state: RootState) => state.auth.profile;

export default purchaseSlice.reducer;
