import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import api from '../features/api';
import { authApi } from '../features/authentication/authApi';
import statusSlice from '../features/authentication/statusSlice';
import { groupApi } from '../features/group/groupApi';
import { projectApi } from '../features/project/projectApi';

export const store = configureStore({
  reducer: {
    status: statusSlice,
    [api.reducerPath]: api,
    [authApi.reducerPath]: authApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(api.middleware)
      .concat(authApi.middleware)
      .concat(groupApi.middleware)
      .concat(projectApi.middleware);
  },
});

setupListeners(store.dispatch);
