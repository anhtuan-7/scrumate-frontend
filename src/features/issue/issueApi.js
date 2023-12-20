/* eslint-disable no-unused-vars */
import api from '../api';

const issueApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBacklog: builder.query({
      query: (args) => {
        return {
          url: args.sprintId
            ? `/projects/${args.projectId}/sprints/${args.sprintId}/issues` // Sprint Backlog
            : `/projects/${args.projectId}/issues`, // Product Backlog
          method: 'GET',
        };
      },
      providesTags: (result, error, args) => [
        { type: 'Issue', id: args.sprintId || Infinity },
      ],
    }),
    createIssue: builder.mutation({
      query: (args) => {
        return {
          url: args.sprintId
            ? `/projects/${args.projectId}/sprints/${args.sprintId}/issues`
            : `/projects/${args.projectId}/issues`,
          method: 'POST',
          body: {
            title: args.title || 'New Issue',
          },
        };
      },
      invalidatesTags: (result, error, args) => [
        { type: 'Issue', id: args.sprintId || Infinity },
      ],
    }),
    updateIssue: builder.mutation({
      query: (args) => {
        return {
          url: args.sprintId
            ? `/projects/${args.projectId}/sprints/${args.sprintId}/issues/${args.issueId}`
            : `/projects/${args.projectId}/issues/${args.issueId}`,
          method: 'PATCH',
          body: {
            ...args,
            assigneeId: args.assignee ? parseInt(args.assignee) : null,
            description: args.description || null,
          },
        };
      },
      invalidatesTags: (result, error, args) => [
        { type: 'Issue', id: args.sprintId || Infinity },
      ],
    }),
    deleteIssue: builder.mutation({
      query: (args) => {
        return {
          url: `/projects/${args.projectId}/issues/${args.issueId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Issue'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBacklogQuery,
  useCreateIssueMutation,
  useUpdateIssueMutation,
} = issueApi;
export { issueApi };
