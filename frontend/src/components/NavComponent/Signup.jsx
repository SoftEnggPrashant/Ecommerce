import {
  Button,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import axios from "axios";

const Signup = (props) => {

  const {setAuthenticated,setProfileData} = props;

  const [userData, setUserData] = useState({
    name: "",
    password: "",
    confirmPassword:"",
    email: "",
    avatar: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (event) => {
    const {name,value} = event.target;
    if(name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if(reader.readyState === 2){
          setUserData( prevState =>({
            ...prevState,
              avatar: reader.result
          }))
        }
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    else{
      setUserData( prevState =>({
       ...prevState,
          [name]: value
      }))
    }
  };

  const registerUser = async(userData) =>{
    try{

      const {data} = await axios.post('http://localhost:4000/api/v1/register',userData);
      console.log(data);
      setAuthenticated(true);
      setProfileData(data.user);
      localStorage.setItem('user',data.user);
      navigate('/');

    }
    catch(error){
      console.log(error);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword) {
      toast.error(`Please fill all fields`);
    }
    else{
      if(userData.password!== userData.confirmPassword) {
        toast.error("Passwords do not match");
      }  
      else{
        console.log(userData);
        registerUser(userData);
      }
    }
  };

  return (
    <HStack w={"100%"} h={"100vh"} justifyContent={"center"}>
      <VStack
        w={"40rem"}
        gap={5}
        bgColor={"gray.300"}
        px={5}
        py={10}
        borderRadius={"2xl"}
      >
        <Heading>Register</Heading>
        <form onSubmit={submitHandler}>
          <VStack gap={5} w={"25rem"}>
            <FormControl>
              <Input
                type="text"
                value={userData.name}
                placeholder={"Enter the Username"}
                name="name"
                onChange={changeHandler}
              />
            </FormControl>

            <FormControl>
              <Input
                type="email"
                value={userData.email}
                placeholder={"prashantrajpoot@gmail.com"}
                name="email"
                onChange={changeHandler}
              />
            </FormControl>

            <FormControl position={"relative"}>
              <Input
                type={passwordVisible ? "text" : "password"}
                value={userData.password}
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
                h={"1.5rem"}
                variant={"unstyled"}
                zIndex={1}
                onClick={() => setPasswordVisible(!passwordVisible)}
              ></IconButton>
            </FormControl>
            <FormControl position={"relative"}>
              <Input
                type={confirmPasswordVisible ? "text" : "password"}
                value={userData.confirmPassword}
                placeholder={"ConfirmPassword"}
                name="confirmPassword"
                onChange={changeHandler}
              />
              <IconButton
                icon={
                  confirmPasswordVisible ? (
                    <AiFillEyeInvisible fontSize={"1.5rem"} />
                  ) : (
                    <AiFillEye fontSize={"1.5rem"} />
                  )
                }
                position={"absolute"}
                bgColor={"gray.300"}
                right={1}
                top={1.5}
                h={"1.5rem"}
                variant={"unstyled"}
                zIndex={1}
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              ></IconButton>
            </FormControl>
            <FormControl>
              <Input
                className="custom-file-input"
                type="file"
                name="avatar"
                onChange={changeHandler}
                accept="image/*"
              />
              {
                userData.avatar? (
                  <Image
                    src={userData.avatar}
                    alt="profile"
                    w={'5rem'}
                    borderRadius={'full'}
                    mt={5}
                  />
                ) : null
              }
            </FormControl>
          </VStack>
          <HStack justifyContent={"space-between"} mt={10}>
            <button className="btn">Signup</button>
            <Button
              px={"2rem"}
              py={"1.7rem"}
              mt={"1rem"}
              bgColor={"rgb(90, 90, 240)"}
              color={"white"}
              _hover={{ opacity: "0.5" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </HStack>
        </form>
      </VStack>
      <ToastContainer />
    </HStack>
  );
};

export default Signup;
