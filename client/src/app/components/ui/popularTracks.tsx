import { Text } from "@radix-ui/themes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../common/carousel";
import { useEffect, useState } from "react";
import AlbumBlockCircle from "../common/albumBlock/albumBlock";
import tracksService from "@/app/services/tracks.service";
import AudioPlayer from "./audioPlayer";
import { useTrackPlayer } from "@/app/hooks/useTrackPlayer";

const PopularTracks = () => {
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [loading, setLoading] = useState(true);
  const { playingTrack, getAudioForTrack } = useTrackPlayer();

  useEffect(() => {
    async function getTracks() {
      const songs = await tracksService.getRandomTracks();

      setTracks(songs);
      setLoading(false);
    }
    getTracks();
  }, []);

  return (
    <>
      <Text as="div" weight="bold" size="5" mb="3" mt={"4"}>
        Popular tracks
      </Text>

      {loading ? (
        <p>Loading... </p>
      ) : (
        <Carousel opts={{ align: "start" }} className="w-full max-w-[1200px]">
          <CarouselContent>
            {tracks.map((track) => (
              <CarouselItem key={track.id} className="basis-1/6">
                <div
                  onClick={() =>
                    getAudioForTrack({
                      name: track.name,
                      spotifyImg: track.album.images[0].url,
                      artistName: track.artists[0].name,
                    })
                  }
                >
                  <AlbumBlockCircle
                    image={
                      track.album.images[1]?.url ||
                      "https://github.com/shadcn.png"
                    }
                    name={track.name}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
      {playingTrack && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backgroundColor: "#111",
          }}
        >
          <AudioPlayer
            preview={playingTrack.preview}
            title={playingTrack.spotifyTrackName}
            artist={playingTrack.artistName!}
            audioImg={playingTrack.spotifyImg!}
          />
        </div>
      )}
    </>
  );
};

export default PopularTracks;
