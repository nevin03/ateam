import axios from "axios";
import useAuthStore from "@/store/useAuthStore";
import { toast } from "@/contexts/ToastContext";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Attach token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error("Request error");
    return Promise.reject(error);
  }
);

// Refresh token logic
let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken } = useAuthStore.getState();

      if (!refreshToken) {
        toast.error("Session expired. Please login again.");
        useAuthStore.getState().logout?.();
        return Promise.reject("Session expired");
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const { access_token, refresh_token } = res.data;

        useAuthStore.setState({
          token: access_token,
          refreshToken: refresh_token,
          isAuthenticated: true,
        });

        onTokenRefreshed(access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        toast.error("Token refresh failed. Please login again.", err);
        useAuthStore.getState().logout?.();
        return Promise.reject("Session expired");
      } finally {
        isRefreshing = false;
      }
    }

    const errMsg = error.response?.data?.message || "Something went wrong";
    toast.error(errMsg); // ✅ Show API/server errors to user
    return Promise.reject(errMsg);
  }
);

export default axiosInstance;
