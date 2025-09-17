import httpUserService from "./http.user.service";
import localStorageService from "./localStorage.service";

export type User = {
  createdAt: string;
  email: string;
  image: string;
  name: string;
  password: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpUserService.get(userEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpUserService.put(
      userEndpoint + payload._id,
      payload
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpUserService.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpUserService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    return data;
  },
};
export default userService;
