import { HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Card from "../card/Card";

const Products = () => {
  return (
    <HStack mb={6} alignItems={"flex-start"} gap={5}>
      <VStack
        w={"40rem"}
        minH={"85vh"}
        border={"4px"}
        borderColor={'gray.500'}
        borderRadius={'md'}
        my={5}
        ml={2}
        justifyContent={"center"}
      >
        <Text>Phone</Text>
        <Text>Computer</Text>
        <Text>Sports</Text>
        <Text>T-shirt</Text>
      </VStack>
      <HStack wrap={"wrap"} gap={2}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </HStack>
    </HStack>
  );
};

export default Products;
