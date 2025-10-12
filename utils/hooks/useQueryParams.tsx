"use client";

import { useSearchParams, useRouter } from "next/navigation";

/**
 * Custom hook to get and update URL query parameters
 */
export function useQueryParams() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ✅ Get a specific query param
    const getParam = (key: string): string | null => {
        return searchParams.get(key);
    };

    // ✅ Get all query params as an object
    const getAllParams = (): Record<string, string> => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    };

    // ✅ Set or update a query param
    const setParam = (key: string, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, String(value));
        router.push(`?${params.toString()}`);
    };

    // ✅ Remove a query param
    const removeParam = (key: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        router.push(`?${params.toString()}`);
    };

    // ✅ Replace (no history entry)
    const replaceParam = (key: string, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, String(value));
        router.replace(`?${params.toString()}`);
    };

    return { getParam, getAllParams, setParam, removeParam, replaceParam };
}
