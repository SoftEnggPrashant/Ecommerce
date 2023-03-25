import {
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

const Login = (props) => {


  const {login} = props;

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const changeHandler = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (loginData.email || loginData.password) {
      login(loginData);
    }
    else{
      toast.error("Please fill the all fields");
    }
    console.log(loginData);
  };

  return (
    <HStack w={"100%"} h={"100vh"} justifyContent={"center"}>
      <VStack
        w={"40rem"}
        gap={10}
        bgColor={"gray.300"}
        px={5}
        py={10}
        borderRadius={"2xl"}
      >
        <Heading>Login</Heading>
        <form onSubmit={submitHandler}>
          <VStack gap={8} w={"25rem"}>
            <FormControl>
              <Input
                type="email"
                value={loginData.email}
                placeholder={"prashantrajpoot@gmail.com"}
                name="email"
                onChange={changeHandler}
              />
            </FormControl>

            <FormControl position={"relative"}>
              <Input
                type={passwordVisible ? "text" : "password"}
                value={loginData.password}
                placeholder={"password"}
                name="password"
                onChange={changeHandler}
              />
              <IconButton
                icon={
                  passwordVisible ? (
                    <AiFillEyeInvisible fontSize={"1.5rem"} />
                  ) : (
                    <AiFillEye fontSize={"1.5rem"} />
                  )
                }
                position={"absolute"}
                bgColor={"gray.300"}
                right={1}
                top={1.5}
                variant={"unstyled"}
                zIndex={1}
                h={"1.5rem"}
                onClick={() => setPasswordVisible(!passwordVisible)}
              ></IconButton>
            </FormControl>
          </VStack>
          <HStack justifyContent={"center"} mt={10}>
            <button className="btn">Login</button>
          </HStack>
        </form>
      </VStack>
      <ToastContainer />
    </HStack>
  );
};

export default Login;
