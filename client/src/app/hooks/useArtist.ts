import { useEffect, useState } from "react";
import artistService from "../services/artists.service";

export function useArtist(id: string) {
  const [artist, setArtist] = useState<SpotifyApi.ArtistObjectFull>();
  const [popularTracks, setPopularTracks] = useState<
    SpotifyApi.TrackObjectFull[]
  >([]);
  const [artistMusic, setArtistMusic] = useState<SpotifyApi.AlbumObjectFull[]>(
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const [singer, tracks, music] = await Promise.all([
        artistService.getArtistById(id),
        artistService.getArtistTopTenTracksbyId(id),
        artistService.getArtistTopMusicById(id),
      ]);
      if (isMounted) {
        setArtist(singer);
        setPopularTracks(tracks);
        setArtistMusic(music);
      }
    }

    loadData();
    return () => {
      isMounted = false; // защита от утечек
    };
  }, [id]);

  return { artist, popularTracks, artistMusic };
}
