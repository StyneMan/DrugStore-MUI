/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { selectProducts } from "./product";

// Define a type for the slice state
interface SearchState {
  searchKey: string;
  sorting: object | null;
  filteredProducts: any[] | undefined;
}

// Define the initial state using that type
const initialState: SearchState = {
  searchKey: "",
  sorting: null,
  filteredProducts:  [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
    setFilteredProducts: (state, action: PayloadAction<any[] | undefined>) => {
      state.filteredProducts = action.payload;
    },
    setSorting: (state, action: PayloadAction<object | null>) => {
      state.sorting = action.payload;
    },
  },
});

export const { setSearchKey, setFilteredProducts, setSorting } =
  searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getAuth = (state: RootState) => state.auth.isAuth;
// export const getProfile = (state: RootState) => state.auth.profile;

export default searchSlice.reducer;
