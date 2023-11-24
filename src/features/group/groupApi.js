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
        providesTags: (result, error, user) => {
          const { groups } = result.data;
          const tags = groups.map((group) => {
            return { type: 'Group', id: group.id };
          });
          return [{ type: 'CreateGroup', id: user.id }, ...tags];
        },
      }),
      createGroup: builder.mutation({
        query: (payload) => {
          return {
            url: '/groups',
            method: 'POST',
            body: {
              name: payload.name,
              description: payload.description,
            },
          };
        },
        invalidatesTags: [{ type: 'CreateGroup' }],
      }),
      getGroup: builder.query({
        query: (group) => {
          return {
            url: `/groups/${group.id}`,
            method: 'GET',
          };
        },
        providesTags: ['Group'],
      }),
    };
  },
});

export const { useGetGroupListQuery, useCreateGroupMutation } = groupApi;
export { groupApi };
