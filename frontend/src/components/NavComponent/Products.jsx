import { Button, Heading, HStack, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../card/Card";

const Products = () => {
  const [category, setCategory] = useState("All");
  const [products, setProduct] = useState([]);

  const clickHandler = (event) => {
    setCategory(event.target.value);
  };
  useEffect(() => {
    const getData = async() => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/categoryproducts?category=${category}`
        );
        setProduct(data.products);
      } catch (error) {
        console.log(error)
      }
    };
    getData();
  }, [category]);

  return (
    <HStack mb={6} alignItems={"flex-start"} gap={5} pt={'5rem'} >
      <VStack
        w={"40rem"}
        minH={"85vh"}
        border={"4px"}
        borderColor={"gray.500"}
        borderRadius={"md"}
        my={5}
        ml={2}
        justifyContent={"center"}
        position={"relative"}
      >
        <Heading position={"absolute"} top={0}>
          Categories
        </Heading>
        <VStack>
          <Button
            px={14}
            bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
            _focus={{ outlineColor: "blue.500" }}
            value="All"
            onClick={clickHandler}
          >
            All
          </Button>
          <Button
            px={10}
            bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
            _focus={{ outlineColor: "blue.500" }}
            value="Phone"
            onClick={clickHandler}
          >
            Phone
          </Button>
          <Button
            px={7}
            bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
            _focus={{ outlineColor: "blue.500" }}
            value="Laptop"
            onClick={clickHandler}
          >
            Laptops
          </Button>
          <Button
            px={10}
            bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
            _focus={{ outlineColor: "blue.500" }}
            value="Sports"
            onClick={clickHandler}
          >
            Sports
          </Button>
          <Button
            px={10}
            bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
            _focus={{ outlineColor: "blue.500" }}
            value="T-shirt"
            onClick={clickHandler}
          >
            T-shirt
          </Button>
        </VStack>
      </VStack>
      <HStack wrap={"wrap"} gap={2}>
        {products.map((product, index) => {
          return (
            <Card
              key={product._id}
              id={product._id}
              title={product.name}
              price={product.price}
              img={products[index].images[0].url}
            />
          );
        })}
      </HStack>
    </HStack>
  );
};

export default Products;
