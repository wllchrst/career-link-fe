import Axios, { type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import https from "https";

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  })
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
