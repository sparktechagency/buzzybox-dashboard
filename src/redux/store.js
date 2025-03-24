import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/baseApi";
import storage from "redux-persist/lib/storage";
import {
  PERSIST,
  persistReducer,
  persistStore,
  REHYDRATE,
} from "redux-persist";
import AuthReducer from "./features/auth/authSlice";

// Persistence configuration for auth
const persistAuthConfig = {
  key: "auth",
  storage,
};

// Persisted reducers
const persistedAuthReducer = persistReducer(persistAuthConfig, AuthReducer);

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST],
      },
    }).concat(api.middleware),
});

export default store;

export const persistore = persistStore(store);