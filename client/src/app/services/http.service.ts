import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpService;
