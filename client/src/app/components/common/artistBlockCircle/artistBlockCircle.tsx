import { Flex, Text } from "@radix-ui/themes";
import "./artistBlockCircle.css";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

type ArtistBlockProps = {
  image: string;
  name: string;
  who: string;
  variant: "normal" | "userPage";
  id?: string;
};

const ArtistBlockCircle: FC<ArtistBlockProps> = ({
  image,
  name,
  who,
  variant,
  id,
}) => {
  const navigate = useNavigate();
  const handleCardClick = (id: string) => {
    navigate(`/artist/${id}`);
  };
  if (variant === "normal") {
    return (
      <Flex
        direction={"column"}
        width={"200px"}
        height={"240px"}
        justify={"center"}
        align={"center"}
        className="BgGrayChange"
      >
        <Flex
          direction={"column"}
          justify={"center"}
          pt={"2"}
          width={"180px"}
          height={"240px"}
        >
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
          <Text ml={"4"} weight={"bold"}>
            {name}
          </Text>
          <Text ml={"4"} color="gray">
            {who}
          </Text>
        </Flex>
      </Flex>
    );
  } else if (variant === "userPage") {
    return (
      <Flex
        direction={"column"}
        width={"130px"}
        height={"230px"}
        justify={"center"}
        align={"center"}
        className="BgGrayChange"
        onClick={() => handleCardClick(id!)}
      >
        <Flex
          direction={"column"}
          justify={"center"}
          pt={"2"}
          width={"100px"}
          height={"230px"}
        >
          <div style={{ marginBottom: "10px" }}>
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
          <Flex direction="column" align="center" style={{ height: "60px" }}>
            <Text weight="bold">{name}</Text>
            <Text color="gray">{who}</Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }
};

export default ArtistBlockCircle;
