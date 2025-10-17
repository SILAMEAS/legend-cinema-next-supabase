import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY} from "@/utils/commons/type";

export const dashboard = createApi({
    reducerPath: EnumReducerPath.dashboard,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["dashboard"],
    endpoints: (builder) => ({
        getDashboard: builder.query<ANY, void>({
            query: () => '/banner',
            providesTags: ['dashboard']
        }),
    }),
});

export const {useGetDashboardQuery} = dashboard;
