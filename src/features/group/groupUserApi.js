/* eslint-disable no-unused-vars */
import api from '../api';

const groupUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGroupUserList: builder.query({
      query: (args) => {
        return {
          url: `/groups/${args.groupId}/users`,
          method: 'GET',
          params: { page: args.page, all: args.all },
        };
      },
      providesTags: (result, error, args) => {
        const { members } = result.data;
        const tags = members.map((member) => {
          return { type: 'GroupUser', id: member.id };
        });
        return ['GroupUser', ...tags];
      },
    }),
    getGroupUser: builder.query({
      query: (args) => {
        return {
          url: `/groups/${args.groupId}/users/${args.userId}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, args) => {
        return [{ type: 'GroupUser', id: args.userId }];
      },
    }),
    addGroupUser: builder.mutation({
      query: (args) => {
        return {
          url: `/groups/${args.groupId}/users`,
          method: 'POST',
          body: {
            email: args.email,
            role: args.role,
          },
        };
      },
      invalidatesTags: ['GroupUser'],
    }),
    updateGroupUserRole: builder.mutation({
      query: (args) => {
        return {
          url: `/groups/${args.groupId}/users/${args.userId}`,
          method: 'PATCH',
          body: {
            role: args.role,
          },
        };
      },
      invalidatesTags: (result, error, args) => [
        { type: 'GroupUser', id: args.userId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGroupUserListQuery,
  useLazyGetGroupUserListQuery,
  useAddGroupUserMutation,
  useUpdateGroupUserRoleMutation,
} = groupUserApi;
export { groupUserApi };
