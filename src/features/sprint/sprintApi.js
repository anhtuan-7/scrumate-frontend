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
      createSprint: builder.mutation({
        query: (args) => {
          return {
            url: `/projects/${args.projectId}/sprints`,
            method: 'POST',
            body: {
              name: `Sprint ${args.sprintsNumber}`,
            },
          };
        },
        invalidatesTags: ['Sprint'],
      }),
      startSprint: builder.mutation({
        query: (args) => {
          return {
            url: `/projects/${args.projectId}/sprints/${args.sprintId}/start`,
            method: 'PATCH',
            body: {
              startDate: args.startDate,
              duration: args.duration,
              sprintGoal: args.sprintGoal || null,
            },
          };
        },
        invalidatesTags: (result, error, args) => [
          'Sprint',
          { type: 'Issue', id: args.sprintId },
        ],
      }),
      completeSprint: builder.mutation({
        query: (args) => {
          return {
            url: `/projects/${args.projectId}/sprints/${args.sprintId}/complete`,
            method: 'PATCH',
            body: {},
          };
        },
        invalidatesTags: (result, error, args) => [
          'Sprint',
          { type: 'Issue', id: args.sprintId },
          { type: 'Issue', id: Infinity },
        ],
      }),
    };
  },
  overrideExisting: false,
});

export const {
  useGetSprintListQuery,
  useCreateSprintMutation,
  useStartSprintMutation,
  useCompleteSprintMutation,
} = sprintApi;
export { sprintApi };
