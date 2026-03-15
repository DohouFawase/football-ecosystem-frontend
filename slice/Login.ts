import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoginData } from "@/interfaces/auth";
import { getAccessToken } from "@/utils/tokenStorage";
// Define a type for the slice state
interface LoginState {
  user: LoginData | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

// Define the initial state using that type
const initialState: LoginState = {
  user: null,
  error: null,
   accessToken: getAccessToken(),
  refreshToken: null,
  isAuthenticated: !!getAccessToken(),
};

export const loginSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state) => {},
  },
});

export const { login } = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default loginSlice.reducer;
