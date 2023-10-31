import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import tempProducts from "../../data/products";
// import type { RootState } from "../store";

// Define a type for the slice state
interface SearchState {
  searchKey: string;
  sorting: object | null;
  filteredProducts: unknown;
}

// Define the initial state using that type
const initialState: SearchState = {
  searchKey: "",
  sorting: null,
  filteredProducts: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
    setFilteredProducts: (state, action: PayloadAction<unknown>) => {
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
