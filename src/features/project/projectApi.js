/* eslint-disable no-unused-vars */
import api from '../api';

const projectApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getProjectList: builder.query({
        query: (args) => {
          return {
            url: args.groupId
              ? `/groups/${args.groupId}/projects` // Group Project
              : '/projects', // All Projects
            method: 'GET',
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
            url: `/groups/${payload.groupId}/projects`,
            method: 'POST',
            body: payload,
          };
        },
        invalidatesTags: ['Project'],
      }),
      getProject: builder.query({
        query: (args) => {
          return {
            url: `/projects/${args.projectId}`,
            method: 'GET',
          };
        },
        providesTags: ['Project'],
      }),
      getKanbanBoard: builder.query({
        query: (args) => {
          return {
            url: `/projects/${args.projectId}/kanban`,
            method: 'GET',
          };
        },
        providesTags: ['Project', 'Issue', 'Sprint'],
      }),
    };
  },
});

export const {
  useGetProjectListQuery,
  useCreateProjectMutation,
  useGetProjectQuery,
  useGetKanbanBoardQuery,
} = projectApi;
export { projectApi };
