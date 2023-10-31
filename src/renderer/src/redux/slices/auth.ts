import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface AuthState {
  isAuth: boolean;
  profile: unknown;
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuth: false,
  profile: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setProfile: (state, action: PayloadAction<unknown>) => {
      state.profile = action.payload;
    },
  },
});

export const { setAuth, setProfile } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getAuth = (state: RootState) => state.auth.isAuth;
export const getProfile = (state: RootState) => state.auth.profile;

export default authSlice.reducer;