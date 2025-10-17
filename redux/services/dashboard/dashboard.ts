import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {IDashboardResponse} from "@/redux/services/dashboard/type";
import {IPagination} from "@/utils/commons/type";

export const dashboard = createApi({
    reducerPath: EnumReducerPath.dashboard,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["dashboard"],
    endpoints: (builder) => ({
        getDashboard: builder.query<IPagination<IDashboardResponse>, void>({
            query: () => '/dashboard',
            providesTags: ['dashboard']
        }),
    }),
});

export const {useGetDashboardQuery} = dashboard;
