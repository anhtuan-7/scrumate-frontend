import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { url } from "../constants";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: url, credentials: "include" }),
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (payload) => {
          return {
            url: "/login",
            method: "POST",
            body: {
              email: payload.email,
              password: payload.password,
            },
          };
        },
      }),
    };
  },
});

export const { useLoginMutation } = authApi;
export { authApi };
