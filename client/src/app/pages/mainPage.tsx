import { Container } from "@radix-ui/themes";
import PopularAlbums from "../components/ui/popularAlbums";
import PopularArtists from "../components/ui/popularArtists";
import PopularTracks from "../components/ui/popularTracks";

const MainPage = () => {
  return (
    <>
      <Container
        style={{
          background: "#1c1d20ff",
          borderRadius: "7px",
          margin: "0px 10px 0px 10px",
          padding: "10px 0px 10px 0px",
        }}
      >
        <PopularTracks />
        <PopularArtists />
        <PopularAlbums />
      </Container>
    </>
  );
};

export default MainPage;
