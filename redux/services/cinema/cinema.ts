import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ICinemaResponse} from "@/redux/services/cinema/type";
import {IPagination} from "@/utils/commons/type";
import {EnumMethod} from "@/utils/enum/EnumMethod";

export const cinema = createApi({
    reducerPath: EnumReducerPath.cinema,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["cinema"],
    endpoints: (builder) => ({
        getCinema: builder.query<IPagination<ICinemaResponse>, void>({
            query: () => ({
                url: `/cinema`,
                method: EnumMethod.GET
            }),
            providesTags: ['cinema'],
        }),
    }),
});

export const {useGetCinemaQuery} = cinema;
