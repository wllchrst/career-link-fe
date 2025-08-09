import Axios, { type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = Cookies.get("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
};

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
