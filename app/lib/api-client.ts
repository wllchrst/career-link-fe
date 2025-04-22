import Axios from "axios";

export const api = Axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    //TODO: show the error to the user
    return Promise.reject(error);
  }
);
