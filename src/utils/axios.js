import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { toast } from "@/contexts/ToastContext";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    const authStore = useAuthStore.getState();

    // Handle 401 and token refresh
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const res = await axios.post("/auth/refresh", {
          refreshToken: authStore.refreshToken,
        });

        const { accessToken, refreshToken } = res.data;

        // Save new tokens to Zustand
        useAuthStore.setState({
          token: accessToken,
          refreshToken,
          isAuthenticated: true,
        });

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().logout?.();
        toast?.error?.("Session expired. Please login again.");
        setTimeout(() => (window.location.href = "/login"), 1000);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // 403
    if (status === 403) {
      toast?.error?.("You don’t have permission to perform this action.");
    } else {
      toast?.error?.(error.response?.data?.message || "Something went wrong");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
