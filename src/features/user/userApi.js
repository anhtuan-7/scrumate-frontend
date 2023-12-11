import api from '../api';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (args) => {
        return {
          url: '/users',
          method: 'GET',
          params: {
            email: args.email,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetUserQuery } = userApi;

export { userApi };
