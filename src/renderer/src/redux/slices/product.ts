/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface ProductState {
  products: any;
}

// Define the initial state using that type
const initialState: ProductState = {
  products: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any>) => {
      state.products = action.payload;
    },
  },
});

export const selectProducts = (state: RootState) => state.product.products;

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
