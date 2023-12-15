/* eslint-disable no-unused-vars */
import api from '../api';

const groupUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGroupMember: builder.query({
      query: (args) => {
        return {
          url: `/groups/${args.groupId}/members`,
          method: 'GET',
          params: { page: args.page },
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
    getMemberDetail: builder.query({
      query: (args) => {
        return {
          url: `/groups/${args.groupId}/members/${args.memberId}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, args) => {
        return [{ type: 'GroupUser', id: args.memberId }];
      },
    }),
    addGroupMember: builder.mutation({
      query: (args) => {
        return {
          url: `/groups/${args.groupId}/members`,
          method: 'POST',
          body: {
            email: args.email,
            role: args.role,
          },
        };
      },
      invalidatesTags: ['GroupUser'],
    }),
    changeGroupMemberRole: builder.mutation({
      query: (args) => {
        return {
          url: `/groups/${args.groupId}/members/${args.memberId}`,
          method: 'PATCH',
          body: {
            role: args.role,
          },
        };
      },
      invalidatesTags: (result, error, args) => [
        { type: 'GroupUser', id: args.memberId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGroupMemberQuery,
  useAddGroupMemberMutation,
  useChangeGroupMemberRoleMutation,
  useLazyGetMemberDetailQuery,
} = groupUserApi;
export { groupUserApi };
