import {
  GetCurrentUserResponse,
  GetUsersResponseType,
  LoginResponseType,
} from "@/types/api.types";
import { LoginType, SignUpType } from "@/validations";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: async (headers) => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  endpoints: (build) => ({
    login: build.mutation<LoginResponseType, LoginType>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: build.mutation<LoginResponseType, SignUpType>({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    getUsers: build.query<GetUsersResponseType, void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
    }),
    getCurrentUser: build.query<GetCurrentUserResponse, void>({
      query: () => ({
        url: "users/current",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useSignUpMutation,
  useGetUsersQuery,
  useLazyGetCurrentUserQuery,
} = api;
