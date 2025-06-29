import { useState, useEffect, useRef, useCallback } from "react";
import axiosInstance from "@utils/axios";
import { useToast } from "@/hooks/useToast";

export const useAxios = ({
  url,
  method = "get",
  data = null,
  params = null,
  autoFetch = true,
}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);
  const toast = useToast();

  const controllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      controllerRef.current = new AbortController();

      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        signal: controllerRef.current.signal,
      });

      setResponse(result.data);
      setError(null);
    } catch (err) {
      if (axiosInstance.isCancel(err)) {
        console.log("Request canceled", err.message);
      } else {
        setError(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [url, method, data, params, toast]);

  useEffect(() => {
    if (autoFetch) fetchData();

    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [fetchData, autoFetch]);

  return { response, loading, error, refetch: fetchData };
};
