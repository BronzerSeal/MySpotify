import { Container, Flex, Text } from "@radix-ui/themes";
import ArtistSearchBlockCircle from "../components/common/search/SearchBlockCircle/artistSearchBlockCircle";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import artistService from "../services/artists.service";
import SearchTrackLine from "../components/common/search/searchTracks/searchtrackLine";
import AudioPlayer from "../components/ui/audioPlayer";
import tracksService from "../services/tracks.service";
import { toast } from "react-toastify";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../components/common/carousel";
import AlbumBlockCircle from "../components/common/albumBlock/albumBlock";

type SearchTrack = {
  id: string;
  name: string;
  image: string;
  artistName: string;
  duration_ms: number;
};

const SearchPage = () => {
  const { text } = useParams<{ text: string }>();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<SpotifyApi.ArtistObjectFull>();
  const [popularTracks, setPopularTracks] = useState<SearchTrack[]>();
  const [playingTrack, setPlayingTrack] = useState<any>();
  const [artistMusic, setArtistMusic] =
    useState<SpotifyApi.AlbumObjectFull[]>();

  const handleCardClick = (id: string) => {
    navigate(`/artist/${id}`, {
      state: artist!.id,
    });
  };

  const handleAlbumClick = (id: string) => {
    navigate(`/album/${id}`);
  };

  useEffect(() => {
    const getArtist = async () => {
      if (text) {
        const data = await artistService.getArtistByName(text);
        setArtist(data);
      }
    };
    getArtist();
  }, [text]);

  useEffect(() => {
    async function getTracks(id: string) {
      const tracks = await artistService.getArtistTopTracksSearch(id);
      setPopularTracks(tracks);
    }
    if (artist) getTracks(artist.id);
  }, [artist]);

  useEffect(() => {
    async function getMusic() {
      if (artist) {
        const music = await artistService.getArtistTopMusicById(artist.id);
        setArtistMusic(music);
      }
    }
    getMusic();
  }, [artist]);

  const getAudioForTrack = async ({
    name,
    img,
    artistName,
  }: {
    name: string;
    img?: string;
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
          spotifyImg: img,
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
      <Container
        style={{
          background: "#1c1d20ff",
          borderRadius: "7px",
          margin: "0px 10px 0px 10px",
          padding: "10px 0px 10px 0px",
        }}
      >
        <Flex wrap={"wrap"}>
          <Flex direction={"column"}>
            <Text as="div" size={"6"} weight={"bold"} mb={"3"}>
              best result
            </Text>
            {artist ? (
              <div onClick={() => handleCardClick(artist.id)}>
                <ArtistSearchBlockCircle
                  image={artist.images[0].url}
                  name={artist.name}
                  who={artist.type}
                />
              </div>
            ) : (
              "loading..."
            )}
          </Flex>
          <Flex direction={"column"} ml={"4"}>
            <Text as="div" size={"6"} weight={"bold"} mb={"5"}>
              tracks
            </Text>
            {popularTracks?.map((track) => (
              <div
                key={track.id}
                onClick={() =>
                  getAudioForTrack({
                    name: track.name,
                    img: track.image,
                    artistName: track.artistName,
                  })
                }
              >
                <SearchTrackLine
                  img={track.image}
                  name={track.name}
                  artistName={track.artistName}
                  time={track.duration_ms}
                />
              </div>
            ))}
          </Flex>
        </Flex>
        <Text as="div" size={"6"} weight={"bold"} mb={"5"}>
          music
        </Text>
        <Flex>
          <Carousel opts={{ align: "start" }} className="w-full max-w-[1000px]">
            <CarouselContent>
              {artistMusic
                ? artistMusic.map((music, index) => (
                    <div key={index} onClick={() => handleAlbumClick(music.id)}>
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
            audioImg={playingTrack.spotifyImg}
          />
        </div>
      )}
    </>
  );
};

export default SearchPage;
