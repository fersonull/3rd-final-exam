import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/contexts/auth-context";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useFetch(url, options = {}, immediate = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const fetchData = useCallback(
    async (overrideOptions = {}) => {
      setLoading(true);
      setError(null);

      try {
        const isFormData = overrideOptions.body instanceof FormData;

        const response = await fetch(BASE_URL + url, {
          credentials: "include",
          ...options,
          ...overrideOptions,
          headers: {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : undefined,
            ...overrideOptions.headers,
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
          },
        });


        const result = await response.json();


        if (!response.ok && result.errors || result.error) {
          setError(result.errors || result.error);
          // throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        setData(result);

        return result;
      } catch (err) {
        setError(err?.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [url]);

  return { data, error, loading, refetch: fetchData };
}
