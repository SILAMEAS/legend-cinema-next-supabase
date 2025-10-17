import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EnumBaseUrl} from "@/utils/enum/EnumBaseUrl";
import {EnumReducerPath} from "@/utils/enum/EnumReducerPath";
import {ANY} from "@/utils/commons/type";
import {EnumMethod} from "@/utils/enum/EnumMethod";
import {IUserRequest} from "@/redux/services/user/type";

export const user = createApi({
    reducerPath: EnumReducerPath.user,
    baseQuery: fetchBaseQuery({baseUrl: EnumBaseUrl.API}),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        getUsers: builder.query<ANY, void>({
            query: () => '/user',
            providesTags: ['user']
        }),
        createUser: builder.mutation<ANY, IUserRequest>({
            query: body => ({
                url: `/user`,
                method: EnumMethod.POST,
                body,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: [{type: 'user', id: 'ID'}],
        }),
    }),
});

export const {useGetUsersQuery,useCreateUserMutation} = user;
