import { Flex, Text } from "@radix-ui/themes";
import "./artistSearchBlockCircle.css";
import type { FC } from "react";

type ArtistBlockProps = {
  image: string;
  name: string;
  who: string;
};

const ArtistSearchBlockCircle: FC<ArtistBlockProps> = ({
  image,
  name,
  who,
}) => {
  return (
    <Flex
      direction={"column"}
      width={"350px"}
      height={"220px"}
      style={{
        borderRadius: "10px",
        position: "relative",
      }}
      className="BgSearchGrayChange"
    >
      <Flex
        direction={"column"}
        justify={"center"}
        pt={"2"}
        width={"180px"}
        height={"240px"}
      >
        <div className="artist-search-img-wrapper">
          <img
            src={image}
            alt="ArtistLogo"
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
          />
        </div>
        <Flex direction={"column"} align={"baseline"}>
          <Text as="div" size={"7"} weight={"bold"} mt={"3"}>
            {name}
          </Text>
          <Text ml={"4"} color="gray">
            {who}
          </Text>
        </Flex>
      </Flex>

      {/* кружок вынесен сюда */}
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
    </Flex>
  );
};

export default ArtistSearchBlockCircle;
