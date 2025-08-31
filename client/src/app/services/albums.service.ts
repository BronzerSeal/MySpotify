import httpService from "./http.service.ts";
const albumsEndpoint = "album/";

const albumsService = {
  getAlbumById: async (id: string) => {
    const { data } = await httpService.get(
      albumsEndpoint + "searchAlbumById?q=" + id
    );

    return data;
  },
  getAlbumByName: async (name: string) => {
    const { data } = await httpService.get(
      albumsEndpoint + "searchAlbumByName?q=" + name
    );
    return data;
  },
  getAlbumsByWord: async (word: string) => {
    const { data } = await httpService.get(
      albumsEndpoint + "searchAlbumsByName?q=" + word
    );
    return data;
  },
  getRandomAlbums: async () => {
    const data = await httpService.get(albumsEndpoint + "randomAlbums");
    return data.data;
  },
};

export default albumsService;
