import userService, { type User } from "@/app/services/user.service";
import type { AppDispatch } from "@/app/store/store";
import { logOut } from "@/app/store/userSlice";
import { Button, Container, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import SpotlightCard from "../components/ui/SpotlightCard";
import artistService from "../services/artists.service";
import ArtistBlockCircle from "../components/common/artistBlockCircle/artistBlockCircle";
import UserCard from "../components/ui/userCard";
import Genres from "../components/ui/genres";

const UserPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
  const [loadingArtist, setLoadingArtist] = useState(true);

  useEffect(() => {
    async function getArtists() {
      const persons = await artistService.getRandomArtists();

      setArtists(persons);
      setLoadingArtist(false);
    }
    getArtists();
  }, []);
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
        <Flex justify={"between"} width={"600px"}>
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
              <Flex width={"400px"} direction={"column"}>
                <Text size={"4"} weight={"bold"}>
                  favourite artists
                </Text>
                <Flex>
                  {!loadingArtist &&
                    artists
                      .slice(0, 3)
                      .map((artist) => (
                        <ArtistBlockCircle
                          key={artist.id}
                          variant="userPage"
                          image={
                            artist.images[1]?.url ||
                            "https://github.com/shadcn.png"
                          }
                          name={artist.name}
                          who={artist.type}
                          id={artist.id}
                        />
                      ))}
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
