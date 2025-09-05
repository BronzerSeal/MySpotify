import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Vibrant } from "node-vibrant/browser";
import Silk from "../components/common/Silk.js";
import { Container, Text } from "@radix-ui/themes";
import { Badge } from "../components/common/badge.js";
import { BadgeCheckIcon } from "lucide-react";
import artistService from "../services/artists.service.js";
import TrackLine from "../components/common/trackLine/trackLine.js";

const ArtistPage = () => {
  const location = useLocation();
  const artist = location.state;
  const [bgColor, setbgColor] = useState("");
  const [popularTracks, setPopularTracks] =
    useState<SpotifyApi.TrackObjectFull[]>();

  useEffect(() => {
    Vibrant.from(artist.images[0].url)
      .getPalette()
      .then((palette) => {
        setbgColor(palette.Vibrant?.hex || "#333");
      });
  }, []);

  useEffect(() => {
    async function getArtists() {
      const tracks = await artistService.getArtistTopTenTracksbyId(artist.id);
      setPopularTracks(tracks);
    }
    getArtists();
  }, []);

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        {bgColor && (
          <Silk
            speed={5}
            scale={0.5}
            color={bgColor}
            noiseIntensity={0.5}
            rotation={0}
          />
        )}

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            color: "white",
            textAlign: "center",
          }}
        >
          <Badge variant="outline">
            <BadgeCheckIcon />
            Подтвержденный исполнитель
          </Badge>
          <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
            {artist.name}
          </h1>
          <p>{artist.followers.total} listeners per month</p>
        </div>
      </div>
      <Container mt={"3"}>
        <Text as="div" size={"6"} weight={"bold"} mb={"2"}>
          Popular tracks
        </Text>
        {popularTracks
          ? popularTracks.map((track, index: number) => (
              <TrackLine
                key={track.id}
                num={index + 1}
                img={track.album.images[2].url}
                name={track.name}
                views={track.popularity}
                time={track.duration_ms}
              />
            ))
          : "Loading"}
      </Container>
    </>
  );
};
export default ArtistPage;
