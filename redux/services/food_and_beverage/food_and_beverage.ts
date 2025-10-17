import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY, IPagination} from "@/utils/commons/type";
import {EnumMethod} from "@/utils/enum/EnumMethod";
import {IFoodAndBeverageResponse} from "@/redux/services/food_and_beverage/type";

export const food_and_beverage = createApi({
    reducerPath: EnumReducerPath.food_and_beverage,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["food_and_beverage"],
    endpoints: (builder) => ({
        getFoodAndBeverage: builder.query<
            IPagination<IFoodAndBeverageResponse>,
            { categoryName: string }
        >({
            keepUnusedDataFor: 0,
            query: ({
                        categoryName
                    }) => ({
                url: `/food_and_beverage`,
                method: EnumMethod.GET,
                params: {
                    categoryName
                },
            }),
            providesTags: ['food_and_beverage'],
        }),
    }),
});

export const {useGetFoodAndBeverageQuery} = food_and_beverage;
