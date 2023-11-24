/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BusinessLocationState {
  currentBusinessLocation: any | undefined;
  businessLocations: any[] | undefined;
  businessLocationsMeta: unknown;
}

// Define the initial state using that type
const initialState: BusinessLocationState = {
  currentBusinessLocation: null,
  businessLocations: [],
  businessLocationsMeta: null,
};

export const businessLocationSlice = createSlice({
  name: "business_locations",
  initialState,
  reducers: {
    setCurrentBusinessLocation: (state, action: PayloadAction<any | null>) => {
      state.currentBusinessLocation = action.payload;
    },
    setBusinessLocations: (state, action: PayloadAction<any[] | undefined>) => {
      state.businessLocations = action.payload;
    },
    setBusinessLocationsMeta: (state, action: PayloadAction<unknown>) => {
      state.businessLocationsMeta = action.payload;
    },
  },
});

export const { setCurrentBusinessLocation, setBusinessLocations, setBusinessLocationsMeta } =
  businessLocationSlice.actions;

export default businessLocationSlice.reducer;
