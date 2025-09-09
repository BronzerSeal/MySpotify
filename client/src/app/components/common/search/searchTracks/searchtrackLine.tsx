import { Flex, Text } from "@radix-ui/themes";
import "./searchTrackLine.css";
import trackTime from "@/app/utils/trackTime";
import type { FC } from "react";

type TrackLineProps = {
  img: string;
  name: string;
  time: number;
  artistName: string;
};

const SearchTrackLine: FC<TrackLineProps> = ({
  img,
  name,
  time,
  artistName,
}) => {
  return (
    <Flex
      align={"center"}
      gap={"4"}
      justify={"between"}
      maxWidth={"1000px"}
      width={"30rem"}
      height={"50px"}
      style={{ padding: "0px 10px", margin: "3px 0px" }}
      className="BgGrayChange"
    >
      <Flex>
        <img
          src={img}
          alt=""
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "4px",
          }}
        />

        <Flex direction={"column"}>
          <Text size="4" ml={"3"}>
            {name}
          </Text>
          <Text size="3" color="gray" ml={"3"}>
            {artistName}
          </Text>
        </Flex>
      </Flex>

      <Text
        color="gray"
        style={{
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {trackTime(time)}
      </Text>
    </Flex>
  );
};

export default SearchTrackLine;
