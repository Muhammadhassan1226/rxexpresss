import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authslice from "./slice/authslice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
  signup: authslice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["signup"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
