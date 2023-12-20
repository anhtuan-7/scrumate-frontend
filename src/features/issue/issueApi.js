/* eslint-disable no-unused-vars */
import api from '../api';

const issueApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBacklog: builder.query({
      query: (args) => {
        return {
          url: args.sprintId
            ? `/projects/${args.projectId}/sprints/${args.sprintId}` // Sprint Backlog
            : `/projects/${args.projectId}/issues`, // Product Backlog
          method: 'GET',
        };
      },
      providesTags: (result, error, args) => {
        const { issues } = result.data;
        const tags = issues.map((issue) => {
          return { type: 'Issue', id: issue.id };
        });
        return ['Issue', ...tags];
      },
    }),
    createIssue: builder.mutation({
      query: (args) => {
        return {
          url: `/projects/${args.projectId}/issues`,
          method: 'POST',
          body: { title: args.title || 'New Issue' },
        };
      },
      invalidatesTags: ['Issue'],
    }),
    getIssue: builder.query({
      query: (args) => {
        return {
          url: `/projects/${args.projectId}/issues/${args.issueId}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, args) => [
        { type: 'Issue', id: args.issueId },
      ],
    }),
    updateIssue: builder.mutation({
      query: (args) => {
        return {
          url: `/projects/${args.projectId}/issues/${args.issueId}`,
          method: 'PATCH',
          body: {
            ...args,
            assigneeId: args.assignee ? parseInt(args.assignee) : null,
            description: args.description || null,
          },
        };
      },
      invalidatesTags: (result, error, args) => [
        { type: 'Issue', id: args.issueId },
      ],
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
