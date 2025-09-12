import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import albumsService from "../services/albums.service";
import Balatro from "../components/common/Balatro/Balatro";
import { Container, Flex, Text } from "@radix-ui/themes";
import TrackLineAlbum from "../components/common/trackLine/trackLineAlbum";
import tracksService from "../services/tracks.service";
import { toast } from "react-toastify";
import AudioPlayer from "../components/ui/audioPlayer";
import { Vibrant } from "node-vibrant/browser";

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<SpotifyApi.AlbumObjectFull>();
  const [playingTrack, setPlayingTrack] = useState<any>();
  const [bgColors, setbgColors] = useState<string[]>();

  useEffect(() => {
    if (album) {
      Vibrant.from(album.images[0].url)
        .getPalette()
        .then((palette) => {
          const colors = [
            palette.Vibrant?.hex,
            palette.DarkVibrant?.hex,
            palette.Muted?.hex,
          ].filter((c): c is string => Boolean(c));

          setbgColors(colors.length ? colors : ["#333", "#555", "#777"]);
        });
    }
  }, [album]);

  useEffect(() => {
    async function getAlbum() {
      const alb = await albumsService.getAlbumById(id!);
      setAlbum(alb);
    }
    getAlbum();
  }, []);

  const getAudioForTrack = async ({
    name,
    artistName,
  }: {
    name: string;
    artistName: string;
  }) => {
    try {
      const audio = await tracksService.getAudioForTreckByNamePlusArtist(
        name,
        artistName
      );
      if (audio) {
        setPlayingTrack({
          ...audio,
          spotifyTrackName: name,
        });
      } else {
        setPlayingTrack(null);
      }
    } catch (err) {
      toast("Sorry not found track in base. Try another one ;)");
    }
  };

  return (
    <>
      <div style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0, // = top:0; right:0; bottom:0; left:0;
            zIndex: 0,
          }}
        >
          {bgColors && (
            <Balatro
              isRotate={false}
              mouseInteraction={false}
              pixelFilter={700}
              color1={bgColors[0]}
              color2={bgColors[1]}
              color3={bgColors[2]}
            />
          )}
        </div>

        <Container
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: "100px",
            paddingBottom: "40px",
          }}
        >
          <Flex gap="4" align="end">
            <img
              src={album?.images[0].url}
              width="250px"
              style={{ borderRadius: "10px" }}
              alt=""
            />
            <Flex direction="column">
              <Text color="gray">{album?.album_type}</Text>
              <Text style={{ fontSize: "80px" }} weight="bold">
                {album?.name}
              </Text>
              <Text as="div" color="gray">
                {album?.artists.map((artist) => artist.name).join(", ")}
              </Text>
            </Flex>
          </Flex>
        </Container>
      </div>

      <Container mt="3" pb="9">
        {album?.tracks.items.map((track, index) => (
          <div
            key={track.id}
            onClick={() =>
              getAudioForTrack({
                name: track.name,
                artistName: track.artists[0].name,
              })
            }
          >
            <TrackLineAlbum
              key={track.id}
              num={index + 1}
              name={track.name}
              time={track.duration_ms}
              artistName={album?.artists
                .map((artist) => artist.name)
                .join(", ")}
            />
          </div>
        ))}
      </Container>
      {playingTrack && album && (
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
            artist={album.artists[0].name}
            audioImg={playingTrack.dezeerImg}
          />
        </div>
      )}
    </>
  );
};

export default AlbumPage;
