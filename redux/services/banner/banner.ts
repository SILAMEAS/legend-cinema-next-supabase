import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {IPagination} from "@/utils/commons/type";
import {IBannerResponse} from "@/redux/services/banner/type";

export const banner = createApi({
    reducerPath: EnumReducerPath.banner,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["banner"],
    endpoints: (builder) => ({
        getBanner: builder.query<IPagination<IBannerResponse>, void>({
            query: () => '/banner',
            providesTags: ['banner']
        }),
    }),
});

export const {useGetBannerQuery} = banner;
