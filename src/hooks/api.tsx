import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import useMessageStore from "../zustand/messageStore";
export const Base_Url = "http://13.201.4.133:3001/company/";

// Function to get the bearer token from local storage
const getToken = () => {
  return localStorage.getItem("token");
};

// Create Axios instance
const client = axios.create({
  baseURL: "http://13.201.4.133:3001/company/",
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});

// Function to update the authorization header with the latest token
const updateAuthorizationHeader = (token: string) => {
  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common["Authorization"];
  }
};

// Custom hook to manage token and Axios instance with token refresh and retry
const useAxios = () => {
  const [token, setToken] = useState(getToken());
  const { setError } = useMessageStore();
  useEffect(() => {
    updateAuthorizationHeader(token || "");
  }, [token]);
  const updateToken = (token: string) => {
    setToken(token);
  };

  // Function to refresh token
  const refreshToken = async (client: AxiosInstance) => {
    try {
      const response = await client.post("auth/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      const newToken = response.data.access_token;
      localStorage.setItem("token", newToken);
      updateToken(newToken);
      updateAuthorizationHeader(newToken);
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  // Function to intercept request errors and retry after token refresh
  const handleRequestError = async (error: any) => {
    if (error.response.data && error.response.data.statusCode === 401) {
      localStorage.removeItem("token");
      // localStorage.removeItem("refreshToken");
      setError("logged out please login again");
      return Promise.reject(error);
    } else {
      try {
        // await refreshToken(client);
        const originalRequest = error.config;
        if (originalRequest) {
          originalRequest.headers["Authorization"] = `Bearer ${getToken()}`;
          return client(originalRequest as AxiosRequestConfig);
        } else {
          return Promise.reject(new Error("Original request is undefined"));
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  };
  client.interceptors.response.use(null, handleRequestError);

  return { client, updateToken };
};

export default useAxios;
