import axios from "axios";

// Vite 使用 import.meta.env 來讀取環境變數
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// 建立一個 axios 實例
const api = axios.create({
  baseURL: baseURL,
});

// 請求攔截器：每次發送請求前，自動把 Token 加上去
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
