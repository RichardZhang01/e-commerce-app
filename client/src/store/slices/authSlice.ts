import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { isJwtExpired } from "@/helpers/checkJwtExpiration";

interface User {
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      const token = action.payload;

      if (isJwtExpired(token)) {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        return;
      }

      state.token = token;
      const decoded: User = jwtDecode(token);
      state.user = decoded;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearAuth } = authSlice.actions;

export default authSlice.reducer;
