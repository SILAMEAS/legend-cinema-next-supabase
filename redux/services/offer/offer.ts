import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY} from "@/utils/commons/type";

export const offer = createApi({
    reducerPath: EnumReducerPath.offer,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["offer"],
    endpoints: (builder) => ({
        getOffer: builder.query<ANY, void>({
            query: () => '/offer',
            providesTags: ['offer']
        })
    }),
});

export const {useGetOfferQuery} = offer;
