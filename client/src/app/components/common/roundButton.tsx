import { Flex } from "@radix-ui/themes";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

type RoundButtonProps = {
  iconUrl: string;
  redirect: string;
};

const RoundButton: FC<RoundButtonProps> = ({ iconUrl, redirect }) => {
  const navigate = useNavigate();
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
      onClick={() => navigate("")}
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
