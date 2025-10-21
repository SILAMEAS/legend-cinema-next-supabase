// redux/services/supabaseImage/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EnumBaseUrl } from '@/utils/enum/EnumBaseUrl';
import { EnumReducerPath } from '@/utils/enum/EnumReducerPath';
import {IPagination} from "@/utils/commons/type";

export interface IImageFile {
    name: string;
    url: string;
    path?: string;
}

export const supabaseImageApi = createApi({
    reducerPath: EnumReducerPath.supabaseImage,
    baseQuery: fetchBaseQuery({ baseUrl: EnumBaseUrl.API }),
    tagTypes: ['Image'],
    endpoints: (builder) => ({
        getImages: builder.query<IPagination<IImageFile>, void>({
            query: () => '/upload',
            providesTags: ['Image'],
        }),
        uploadImage: builder.mutation<IImageFile, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: '/upload',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Image'], // Refresh image list
        }),
        updateImage: builder.mutation<IImageFile, { file: File; oldPath: string }>({
            query: ({ file, oldPath }) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('oldPath', oldPath);
                return {
                    url: '/upload',
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['Image'], // Refresh image list
        }),
        deleteImage: builder.mutation<{ success: boolean }, string>({
            query: (path) => ({
                url: '/upload',
                method: 'DELETE',
                body: JSON.stringify({ path }),
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ['Image'], // Refresh image list
        }),
    }),
});

export const {
    useGetImagesQuery,
    useUploadImageMutation,
    useUpdateImageMutation,
    useDeleteImageMutation,
} = supabaseImageApi;
