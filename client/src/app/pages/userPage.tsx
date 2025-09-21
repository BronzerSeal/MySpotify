import userService, { type User } from "@/app/services/user.service";
import type { AppDispatch } from "@/app/store/store";
import { logOut } from "@/app/store/userSlice";
import { Button, Container, Flex, Link, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import SpotlightCard from "../components/ui/SpotlightCard";
import artistService from "../services/artists.service";
import ArtistBlockCircle from "../components/common/artistBlockCircle/artistBlockCircle";
import UserCard from "../components/ui/userCard";
import Genres from "../components/ui/genres";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/common/carousel";

const UserPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
  const [loadingArtist, setLoadingArtist] = useState(true);

  useEffect(() => {
    async function getArtists() {
      if (!user) return;

      try {
        const artistsData = await Promise.all(
          user.favouriteArtists.map((artistId) =>
            artistService.getArtistById(artistId)
          )
        );
        setArtists(artistsData);
      } catch (error) {
        console.error("Ошибка загрузки артистов", error);
      } finally {
        setLoadingArtist(false);
      }
    }

    getArtists();
  }, [user]);
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await userService.getCurrentUser();
        setUser(data.content);
      } catch (error) {
        console.error("Ошибка загрузки пользователя", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogOut = () => {
    dispatch(logOut(navigate));
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <Container>
      <Flex justify={"center"}>
        <Flex justify={"between"} maxWidth={"800px"} wrap={"wrap"}>
          <Flex direction={"column"}>
            <UserCard
              name={user.name}
              img={user.image}
              dopInfo={user.dopInfo}
            />
            <div style={{ marginTop: "15px" }}>
              {user && <Genres genres={user.genres} />}
            </div>
            <Button mt={"4"} color="red" onClick={handleLogOut}>
              Log out
            </Button>
          </Flex>

          <Flex ml={"3"} direction={"column"}>
            <SpotlightCard padding={4}>
              <Flex width={"420px"} direction={"column"}>
                <Text size={"4"} weight={"bold"}>
                  favourite artists
                </Text>
                <Flex>
                  {user.favouriteArtists.length > 0 ? (
                    <Carousel
                      opts={{ align: "start" }}
                      className="relative w-full max-w-[1300px]"
                    >
                      <CarouselContent>
                        {!loadingArtist &&
                          artists.map((artist) => (
                            <CarouselItem
                              key={artist.id}
                              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                            >
                              <ArtistBlockCircle
                                variant="userPage"
                                image={
                                  artist.images[1]?.url ||
                                  "https://github.com/shadcn.png"
                                }
                                name={artist.name}
                                who={artist.type}
                                id={artist.id}
                              />
                            </CarouselItem>
                          ))}
                      </CarouselContent>

                      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 -ml-6 bg-black/70 text-white rounded-full p-2" />
                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 -mr-6 bg-black/70 text-white rounded-full p-2" />
                    </Carousel>
                  ) : (
                    <Link color="gray" href="/" highContrast underline="hover">
                      No artists{" "}
                      <span style={{ textDecoration: "underline" }}>yet</span>
                    </Link>
                  )}
                </Flex>
              </Flex>
            </SpotlightCard>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default UserPage;
