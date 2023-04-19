import { Avatar, Button, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import ReactStars from "react-stars";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewAction } from "../../Actions/ProductDetailAction";
import { toast } from "react-toastify";

const ReviewCard = (props) => {
  const { user } = useSelector((state) => state.user);

  const { review,productId } = props;
  const dispatch = useDispatch();
  console.log("review", review);
  console.log("product Id",productId);

  const deleteHandler  = ()=>{
    dispatch(deleteReviewAction(productId));
    toast.success('Review deleted successfully');
  }
  
  return (
    <VStack
      w={"full"}
      alignItems={"flex-start"}
      borderTop={"2px"}
      py={10}
      pl={5}
    >
      <HStack gap={10}>
        <Avatar />
        <VStack>
          <Text>{review.name}</Text>
          <Text>{review.comment}</Text>
        </VStack>
      </HStack>
      <HStack w={"full"}>
        <HStack w={"25%"} gap={2}>
          <Text>Rating : </Text>
          <ReactStars
            value={review.rating}
            size={24}
            color2={"#ffd700"}
            half={true}
            edit={false}
          />
        </HStack>
        {user._id === review.user && (
          <HStack w={"full"} justifyContent={"flex-start"}>
            <Button _hover={{ color: "red" }} onClick={deleteHandler} >
              <AiOutlineDelete fontSize={"2rem"} />
            </Button>
          </HStack>
        )}
      </HStack>
    </VStack>
  );
};

export default ReviewCard;
