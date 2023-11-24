import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authApi } from '../features/authentication/authApi';
import statusSlice from '../features/authentication/statusSlice';
import { groupApi } from '../features/group/groupApi';

export const store = configureStore({
  reducer: {
    status: statusSlice,
    [authApi.reducerPath]: authApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(groupApi.middleware);
  },
});

setupListeners(store.dispatch);
