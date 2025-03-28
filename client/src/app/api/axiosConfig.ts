import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_TOKEN",
  },
});

export default axiosInstance;
