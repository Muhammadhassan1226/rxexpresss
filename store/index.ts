import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authslice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
