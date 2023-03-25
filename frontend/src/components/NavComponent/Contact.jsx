import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import formImage from "../../assets/formImage.png";

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const changeHandler = (event) => {
    setContactData(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Contact Data",contactData);
  };

  return (
    <VStack
      justifyContent={"center"}
      w={"100%"}
      h={"100vh"}
      gap={5}
      bgColor={"gray.200"}
    >
      <Heading>Contact</Heading>
      <HStack>
        <VStack gap={"2rem"} bgColor={"white"} px={"4rem"} py={"1rem"}>
          <Heading>Contact Us</Heading>
          <HStack>
            <FormControl>
              <FormLabel>FULL NAME</FormLabel>
              <Input
                type="text"
                name="name"
                value={contactData.name}
                placeholder="Name"
                onChange={changeHandler}
              />
            </FormControl>
            <FormControl>
              <FormLabel>EMAIL ADDRESS</FormLabel>
              <Input
                type="email"
                name="email"
                value={contactData.email}
                placeholder="Email"
                onChange={changeHandler}
              />
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>SUBJECT</FormLabel>
            <Input
              type="text"
              name="subject"
              value={contactData.subject}
              placeholder="Subject"
              onChange={changeHandler}
            />
          </FormControl>
          <FormControl>
            <FormLabel>MESSAGE</FormLabel>
            <Textarea
              placeholder="Message"
              name="message"
              value={contactData.message}
              onChange={changeHandler}
            ></Textarea>
          </FormControl>
          <Button bgColor={"blue.300"} color={"white"} onClick={submitHandler}>
            Send Message
          </Button>
        </VStack>
        <VStack>
          <Image src={formImage} w={"25rem"} h={"33.2rem"} ml={-4} />
        </VStack>
      </HStack>
      <HStack>{/* icons */}</HStack>
    </VStack>
  );
};

export default Contact;
