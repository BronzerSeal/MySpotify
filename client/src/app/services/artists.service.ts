import httpService from "./http.service.ts";
const artistEndpoint = "artist/";

const artistService = {
  getArtistById: async (id: string) => {
    const { data } = await httpService.get(
      artistEndpoint + "searchArtistById?q=" + id
    );

    return data;
  },
  getArtistByName: async (name: string) => {
    const { data } = await httpService.get(
      artistEndpoint + "searchArtistByName?q=" + name
    );
    return data;
  },
  getArtistsByWord: async (word: string) => {
    const { data } = await httpService.get(
      artistEndpoint + "searchArtistsByName?q=" + word
    );
    return data;
  },
  getRandomArtists: async () => {
    const data = await httpService.get(artistEndpoint + "randomArtists");
    return data.data;
  },
};

export default artistService;
