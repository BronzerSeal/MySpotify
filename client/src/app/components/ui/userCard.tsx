import { Flex, Text } from "@radix-ui/themes";
import SpotlightCard from "./SpotlightCard";
import { Cog } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const UserCard = ({
  name,
  img,
  dopInfo,
}: {
  name: string;
  img: string;
  dopInfo?: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const settingsClick = () => {
    navigate(location.pathname + "/edit");
  };
  return (
    <SpotlightCard>
      <div style={{ position: "relative" }}>
        <Text
          as="div"
          style={{ position: "absolute", right: "4px", top: "4px" }}
          onClick={settingsClick}
        >
          <Cog height={"20px"} />
        </Text>
        <Flex
          align={"center"}
          justify={"center"}
          width={"150px"}
          height={"170px"}
          direction={"column"}
          ml={"6"}
        >
          <img style={{ width: "120px" }} src={img} />
          <Text size={"4"} weight={"bold"}>
            {name}
          </Text>

          <Text align={"center"} color="gray">
            {dopInfo}
          </Text>
        </Flex>
      </div>
    </SpotlightCard>
  );
};

export default UserCard;
