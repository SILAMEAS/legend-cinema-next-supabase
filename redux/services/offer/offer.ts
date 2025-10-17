import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY, IPagination} from "@/utils/commons/type";
import {IOfferResponse} from "@/redux/services/offer/type";

export const offer = createApi({
    reducerPath: EnumReducerPath.offer,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["offer"],
    endpoints: (builder) => ({
        getOffer: builder.query<IPagination<IOfferResponse>, void>({
            query: () => '/offer',
            providesTags: ['offer']
        })
    }),
});

export const {useGetOfferQuery} = offer;
