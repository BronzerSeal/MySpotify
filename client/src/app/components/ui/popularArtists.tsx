import { Text } from "@radix-ui/themes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../common/carousel";
import { useEffect, useState } from "react";
import artistService from "@/app/services/artists.service";
import ArtistBlockCircle from "../common/artistBlockCircle/artistBlockCircle";
import { useNavigate } from "react-router-dom";

const PopularArtists = () => {
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleCardClick = (id: string) => {
    navigate("/artist", { state: artists.find((artist) => artist.id === id) });
  };

  useEffect(() => {
    async function getArtists() {
      const persons = await artistService.getRandomArtists();

      setArtists(persons);
      setLoading(false);
    }
    getArtists();
  }, []);

  return (
    <>
      <Text as="div" weight="bold" size="5" mb="3">
        Popular artists
      </Text>

      {loading ? (
        <p>Loading... </p>
      ) : (
        <Carousel opts={{ align: "start" }} className="w-full max-w-[1200px]">
          <CarouselContent>
            {artists.map((artist) => (
              <CarouselItem
                key={artist.id}
                className="basis-1/6"
                onClick={() => handleCardClick(artist.id)}
              >
                <ArtistBlockCircle
                  image={
                    artist.images[1]?.url || "https://github.com/shadcn.png"
                  }
                  name={artist.name}
                  who={artist.type}
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

export default PopularArtists;
