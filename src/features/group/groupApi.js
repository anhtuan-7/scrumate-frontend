/* eslint-disable no-unused-vars */
import api from '../api';

const groupApi = api.injectEndpoints({
  overrideExisting: false,
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
          return ['Group', ...tags];
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
        invalidatesTags: ['Group'],
      }),
      getGroup: builder.query({
        query: (args) => {
          return {
            url: `/groups/${args.groupId}`,
            method: 'GET',
          };
        },
        providesTags: (result, error, arg) => [
          { type: 'Post', id: arg.userId },
        ],
      }),
      updateGroup: builder.mutation({}),
      deleteGroup: builder.mutation({}),
    };
  },
});

export const {
  useGetGroupListQuery,
  useGetGroupQuery,
  useCreateGroupMutation,
} = groupApi;
export { groupApi };
