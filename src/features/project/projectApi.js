/* eslint-disable no-unused-vars */
import api from '../api';

const projectApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getProjectList: builder.query({
        query: (args) => {
          return {
            url: args.groupId
              ? `/groups/${args.groupId}/projects`
              : '/projects',
            method: 'GET',
            params: { order: 'desc' },
          };
        },
        providesTags: (result, error, user) => {
          const { projects } = result.data;
          const tags = projects.map((project) => {
            return { type: 'Project', id: project.id };
          });
          return ['Project', ...tags];
        },
      }),
      createProject: builder.mutation({
        query: (payload) => {
          return {
            url: '/',
            method: 'POST',
            body: {
              name: payload.name,
              key: payload.key,
              description: payload.description,
              repository: payload.repository,
            },
          };
        },
        invalidatesTags: ['Project'],
      }),
    };
  },
});

export const { useGetProjectListQuery, useCreateProjectMutation } = projectApi;
export { projectApi };
