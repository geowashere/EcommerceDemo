import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceWithAuth = axios.create({
  baseURL: "http://localhost:8080/auth/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceWithAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    console.log("token in interceptor: ", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
