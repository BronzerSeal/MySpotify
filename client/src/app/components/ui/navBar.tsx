import { Box, Flex, TextField } from "@radix-ui/themes";
import { Avatar, AvatarFallback, AvatarImage } from "../common/avatar";
import RoundButton from "../common/roundButton";
import { Search } from "lucide-react";
import homeIcon from "../../img/home-icon.png";
import { useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";

function NavBar() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = (text: string) => {
    navigate(`/search/${text}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(value);
    }
  };

  return (
    <Flex
      justify={"between"}
      height={"65px"}
      align={"center"}
      style={{ padding: "0px 20px" }}
    >
      <Avatar>
        <AvatarImage
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4axar_Vv1tnYvhFI56RoCrX1Irn4uLuPzDw&s"
          }
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Flex align={"center"} justify={"between"} width={"410px"}>
        <RoundButton redirect="/" iconUrl={homeIcon} />
        <Box maxWidth="370px">
          <TextField.Root
            onKeyDown={handleKeyDown}
            value={value}
            onInput={onChange}
            placeholder="What do you want to listen?"
            size="3"
            style={{ width: "350px", height: "50px" }}
            variant="soft"
            color="gray"
            radius="full"
          >
            <TextField.Slot>
              <Search height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>
      </Flex>

      <Avatar>
        <AvatarImage src={"https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Flex>
  );
}

export default NavBar;
