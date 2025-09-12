import { Flex, Text } from "@radix-ui/themes";
import "./trackLine.css";
import trackTime from "@/app/utils/trackTime";
import type { FC } from "react";

type TrackLineProps = {
  name: string;
  time: number;
  artistName: string;
  num: number;
};

const TrackLineAlbum: FC<TrackLineProps> = ({
  name,
  time,
  artistName,
  num,
}) => {
  return (
    <Flex
      align={"center"}
      gap={"4"}
      justify={"between"}
      style={{
        width: "100%",
        minHeight: "50px",
        padding: "0 20px",
        margin: "3px 0",
      }}
      className="BgGrayChange"
    >
      <Flex>
        <Text size="4" color="gray" mr={"1"}>
          {num}
        </Text>

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

export default TrackLineAlbum;
