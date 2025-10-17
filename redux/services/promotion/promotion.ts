import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY, IPagination} from "@/utils/commons/type";
import {IPromotionResponse} from "@/redux/services/promotion/type";

export const promotion = createApi({
    reducerPath: EnumReducerPath.promotion,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["promotion"],
    endpoints: (builder) => ({
        getPromotion: builder.query<IPagination<IPromotionResponse>, void>({
            query: () => '/promotion',
            providesTags: ['promotion']
        }),
    }),
});

export const {useGetPromotionQuery} = promotion;
