import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY} from "@/utils/commons/type";

export const promotion = createApi({
    reducerPath: EnumReducerPath.promotion,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["promotion"],
    endpoints: (builder) => ({
        getPromotion: builder.query<ANY, void>({
            query: () => '/promotion',
            providesTags: ['promotion']
        }),
    }),
});

export const {useGetPromotionQuery} = promotion;
