import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToAuth: (state, action) => {
      const { data } = action.payload;
      state.accessToken = data?.accessToken;
    },
    logOut: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return initialState;
    },
  },
});

export const { saveToAuth, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
export const selectAccessToken = (state) => state?.auth?.accessToken;
// export const selectCurrentUser = (state) => state.auth.user;
// export const selectRefreshToken = (state) => state.auth.refreshToken;
