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
      providesTags: (result, error, args) => [{ type: 'User', id: args.email }],
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetUserQuery } = userApi;

export { userApi };
