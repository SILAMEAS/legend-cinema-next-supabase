import {ANY} from "@/utils/commons/type";

/**
 * Convert FormData into a typed object
 * @param formData - the FormData object
 * @param keys - array of keys to extract from FormData
 * @returns typed object of type T
 */
export type FormDataValue = string | File | null;

export function parseFormData<T>(
    formData: FormData,
    keys: (keyof T)[]
): T {
    const data = {} as T;

    keys.forEach((key) => {
        const value = formData.get(key as string);

        if (value instanceof File) {
            (data as ANY)[key] = value;
        } else if (value !== null) {
            (data as ANY)[key] = value.toString();
        } else {
            (data as ANY)[key] = null;
        }
    });

    return data;
}