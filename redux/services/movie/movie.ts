import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY} from "@/utils/commons/type";

export const movie = createApi({
    reducerPath: EnumReducerPath.movie,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["movie"],
    endpoints: (builder) => ({
        getMovie: builder.query<ANY, void>({
            query: () => '/movie',
            providesTags: ['movie']
        })
    }),
});

export const {useGetMovieQuery} = movie;
