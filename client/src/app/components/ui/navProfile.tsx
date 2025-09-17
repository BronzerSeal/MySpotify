import { getCurrentUserData } from "@/app/store/userSlice";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../common/avatar";
import { useNavigate } from "react-router-dom";
import type { User } from "@/app/services/user.service";

const NavProfile = () => {
  const currentUser: User = useSelector(getCurrentUserData())!;
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`user/${id}`);
  };

  if (!currentUser) return "loading";
  return (
    <Avatar onClick={() => handleClick(currentUser._id)}>
      <AvatarImage src={currentUser.image} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default NavProfile;
