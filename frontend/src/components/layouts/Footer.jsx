import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <HStack
      w={"100%"}
      justifyContent={"center"}
      bgImage={"linear-gradient(to left top, #09203f 0%, #537895 100%)"}
      p={5}
    >
      <HStack gap={"20rem"}>
        <VStack alignItems={"flex-start"}>
          <Heading color={"white"} size={"lg"}>
            Heading 1
          </Heading>
          <Text color={"white"}>Payment Center</Text>
          <Text color={"white"}>Contact Directory</Text>
          <Text color={"white"}>Form</Text>
          <Text color={"white"}>News and Update</Text>
          <Text color={"white"}>FAQs</Text>
        </VStack>
        <VStack alignItems={"flex-start"}>
          <Heading color={"white"} size={"lg"}>
            Heading 2
          </Heading>
          <Text color={"white"}>Website Tutorial</Text>
          <Text color={"white"}>Accessibility</Text>
          <Text color={"white"}>Disclaimer</Text>
          <Text color={"white"}>Privacy Policy</Text>
          <Text color={"white"}>FAQs</Text>
        </VStack>
        <VStack>
          <Heading color={"white"} size={"lg"}>
            Follow Us
          </Heading>
          <BsFacebook fontSize={"2.5rem"} color={"white"}/>
          <BsTwitter fontSize={"2.5rem"} color={"white"} />
          <BsInstagram fontSize={"2.5rem"} color={"white"} />
          <BsLinkedin fontSize={"2.5rem"} color={"white"} />
        </VStack>
      </HStack>
    </HStack>
  );
};

export default Footer;
