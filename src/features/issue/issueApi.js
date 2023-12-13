import api from '../api';

const issueApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBacklog: builder.query({
      query: (args) => {
        return {
          url: `/projects/${args.projectId}/issues`,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetBacklogQuery } = issueApi;
export { issueApi };
