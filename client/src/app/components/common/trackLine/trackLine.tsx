import { Text } from "@radix-ui/themes";
import "./trackLine.css";
import trackTime from "@/app/utils/trackTime";
import type { FC } from "react";

type TrackLineProps = {
  num?: number;
  img: string;
  name: string;
  views: number;
  time: number;
};

const TrackLine: FC<TrackLineProps> = ({ num, img, name, views, time }) => {
  return (
    <div
      className="BgGrayChange"
      style={{
        display: "grid",
        gridTemplateColumns: "30px 40px 1fr 120px 60px",
        alignItems: "center",
        gap: "16px",
        maxWidth: "1000px",
        height: "46px",
        padding: "0 10px",
        margin: "6px 0",
      }}
    >
      {num && (
        <Text size="4" color="gray">
          {num}
        </Text>
      )}

      <img width="40" src={img} alt="" style={{ borderRadius: "4px" }} />

      <Text size="4" truncate>
        {name}
      </Text>

      <Text
        color="gray"
        style={{
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {Math.round(views * 1000 * 1.2129)}
      </Text>

      <Text
        color="gray"
        style={{
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {trackTime(time)}
      </Text>
    </div>
  );
};

export default TrackLine;
