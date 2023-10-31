import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CategoryState {
  categories: any;
  selectedCategoryItems: any;
  isItemClicked: boolean;
}

// Define the initial state using that type
const initialState: CategoryState = {
  categories: null,
  selectedCategoryItems: [],
  isItemClicked: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any>) => {
      state.categories = action.payload;
    },
    setItemClicked: (state, action: PayloadAction<boolean>) => {
      state.isItemClicked = action.payload;
    },
    setSelectedCategoryItems: (state, action: PayloadAction<any>) => {
      state.selectedCategoryItems = action.payload;
    },
  },
});

export const { setCategories, setItemClicked, setSelectedCategoryItems } = categorySlice.actions;

export default categorySlice.reducer;
