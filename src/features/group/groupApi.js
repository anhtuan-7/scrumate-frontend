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
        providesTags: (result, error, arg) => {
          const { groups } = result.data;
          const tags = groups.map((group) => {
            return { type: 'Group', id: group.id };
          });
          return [{ type: 'CreateGroup', id: arg.id }, ...tags];
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
