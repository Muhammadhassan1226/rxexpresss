import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authslice from "./slice/authslice";
import orderReducer from "./slice/orderslice"; // Import the reducer
import AsyncStorage from "@react-native-async-storage/async-storage";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authslice,
  order: orderReducer, // Use the reducer from orderslice
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "order"], // Specify reducers to persist
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist
    }),
});

// Type definitions for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persistor instance
export const persistor = persistStore(store);
