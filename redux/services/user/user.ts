import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY} from "@/utils/commons/type";

export const user = createApi({
    reducerPath: EnumReducerPath.user,
    baseQuery: fetchBaseQuery({ baseUrl: EnumBaseUrl.API }),
    endpoints: (builder) => ({
        getUsers: builder.query<ANY, void>({
            query: () => '/user',
        }),
    }),
});

export const { useGetUsersQuery } = user;
