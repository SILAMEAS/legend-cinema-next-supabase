import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {IPagination, IPaginationRequest, IStatus} from "@/utils/commons/type";
import {ListDateShowingResponse, IMovieRecentResponse, IMovieResponse} from "@/redux/services/movie/type";
import {EnumMethod} from "@/utils/enum/EnumMethod";

export const movie = createApi({
    reducerPath: EnumReducerPath.movie,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["movie","recent-movie","date_movie","status"],
    endpoints: (builder) => ({
        getMovie: builder.query<IPagination<IMovieResponse>, {title?:string,status?:string,cinemaId?:string|number}&IPaginationRequest>({
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
        }),
        getListDateShowing: builder.query<IPagination<ListDateShowingResponse>,IPaginationRequest>({
            query: (params) => ({
                url: `/list_date_showing`,
                method: EnumMethod.GET,
                params
            }),
            providesTags: ['date_movie'],
        }),


        createMovie: builder.mutation<string,FormData>({
            query: (body) => ({
                url: `/movie`,
                method: EnumMethod.POST,
                body
            }),
            invalidatesTags: ['movie'],
        }),
        getMovieStatus: builder.query<IPagination<IStatus>,void>({
            query: (body) => ({
                url: `/movie/status`,
                method: EnumMethod.GET,
                body
            }),
            providesTags: ['status'],
        }),
    }),
});

export const {useGetMovieQuery,useGetRecentMovieQuery,useGetListDateShowingQuery,useCreateMovieMutation ,useGetMovieStatusQuery} = movie;
