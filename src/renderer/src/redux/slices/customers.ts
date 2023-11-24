/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CustomerState {
  currentCustomer: any | null;
  customers: any[];
  customerMeta: unknown;
}

// Define the initial state using that type
const initialState: CustomerState = {
  currentCustomer: null,
  customers: [],
  customerMeta: null
};

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCurrentCustomer: (state, action: PayloadAction<any | null>) => {
      state.currentCustomer = action.payload;
    },
    setCustomers: (state, action: PayloadAction<any[]>) => {
      state.customers = action.payload;
    },
    setCustomerMeta: (state, action: PayloadAction<unknown>) => {
      state.customerMeta = action.payload
    }
  },
});

export const { setCurrentCustomer, setCustomerMeta, setCustomers } = customerSlice.actions;


export default customerSlice.reducer;
