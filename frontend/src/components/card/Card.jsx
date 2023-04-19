import { Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../Actions/CartAction";
import { toast } from "react-toastify";

const Card = (props) => {
  const { id, title, img, price } = props;
  const { Carts } = useSelector((state) => state.Cart);
  const {
    user: { _id },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addtoCartHandler = (productId) => {
    dispatch(addToCartAction(_id, productId));
    toast.success("Product added successfully");
  };

  return (
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
        <Link to={`/cardDetail/${id}`}>
          <Image
            src={img}
            borderRadius={"md"}
            w={"12rem"}
            h={"12rem"}
            objectFit={"contain"}
          />
        </Link>
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
          {Carts.length > 0 && Carts.some((cart) => cart._id === id) ? (
            <Link to={"/carts"}>
              <Button
                borderRadius={"2xl"}
                bgImage={"linear-gradient(to right, #d9afd9 0%, #97d9e1 100%)"}
                px={3}
                color={"white"}
                _hover={{ opacity: 0.8 }}
              >
                Preview
              </Button>
            </Link>
          ) : (
            <Button
              borderRadius={"2xl"}
              bgImage={"linear-gradient(to right, #d9afd9 0%, #97d9e1 100%)"}
              px={3}
              color={"white"}
              _hover={{ opacity: 0.8 }}
              onClick={() => addtoCartHandler(id)}
            >
              Add to Cart
            </Button>
          )}
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;
