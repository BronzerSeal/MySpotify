import { Flex } from "@radix-ui/themes";
import type { FC } from "react";

type RoundButtonProps = {
  iconUrl: string;
};

const RoundButton: FC<RoundButtonProps> = ({ iconUrl }) => {
  return (
    <Flex
      width={"50px"}
      height={"50px"}
      align={"center"}
      justify={"center"}
      style={{
        background: "#212226",
        color: "white",
        borderRadius: "48%",
        cursor: "pointer",
      }}
    >
      <img
        src={iconUrl}
        width={"50px"}
        style={{ borderRadius: "48%" }}
        alt="home"
      />
    </Flex>
  );
};

export default RoundButton;
