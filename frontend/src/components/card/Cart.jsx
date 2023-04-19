import { Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { removeCart } from "../../Actions/CartAction";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const Cart = (props) => {
  const { name, price, images, description, _id } = props.cart;

  const dispatch = useDispatch();

  const removeHandler = () => {
    console.log("product id", _id);
    dispatch(removeCart(_id));
    toast.success(`${name} removed`);
  };

  return (
    <HStack gap={"5rem"} w={"full"} borderBottom={"4px"} pb={5}>
      <Image w={"15rem"} src={images[0].url} />
      <VStack alignItems={"flex-start"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          {name}
        </Text>
        <Text noOfLines={2}>{description}</Text>
        <Text fontSize={"lg"} fontWeight={"bold"} color={"green"}>
          ₹ {price}
        </Text>
        <HStack>
          <Button>
            <NavLink to={`/cardDetail/${_id}`}>Details</NavLink>
          </Button>
          <Button color={"red.300"} onClick={removeHandler}>
            Remove
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Cart;
