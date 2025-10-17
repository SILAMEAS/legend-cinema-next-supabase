import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY} from "@/utils/commons/type";

export const banner = createApi({
    reducerPath: EnumReducerPath.banner,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["banner"],
    endpoints: (builder) => ({
        getBanner: builder.query<ANY, void>({
            query: () => '/banner',
            providesTags: ['banner']
        }),
    }),
});

export const {useGetBannerQuery} = banner;
