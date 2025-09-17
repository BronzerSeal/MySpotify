import axios from "axios";
import config from "../config.json";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/",
});

type RegisterPayload = {
  email: string;
  licence: boolean;
  name: string;
  password: string;
};

const authService = {
  register: async (payload: RegisterPayload) => {
    const { data } = await httpAuth.post(`signUp`, payload);
    return data;
  },
  login: async ({ email, password }: { email: string; password: string }) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
