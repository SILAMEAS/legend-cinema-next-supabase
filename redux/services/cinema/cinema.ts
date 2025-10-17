import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY} from "@/utils/commons/type";

export const cinema = createApi({
    reducerPath: EnumReducerPath.cinema,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["cinema"],
    endpoints: (builder) => ({
        getUsers: builder.query<ANY, void>({
            query: () => '/cinema',
            providesTags: ['cinema']
        }),
    }),
});

export const {useGetUsersQuery} = cinema;
