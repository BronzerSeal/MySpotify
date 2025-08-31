import { Flex, Text } from "@radix-ui/themes";
import "./artistBlockCircle.css";
import type { FC } from "react";

type ArtistBlockProps = {
  image: string;
  name: string;
  who: string;
};

const ArtistBlockCircle: FC<ArtistBlockProps> = ({ image, name, who }) => {
  return (
    <Flex
      direction={"column"}
      width={"200px"}
      height={"240px"}
      justify={"center"}
      align={"center"}
      className="BgGrayChange"
    >
      <Flex direction={"column"} pt={"2"} width={"180px"} height={"240px"}>
        <div className="artist-img-wrapper">
          <img
            src={image}
            alt="ArtistLogo"
            style={{
              borderRadius: "50%",
              width: "160px",
              height: "160px",
              objectFit: "cover",
            }}
          />
          <div className="play-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="28px"
              height="28px"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <Text ml={"3"} weight={"bold"}>
          {name}
        </Text>
        <Text ml={"3"} color="gray">
          {who}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ArtistBlockCircle;
