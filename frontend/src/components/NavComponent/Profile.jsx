import { Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {

  const {setAuthenticated} = props;
  
  const data = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const logoutHandler = async()=>{

    try{
      const {data} = await axios.get('http://localhost:4000/api/v1/logout');
      console.log(data);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setAuthenticated(false);
      navigate("/login");
    }catch(error){
      console.log(error);
    }

  }
  return (
    <VStack w={"100%"} h={"100vh"}>
      <HStack h={"full"} w={"full"} justifyContent={"center"}>
        <VStack pr={5}>
          <Image src={data.avatar.url} w={"15rem"} borderRadius={"full"} />
        </VStack>
        <HStack gap={3} borderLeft={"4px"} h={"10rem"} borderColor={"gray.300"}>
          <VStack alignItems={"flex-start"} pl={5}>
            <Text>Username</Text>
            <Text>Email</Text>
          </VStack>
          <VStack alignItems={"flex-start"} pl={5}>
            <Text>{data.name}</Text>
            <Text>{data.email}</Text>
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
