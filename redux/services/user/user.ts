import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";

export const user = createApi({
    reducerPath: EnumReducerPath.user,
    baseQuery: fetchBaseQuery({ baseUrl: EnumBaseUrl.API }),
    endpoints: (builder) => ({
        getUsers: builder.query<{ id: number; name: string }[], void>({
            query: () => '/test',
        }),
    }),
});

export const { useGetUsersQuery } = user;
