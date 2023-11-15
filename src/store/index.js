import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { userReducer } from "./slices/userSlice";
import { authApi } from "./apis/authApis";

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});

setupListeners(store.dispatch);

export * from "./thunks/checkLogin";
export { useLoginMutation } from "./apis/authApis";
