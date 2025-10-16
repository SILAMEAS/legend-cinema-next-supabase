import {useEffect, useState} from "react";
import {ANY} from "@/utils/commons/type";

interface UseFetchDataObjectProps<T> {
    fetcher: () => Promise<{ data: T }>; // fetch function
    dependency?: ANY[];
}

export const useFetchDataObject = <T, >({fetcher, dependency=[]}: UseFetchDataObjectProps<T>) => {
        const [data, setData] = useState<T|null>(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<Error | null>(null);

        useEffect(() => {
            let isMounted = true;

            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const res = await fetcher();
                    if (isMounted&&res.data) setData(res.data);
                } catch (err) {
                    if (isMounted) setError(err as Error);
                } finally {
                    if (isMounted) setLoading(false);
                }
            };

            fetchData().then(r => r);

            return () => {
                isMounted = false;
            };
        }, dependency);

        return {data, loading, error};
    }
;

export default useFetchDataObject;
