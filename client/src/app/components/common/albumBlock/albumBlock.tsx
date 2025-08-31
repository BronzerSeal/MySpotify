import { Flex, Text } from "@radix-ui/themes";
import "./albumBlock.css";
import type { FC } from "react";

type AlbumBlockProps = {
  image: string;
  name: string;
  who?: string;
};

const AlbumBlockCircle: FC<AlbumBlockProps> = ({ image, name, who }) => {
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
        <div className="album-img-wrapper">
          <img
            src={image}
            alt="AlbumLogo"
            style={{
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
          {who || ""}
        </Text>
      </Flex>
    </Flex>
  );
};

export default AlbumBlockCircle;
