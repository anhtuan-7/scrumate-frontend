import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import api from '../features/api';
import { authApi } from '../features/authentication/authApi';
import statusSlice from '../features/authentication/statusSlice';

export const store = configureStore({
  reducer: {
    status: statusSlice,
    [api.reducerPath]: api,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

setupListeners(store.dispatch);
