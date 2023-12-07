/* eslint-disable no-unused-vars */
import api from '../api';

const groupUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGroupMember: builder.query({
      query: (args) => {
        return {
          url: `/groups/${args.groupId}/members`,
          method: 'GET',
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
    addMember: builder.mutation({
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
    changeRole: builder.mutation({}),
  }),
  overrideExisting: false,
});

export const {
  useGetGroupMemberQuery,
  useAddMemberMutation,
  useChangeRoleMutation,
} = groupUserApi;
export { groupUserApi };
