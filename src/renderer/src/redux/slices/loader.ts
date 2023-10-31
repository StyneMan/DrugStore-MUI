import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

// Define a type for the slice state
interface LoaderState {
  isLoading: boolean;
  isOnline: boolean;
}

// Define the initial state using that type
const initialState: LoaderState = {
  isLoading: false,
  isOnline: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});

export const { setLoading, setOnline } = loaderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getLoading = (state: RootState) => state.loader.isLoading;

export default loaderSlice.reducer;
