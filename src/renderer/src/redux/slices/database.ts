import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface BDState {
  dbasePath: string;
}

// Define the initial state using that type
const initialState: BDState = {
  dbasePath: "",
};

export const authSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    setDatabasePath: (state, action: PayloadAction<string>) => {
      state.dbasePath = action.payload;
    },
  },
});

export const { setDatabasePath } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getAuth = (state: RootState) => state.auth.isAuth;
export const getProfile = (state: RootState) => state.auth.profile;

export default authSlice.reducer;
