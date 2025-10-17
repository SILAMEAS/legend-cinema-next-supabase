import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY} from "@/utils/commons/type";

export const category = createApi({
    reducerPath: EnumReducerPath.category,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["category"],
    endpoints: (builder) => ({
        getCategory: builder.query<ANY, void>({
            query: () => '/category',
            providesTags: ['category']
        })
    }),
});

export const {useGetCategoryQuery} = category;
