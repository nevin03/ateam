import { useState, useCallback } from "react";
import axiosInstance from "../utils/axios";
import { toast } from "../contexts/ToastContext";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = useCallback(
    async ({ url, method, body = null, params = null }) => {
      if (!method) {
        throw new Error("HTTP method is required");
      }

      setIsLoading(true);
      setData(null);

      try {
        const response = await axiosInstance({
          url,
          method,
          data: body,
          params,
          skipRefresh: true, // prevents refresh token logic on login
        });

        const status = response.status;

        if (status === 200 || status === 201) {
          toast.success("User logged in successfully");
        }

        setData(response.data);
        return response.data;
      } catch (err) {
        const status = err.response?.status;

        if (status === 401) {
          toast.error("Invalid email or password");
        } else {
          toast.error(
            err.response?.data?.message || "Something went wrong. Try again."
          );
        }

        // Optional: throw the error to allow calling component to handle it
        // throw {
        //   message: err.response?.data?.message || err.message,
        //   code: err.code || "UNKNOWN_ERROR",
        //   status,
        // };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { fetchData, isLoading, data };
};

export default useAuth;
