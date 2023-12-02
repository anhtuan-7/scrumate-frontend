import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../utils/constants';

const projectApi = createApi({
  reducerPath: 'project',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => {
    return {
      getProjectList: builder.query({
        query: () => {
          return {
            url: 'projects',
            method: 'GET',
            params: { order: 'desc' },
          };
        },
        providesTags: (result, error, user) => {
          const { projects } = result.data;
          const tags = projects.map((project) => {
            return { type: 'Project', id: project.id };
          });
          return [{ type: 'CreateProject', id: user.id }, ...tags];
        },
      }),
      createProject: builder.mutation({
        query: (payload) => {
          return {
            url: '/projects',
            method: 'POST',
            body: {
              name: payload.name,
              key: payload.key,
              description: payload.description,
              repository: payload.repository,
            },
          };
        },
        invalidatesTags: [{ type: 'CreateProject' }],
      }),
    };
  },
});

export const { useGetProjectListQuery, useCreateProjectMutation } = projectApi;
export { projectApi };
