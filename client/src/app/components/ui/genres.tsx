import { Badge, Flex, Text } from "@radix-ui/themes";
import SpotlightCard from "./SpotlightCard";
type Genre = {
  color: string;
  name: string;
  _id: string;
};

const Genres = ({ genres }: { genres: Genre[] }) => {
  return (
    <SpotlightCard padding={6}>
      <Flex
        align={"center"}
        width={"180px"}
        height={"55px"}
        direction={"column"}
      >
        <Text size={"4"} weight={"bold"}>
          favourite genres
        </Text>
        <Flex mt={"1"} wrap={"wrap"} gap={"1"}>
          {genres.length > 0 ? (
            genres.map((genre) => (
              <Badge
                key={genre._id}
                style={{
                  marginRight: "7px",
                  background: genre.color,
                  color: "white",
                }}
              >
                {genre.name}
              </Badge>
            ))
          ) : (
            <p> none</p>
          )}
        </Flex>
      </Flex>
    </SpotlightCard>
  );
};

export default Genres;
