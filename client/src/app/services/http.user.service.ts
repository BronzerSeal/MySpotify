import axios from "axios";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && expiresDate < Date.now();

    if (isExpired) {
      const data = await authService.refresh();
      localStorageService.setTokens(data);
    }

    const accessToken = localStorageService.getAccessToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
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
