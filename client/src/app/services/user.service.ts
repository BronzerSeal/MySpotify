import httpUserService from "./http.user.service";
import localStorageService from "./localStorage.service";

export type Genre = {
  color: string;
  name: string;
  _id: string;
};

export type User = {
  createdAt: string;
  email: string;
  image: string;
  name: string;
  password: string;
  updatedAt: string;
  genres: Genre[];
  __v: number;
  _id: string;
  dopInfo?: string;
  favouriteArtists?: string[];
};
const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpUserService.get(userEndpoint);
    return data;
  },
  create: async (payload: User) => {
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
  update: async (payload: User) => {
    const { data } = await httpUserService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    return data;
  },
};
export default userService;
