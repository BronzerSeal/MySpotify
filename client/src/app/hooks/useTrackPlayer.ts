import { useState } from "react";
import { toast } from "react-toastify";
import tracksService from "../services/tracks.service";

type PlayingTrack = {
  preview: string;
  spotifyTrackName: string;
  spotifyImg?: string;
  artistName?: string;
  dezeerImg: string;
};

export function useTrackPlayer() {
  const [playingTrack, setPlayingTrack] = useState<PlayingTrack | null>(null);

  const getAudioForTrack = async ({
    name,
    artistName,
    spotifyImg,
  }: {
    name: string;
    artistName: string;
    spotifyImg?: string;
  }) => {
    try {
      const audio = await tracksService.getAudioForTreckByNamePlusArtist(
        name,
        artistName
      );
      if (audio) {
        setPlayingTrack({
          ...audio,
          spotifyTrackName: name,
          artistName,
          spotifyImg,
        });
      } else {
        setPlayingTrack(null);
      }
    } catch (err) {
      toast("Sorry, track not found in database. Try another one ;)");
    }
  };

  return { playingTrack, getAudioForTrack, setPlayingTrack };
}
