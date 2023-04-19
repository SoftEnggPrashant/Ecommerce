import {
  Button,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../Actions/ProductAction";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css

const Products = () => {
  const dispatch = useDispatch();
  const { data, isLoading,totalProducts,error } = useSelector((state) => state.products);
  const [category, setCategory] = useState("All");
  const [currentPage, setPage] = useState(1);
  console.log(Math.floor((totalProducts/10)+1))

  useEffect(() => {
    dispatch(fetchProduct(category,currentPage));
  }, [dispatch, category,currentPage]);

  const clickHandler = (event) => {
    setCategory(event.target.value);
  };

  const changeCurrentPage = (numPage) => {
    setPage(numPage);
  };

  if (error) return;

  return (
    <Stack w={"full"}>
      <HStack mb={6} w={"full"} alignItems={"flex-start"} gap={5} pt={"5rem"}>
        <VStack
          w={"35rem"}
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
              px={10}
              bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
              _focus={{ outlineColor: "blue.500" }}
              value={"All"}
              onClick={clickHandler}
            >
              All
            </Button>
            <Button
              px={10}
              bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
              _focus={{ outlineColor: "blue.500" }}
              value={"Footwear"}
              onClick={clickHandler}
            >
              Footwear
            </Button>
            <Button
              px={10}
              bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
              _focus={{ outlineColor: "blue.500" }}
              value={"SmartPhones"}
              onClick={clickHandler}
            >
              SmartPhones
            </Button>
            <Button
              px={7}
              bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
              _focus={{ outlineColor: "blue.500" }}
              value={"Laptop"}
              onClick={clickHandler}
            >
              Laptops
            </Button>
            <Button
              px={10}
              bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
              _focus={{ outlineColor: "blue.500" }}
              value={"Sports"}
              onClick={clickHandler}
            >
              Sports
            </Button>
            <Button
              px={10}
              bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
              _focus={{ outlineColor: "blue.500" }}
              value={"T-shirt"}
              onClick={clickHandler}
            >
              T-shirt
            </Button>
            <Button
              px={10}
              bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
              _focus={{ outlineColor: "blue.500" }}
              value={"Camera"}
              onClick={clickHandler}
            >
              Camera
            </Button>
          </VStack>
        </VStack>
        <HStack w={"full"} wrap={"wrap"} gap={2} justifyContent={"center"}>
          {isLoading ? (
            <Stack
              w={"full"}
              flexDirection={"row"}
              justifyContent={"center"}
              h={"90vh"}
              alignItems={"center"}
            >
              <Spinner size={"lg"} color="blue" fontWeight={"bold"} />
            </Stack>
          ) : (
            data.map((product) => {
              return (
                <Card
                  key={product._id}
                  id={product._id}
                  title={product.name}
                  price={product.price}
                  img={product.images[0].url}
                />
              );
            })
          )}
        </HStack>
      </HStack>
      <Stack w={'full'} flexDirection={'row'} justifyContent={'end'} pr={16}>
       <HStack gap={5}>
       <Pagination
          currentPage={currentPage}
          totalPages={Math.floor((totalProducts/10)+1)}
          changeCurrentPage={changeCurrentPage}
          theme="bottom-border"
        />
        <Text fontWeight={'bold'} >{currentPage} of {Math.floor((totalProducts/10)+1)}</Text>
       </HStack>
      </Stack>
    </Stack>
  );
};

export default Products;
