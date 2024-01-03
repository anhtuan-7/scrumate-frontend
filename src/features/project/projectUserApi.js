/* eslint-disable no-unused-vars */
import api from '../api';

const projectUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjectUserList: builder.query({
      query: (args) => {
        return {
          url: `/projects/${args.projectId}/users`,
          method: 'GET',
          params: { page: args.page, all: args.all },
        };
      },
      providesTags: (result, error, args) => {
        const { members } = result.data;
        const tags = members.map((member) => {
          return { type: 'ProjectUser', id: member.id };
        });
        return ['ProjectUser', ...tags];
      },
    }),
    addProjectUser: builder.mutation({
      query: (args) => {
        return {
          url: `/projects/${args.projectId}/users`,
          method: 'POST',
          body: {
            email: args.email,
            role: args.role,
          },
        };
      },
      invalidatesTags: ['ProjectUser'],
    }),
    updateProjectUserRole: builder.mutation({
      query: (args) => {
        return {
          url: `/projects/${args.projectId}/users/${args.userId}`,
          method: 'PATCH',
          body: {
            role: args.role,
          },
        };
      },
      invalidatesTags: (result, error, args) => [
        { type: 'ProjectUser', id: args.userId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProjectUserListQuery,
  useAddProjectUserMutation,
  useUpdateProjectUserRoleMutation,
} = projectUserApi;
export { projectUserApi };
