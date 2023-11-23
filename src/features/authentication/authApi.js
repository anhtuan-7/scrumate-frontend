import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../utils/constants';

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => {
    return {
      verify: builder.query({
        query: () => {
          return { url: '/verify', method: 'GET' };
        },
      }),
      signUp: builder.mutation({
        query: (payload) => {
          return {
            url: '/signUp',
            method: 'POST',
            body: {
              name: payload.name,
              email: payload.email,
              password: payload.password,
              confirmPassword: payload.confirmPassword,
            },
          };
        },
      }),
      login: builder.mutation({
        query: (payload) => {
          return {
            url: '/login',
            method: 'POST',
            body: {
              email: payload.email,
              password: payload.password,
            },
          };
        },
      }),
      logout: builder.mutation({
        query: () => {
          return {
            url: '/logout',
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useVerifyQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
} = authApi;
export { authApi };
