/* eslint-disable no-unused-vars */
import api from '../api';

const issueApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBacklog: builder.query({
      query: (args) => {
        return {
          url: args.sprintId
            ? `/projects/${args.projectId}/sprints/${args.sprintId}`
            : `/projects/${args.projectId}/issues`,
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
    updateIssue: builder.mutation({}),
  }),
  overrideExisting: false,
});

export const { useGetBacklogQuery, useCreateIssueMutation } = issueApi;
export { issueApi };
