import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../utils/constants';

const groupApi = createApi({
  reducerPath: 'group',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => {
    return {
      getGroupList: builder.query({
        query: () => {
          return {
            url: '/groups',
            method: 'GET',
          };
        },
        providesTags: (result, error, args) => {
          const { groups } = result.data;
          const tags = groups.map((group) => {
            return { type: 'Group', id: group.id };
          });
          return [{ type: 'CreateGroup', id: args.userId }, ...tags];
        },
      }),
      createGroup: builder.mutation({
        query: (args) => {
          return {
            url: '/groups',
            method: 'POST',
            body: {
              name: args.name,
              description: args.description,
            },
          };
        },
        invalidatesTags: (result, error, args) => [
          { type: 'CreateGroup', id: args.userId },
        ],
      }),
      getGroup: builder.query({
        query: (args) => {
          return {
            url: `/groups/${args.groupId}`,
            method: 'GET',
          };
        },
        providesTags: ['Group'],
      }),
    };
  },
});

export const {
  useGetGroupListQuery,
  useGetGroupQuery,
  useCreateGroupMutation,
} = groupApi;
export { groupApi };
