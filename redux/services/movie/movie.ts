import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {IPagination} from "@/utils/commons/type";
import {IMovieRecentResponse, IMovieResponse} from "@/redux/services/movie/type";
import {EnumMethod} from "@/utils/enum/EnumMethod";

export const movie = createApi({
    reducerPath: EnumReducerPath.movie,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["movie","recent-movie"],
    endpoints: (builder) => ({
        getMovie: builder.query<IPagination<IMovieResponse>, {title?:string,status?:string}>({
            query: (params) => ({
                url: `/movie`,
                method: EnumMethod.GET,
                params: params
            }),
            providesTags: ['movie'],
        }),
        getRecentMovie: builder.query<IPagination<IMovieRecentResponse>,void>({
            query: () => ({
                url: `/recent-movie`,
                method: EnumMethod.GET
            }),
            providesTags: ['recent-movie'],
        })
    }),
});

export const {useGetMovieQuery,useGetRecentMovieQuery} = movie;
