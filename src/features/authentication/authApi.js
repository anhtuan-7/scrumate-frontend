import api from '../api';

const authApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      signUp: builder.mutation({
        query: (payload) => {
          return {
            url: '/signUp',
            method: 'POST',
            body: payload,
          };
        },
      }),
      login: builder.mutation({
        query: (payload) => {
          return {
            url: '/login',
            method: 'POST',
            body: payload,
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
  overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation, useSignUpMutation } =
  authApi;
export { authApi };
