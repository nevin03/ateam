import { useState, useEffect, useRef, useCallback } from "react";
import axiosInstance from "../utils/axios";
import axios from "axios";

export const useAxios = ({
  url,
  method = "get",
  data = null,
  params = null,
  autoFetch = true,
  onCompleted = null,
}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

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
      if (onCompleted) onCompleted(result.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled", err.message);
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [url, method, data, params, onCompleted]);

  useEffect(() => {
    if (autoFetch) fetchData();
    return () => controllerRef.current?.abort();
  }, [fetchData, autoFetch]);

  return { response, loading, error, refetch: fetchData };
};
