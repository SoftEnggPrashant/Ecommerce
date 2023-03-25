import { Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { id, title, img, price } = props;
  return (
    <Link to={`/cardDetail/${id}`}>
      <VStack
        bgColor={"gray.100"}
        borderRadius={"md"}
        my={5}
        boxShadow={"2xl"}
        css={{
          "&:hover": { transform: "scale(1.05)", transition: "all 0.8s" },
        }}
      >
        <VStack p={2}>
          <Image
            src={img}
            borderRadius={"md"}
            w={"12rem"}
            h={"12rem"}
            objectFit={"cover"}
          />
          <Text color={"green.300"}>{`₹${price}`}</Text>
          <Text noOfLines={1}>{title}</Text>
          <HStack>
            <Button
              borderRadius={"2xl"}
              bgImage={"linear-gradient(to top,#AF40FF, #5B42F3 50%,#00DDEB)"}
              px={5}
              _hover={{ opacity: 0.8 }}
              color={"white"}
            >
              Buy Now
            </Button>
            <Button
              borderRadius={"2xl"}
              bgImage={"linear-gradient(to right, #d9afd9 0%, #97d9e1 100%)"}
              px={3}
              color={"white"}
              _hover={{ opacity: 0.8 }}
            >
              Add to Cart
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Link>
  );
};

export default Card;
