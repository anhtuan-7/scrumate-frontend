import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

setupListeners(store.dispatch);

export * from './thunks/checkLogin';
export * from './thunks/login';
export * from './thunks/logout';
