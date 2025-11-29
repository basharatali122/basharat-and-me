// src/utils/axiosInstance.js
import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});
// Attach Authorization header automatically if token exists in localStorage
axiosInstance.interceptors.request.use((cfg) => {
  try {
    const token = localStorage.getItem(config.storageKeys.authToken);
    if (token) cfg.headers = { ...(cfg.headers || {}), Authorization: `Bearer ${token}` };
  } catch (e) {
    // ignore
  }
  return cfg;
});

export default axiosInstance;
