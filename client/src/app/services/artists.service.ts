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
    return data[0];
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
  getArtistTopTenTracksbyId: async (id: string) => {
    const { data } = await httpService.get(artistEndpoint + id + "/top-tracks");
    return data;
  },
  getArtistTopTracksSearch: async (id: string) => {
    const { data } = await httpService.get(
      artistEndpoint + id + "/top-tracks-search"
    );
    return data;
  },
  getArtistTopMusicById: async (id: string) => {
    const { data } = await httpService.get(
      artistEndpoint + id + "/latest-albums"
    );
    return data;
  },
};

export default artistService;
