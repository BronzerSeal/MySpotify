import httpService from "./http.service.ts";
const tracksEndpoint = "track/";

const tracksService = {
  getTrackByName: async (name: string) => {
    const { data } = await httpService.get(
      tracksEndpoint + "searchTrack?q=" + name
    );
    return data;
  },
  getTracksByWord: async (word: string) => {
    const { data } = await httpService.get(
      tracksEndpoint + "searchTracks?q=" + word
    );
    return data;
  },
  getRandomTracks: async () => {
    const data = await httpService.get(tracksEndpoint + "randomTracks");
    return data.data;
  },
  getAudioForTreckByName: async (name: string) => {
    const data = await httpService.get(
      tracksEndpoint + "getAudio" + `?q=${name}`
    );
    return data.data;
  },
  getAudioForTreckByNamePlusArtist: async (name: string, artist: string) => {
    const data = await httpService.get(
      tracksEndpoint +
        "getAudioPlusArtist" +
        `?track=${name}` +
        `&artist=${artist}`
    );

    return data.data;
  },
};

export default tracksService;
