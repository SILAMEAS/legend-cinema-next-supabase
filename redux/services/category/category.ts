import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {IPagination} from "@/utils/commons/type";
import {ICategoryResponse} from "@/redux/services/category/type";

export const category = createApi({
    reducerPath: EnumReducerPath.category,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["category"],
    endpoints: (builder) => ({
        getCategory: builder.query<IPagination<ICategoryResponse>, void>({
            query: () => '/category',
            providesTags: ['category']
        })
    }),
});

export const {useGetCategoryQuery} = category;
