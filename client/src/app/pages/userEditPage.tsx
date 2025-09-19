import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/common/card";
import { Flex, Text } from "@radix-ui/themes";
import { Input } from "../components/common/input";
import { Label } from "../components/common/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../store/userSlice";
import { getGenres, getGenresLoadingStatus } from "../store/genreSlice";
import { validator } from "../utils/validator";
import { Button } from "../components/common/button";
import { MultiSelect } from "../components/common/MultiSelect";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store/store";
import type { User } from "../services/user.service";

const UserEditPage = () => {
  type Errors = {
    name?: string;
    email?: string;
  };

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<User>();
  const user = useSelector(getCurrentUserData());
  const dispatch = useDispatch<AppDispatch>();
  const genresLoading = useSelector(getGenresLoadingStatus());
  const genres = useSelector(getGenres());
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(
      updateUser(
        {
          ...data!,
        },
        navigate
      )
    );
  };

  useEffect(() => {
    if (!genresLoading && user && !data) {
      setData(user);
    }
  }, [genresLoading, user, data]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  const validatorConfog = {
    email: {
      isRequired: {
        message: "Email is required",
      },
      isEmail: {
        message: "Incorrect email",
      },
    },

    name: {
      isRequired: {
        message: "Enter your name",
      },
    },
  };

  const handleChange = ({ target }: any) => {
    setData(
      (prevState) =>
        ({
          ...prevState,
          [target.name]: target.value,
        } as any)
    );
  };
  const handleGenreChange = (selectedGenres: any) => {
    setData(
      (prevState) =>
        ({
          ...prevState,
          genres: selectedGenres,
        } as any)
    );
  };

  function validate() {
    const errors = validator(data, validatorConfog);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <Flex justify={"center"} mt={"2"}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={data!.email}
                  onChange={handleChange}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="a@example.com"
                  required
                />
                {errors.email && (
                  <Text as="p" color="red" size={"2"}>
                    {errors.email}
                  </Text>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">name</Label>
                <Input
                  value={data!.name}
                  onChange={handleChange}
                  name="name"
                  id="name"
                  type="name"
                  placeholder="My name"
                  required
                />
                {errors.name && (
                  <Text as="p" color="red" size={"2"}>
                    {errors.name}
                  </Text>
                )}
              </div>
              <div className="grid gap-2">
                <MultiSelect
                  options={genres!}
                  value={data!.genres}
                  onChange={(selected) => handleGenreChange(selected)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Your life title</Label>
                <Input
                  value={data!.dopInfo}
                  onChange={handleChange}
                  name="dopInfo"
                  id="dopInfo"
                  type="text"
                  placeholder="Fuck music"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} className="w-full">
            Update profile
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default UserEditPage;
