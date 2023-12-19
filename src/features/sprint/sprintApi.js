/* eslint-disable no-unused-vars */
import api from '../api';

const sprintApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSprintList: builder.query({
        query: (args) => {
          return {
            url: `/projects/${args.projectId}/sprints`,
            method: 'GET',
          };
        },
        providesTags: (result, error, user) => {
          const { sprints } = result.data;
          const tags = sprints.map((sprint) => {
            return { type: 'Sprint', id: sprint.id };
          });
          return ['Sprint', ...tags];
        },
      }),
    };
  },
  overrideExisting: false,
});

export const { useGetSprintListQuery } = sprintApi;
export { sprintApi };
