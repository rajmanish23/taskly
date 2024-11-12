import axios from "axios";
import Cookies from "js-cookie";

import { ACCESS_KEY, BASE_API_URL } from "./constants";

const api = axios.create({
  baseURL: BASE_API_URL
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(ACCESS_KEY);
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
