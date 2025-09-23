import { useState, useEffect, useCallback } from "react";

export function useFetch(url, options = {}, immediate = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (overrideOptions = {}) => {
      setLoading(true);
      setError(null);

      try {
        const isFormData = overrideOptions.body instanceof FormData;

        const response = await fetch(url, {
          credentials: "include",
          ...options,
          ...overrideOptions,
          headers: {
            ...options.headers,
            ...overrideOptions.headers,
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
          },
        });

        const result = await response.json();

        if (!response.ok && result.errors) {
          setError(result.errors);
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        setData(result);

        return result;
      } catch (err) {
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
  }, [fetchData, immediate]);

  return { data, error, loading, refetch: fetchData };
}
