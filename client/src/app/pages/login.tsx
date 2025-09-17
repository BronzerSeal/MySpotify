import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";
import LoginForm from "../components/ui/loginForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <Flex justify={"center"} align={"center"}>
      {formType === "register" ? (
        <RegisterForm onClick={toggleFormType} />
      ) : (
        <LoginForm onClick={toggleFormType} />
      )}
    </Flex>
  );
};

export default Login;
