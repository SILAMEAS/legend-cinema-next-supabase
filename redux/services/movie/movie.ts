import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {IPagination} from "@/utils/commons/type";
import {IMovieResponse} from "@/redux/services/movie/type";
import {EnumMethod} from "@/utils/enum/EnumMethod";

export const movie = createApi({
    reducerPath: EnumReducerPath.movie,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["movie"],
    endpoints: (builder) => ({
        getMovie: builder.query<IPagination<IMovieResponse>, {title?:string,status?:string}>({
            query: (params) => ({
                url: `/movie`,
                method: EnumMethod.GET,
                params: params
            }),
            providesTags: ['movie'],
        })
    }),
});

export const {useGetMovieQuery} = movie;
