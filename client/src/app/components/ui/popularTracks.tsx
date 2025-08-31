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

const PopularTracks = () => {
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [loading, setLoading] = useState(true);

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
                <AlbumBlockCircle
                  image={
                    track.album.images[1]?.url ||
                    "https://github.com/shadcn.png"
                  }
                  name={track.name}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </>
  );
};

export default PopularTracks;
