import httpService from "./http.service";
const genreEndpoint = "genre/";

const genreService = {
  fetchAll: async () => {
    const { data } = await httpService.get(genreEndpoint);
    return data;
  },
};
export default genreService;
