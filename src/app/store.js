import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { userReducer } from '../features/authentication/userSlice';

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

setupListeners(store.dispatch);
