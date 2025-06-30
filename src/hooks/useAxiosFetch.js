import { useState, useCallback } from "react";
import axiosInstance from "../utils/axios";

const useAxiosFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(
    async ({ url, method, body = null, params = null }) => {
      if (!method) {
        throw new Error(
          "HTTP method must be specified (e.g., 'get', 'post', 'put', 'delete')"
        );
      }

      if (isLoading) {
        console.log(
          `Request to ${url} aborted: another request is in progress`
        );
        return;
      }

      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        console.log("Sending request:", { url, method, body, params });
        const response = await axiosInstance({
          url,
          method,
          data: body,
          params,
        });
        console.log("Response received:", {
          url,
          status: response.status,
          data: response.data,
        });
        setData(response.data);
        return response.data;
      } catch (err) {
        const errorDetails = {
          message:
            err.response?.data?.message || err.message || "An error occurred",
          code: err.response?.data?.code || err.name || "UNKNOWN_ERROR",
          status: err.response?.status || null,
        };
        setError(errorDetails);
        console.error(
          `Fetch error (${method} ${url}):`,
          errorDetails,
          err.response?.data
        );
        throw errorDetails;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return { fetchData, isLoading, error, data };
};

export default useAxiosFetch;
