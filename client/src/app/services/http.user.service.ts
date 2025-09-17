import axios from "axios";
import config from "../config.json";
import localStorageService from "./localStorage.service";

const http = axios.create({
  baseURL: config.apiEndpoint,
});

http.interceptors.request.use(
  (config) => {
    const accessToken = localStorageService.getAccessToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };
    return res;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

const httpUserService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpUserService;
