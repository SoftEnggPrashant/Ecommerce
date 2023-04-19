import {
  Button,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarts } from "../../Actions/CartAction";
import Cart from "../card/Cart";
import { NavLink } from "react-router-dom";

const Carts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { Carts, isLoading } = useSelector((state) => state.Cart);

  useEffect(() => {
    if (Carts.length === 0) {
      dispatch(getCarts(user._id));
    }
  }, [dispatch, user._id, Carts.length]);

  return (
    <Stack w={"full"} pt={"5rem"}>
      <Heading textAlign={"center"}>Your Card</Heading>
      {Carts.length === 0 ? (
        <HStack
          w={"full"}
          h={"100vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <NavLink to={"/"}>
            <Button>Purchage</Button>
          </NavLink>
        </HStack>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <HStack
          w={"full"}
          alignItems={"flex-start"}
          flexDirection={["column", "row"]}
        >
          <VStack w={"70%"}>
            {Carts.map((cart) => (
              <Cart key={cart._id} cart={cart} />
            ))}
          </VStack>
          <Stack
            w={"full"}
            flexDirection={"row"}
            justifyContent={"space-around"}
          >
            <VStack
              w={"50%"}
              h={"50vh"}
              position={"relative"}
              justifyContent={"space-evenly"}
              border={"4px"}
              borderColor={"gray.400"}
              borderRadius={"lg"}
            >
              <Heading
                bgColor={"green.400"}
                px={12}
                py={5}
                color={"white"}
                borderRadius={"base"}
                w={"full"}
                textAlign={"center"}
                position={"absolute"}
                top={0}
              >
                Summary
              </Heading>
              <VStack alignItems={"flex-start"} gap={5}>
                <Text>Total Items :{Carts.length}</Text>
                <Text>
                  Total Amount :
                  {Carts.reduce(
                    (accu, CurrentItem) => accu + CurrentItem.price,
                    0
                  )}
                </Text>
                <Button>Buy Now</Button>
              </VStack>
            </VStack>
          </Stack>
        </HStack>
      )}
    </Stack>
  );
};

export default Carts;
