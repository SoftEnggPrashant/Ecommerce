import { Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Actions/UserActions";

const Profile = (props) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    dispatch(logOut());
    navigate("/");
  };
  return (
    <VStack w={"100%"} h={"100vh"}>
      <HStack h={"full"} w={"full"} justifyContent={"center"}>
        <VStack pr={5}>
          <Image src={user.avatar.url} w={"15rem"} borderRadius={"full"} />
        </VStack>
        <HStack gap={3} borderLeft={"4px"} h={"10rem"} borderColor={"gray.300"}>
          <VStack alignItems={"flex-start"} pl={5}>
            <Text>Username</Text>
            <Text>Email</Text>
          </VStack>
          <VStack alignItems={"flex-start"} pl={5}>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
          </VStack>
        </HStack>
      </HStack>
      <VStack pb={"3rem"} w={"10rem"}>
        <Button
          bgColor={"blue.400"}
          color={"white"}
          _hover={{ backgroundColor: "blue.200" }}
          w={"10rem"}
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </VStack>
    </VStack>
  );
};

export default Profile;
