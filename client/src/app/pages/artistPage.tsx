import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Vibrant } from "node-vibrant/browser";
import Silk from "../components/common/Silk.js";
import { Container, Flex, Text } from "@radix-ui/themes";
import { Badge } from "../components/common/badge.js";
import { BadgeCheckIcon } from "lucide-react";
import TrackLine from "../components/common/trackLine/trackLine.js";
import AlbumBlockCircle from "../components/common/albumBlock/albumBlock.js";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../components/common/carousel";
import AudioPlayer from "../components/ui/audioPlayer.js";
import { useTrackPlayer } from "../hooks/useTrackPlayer.js";
import { useArtist } from "../hooks/useArtist.js";

const ArtistPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artist, popularTracks, artistMusic } = useArtist(id!);

  const [bgColor, setbgColor] = useState("");

  const { playingTrack, getAudioForTrack } = useTrackPlayer();

  const handleAlbumClick = (id: string) => {
    navigate(`/album/${id}`);
  };

  useEffect(() => {
    if (artist) {
      Vibrant.from(artist.images[0].url)
        .getPalette()
        .then((palette) => {
          setbgColor(palette.Vibrant?.hex || "#333");
        });
    }
  }, [artist]);

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
            paddingBottom: "10px",
          }}
        >
          <Badge variant="outline">
            <BadgeCheckIcon />
            Подтвержденный исполнитель
          </Badge>
          <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
            {artist ? artist.name : "Artist"}
          </h1>
          <p>{artist ? artist.followers.total : 0} listeners per month</p>
        </div>
      </div>
      <Container mt={"3"} pb={"9"}>
        <Text as="div" size={"6"} weight={"bold"} mb={"2"}>
          Popular tracks
        </Text>
        {popularTracks
          ? popularTracks.map((track, index: number) => (
              <div
                key={track.id}
                onClick={() =>
                  getAudioForTrack({
                    name: track.name,
                    spotifyImg: track.album.images[0].url,
                    artistName: track.artists[0].name,
                  })
                }
              >
                <TrackLine
                  num={index + 1}
                  img={track.album.images[2].url}
                  name={track.name}
                  views={track.popularity}
                  time={track.duration_ms}
                />
              </div>
            ))
          : "Loading"}

        {artistMusic.length > 0 && (
          <>
            <Text as="div" size={"6"} weight={"bold"} mt={"5"} mb={"2"}>
              Music
            </Text>
            <Flex>
              <Carousel
                opts={{ align: "start" }}
                className="w-full max-w-[1000px]"
              >
                <CarouselContent>
                  {artistMusic
                    ? artistMusic.map((music, index) => (
                        <div
                          key={index}
                          onClick={() => handleAlbumClick(music.id)}
                        >
                          <AlbumBlockCircle
                            image={music.images[0].url}
                            name={music.name}
                            who={music.type}
                          />
                        </div>
                      ))
                    : "Loading"}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </Flex>
          </>
        )}
      </Container>
      {playingTrack && artist && (
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
            artist={artist.name}
            audioImg={playingTrack.spotifyImg!}
          />
        </div>
      )}
    </>
  );
};
export default ArtistPage;
