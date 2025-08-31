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
import albumsService from "@/app/services/albums.service";

const PopularAlbums = () => {
  const [albums, setAlbums] = useState<SpotifyApi.AlbumObjectFull[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getArtists() {
      const tracks = await albumsService.getRandomAlbums();

      setAlbums(tracks);
      setLoading(false);
    }
    getArtists();
  }, []);

  return (
    <>
      <Text as="div" weight="bold" size="5" mb="3" mt={"4"}>
        Popular albums
      </Text>

      {loading ? (
        <p>Loading... </p>
      ) : (
        <Carousel opts={{ align: "start" }} className="w-full max-w-[1200px]">
          <CarouselContent>
            {albums.map((album) => (
              <CarouselItem key={album.id} className="basis-1/6">
                <AlbumBlockCircle
                  image={
                    album.images[1]?.url || "https://github.com/shadcn.png"
                  }
                  name={album.name}
                  who={album.type}
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

export default PopularAlbums;
