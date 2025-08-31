import { Container } from "@radix-ui/themes";
import NavBar from "./app/components/ui/navBar";
import PopularArtists from "./app/components/ui/popularArtists";
import PopularAlbums from "./app/components/ui/popularAlbums";
import PopularTracks from "./app/components/ui/popularTracks";

function App() {
  return (
    <>
      <NavBar />
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
}

export default App;
