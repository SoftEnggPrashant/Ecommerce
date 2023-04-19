import {
  Button,
  FocusLock,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetail,
  submitReviewAction,
} from "../../Actions/ProductDetailAction";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ReactStars from "react-stars";
import ReviewCard from "./ReviewCard";
import { addToCartAction } from "../../Actions/CartAction";
import { toast } from "react-toastify";

const CardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, error, reviewSubmited, reviewDeleted } = useSelector(
    (state) => state.productDetail.productDetail
  );
  const { Carts } = useSelector((state) => state.Cart);
  const {
    user: { _id },
  } = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState(
    product && product.stock !== 0 ? 1 : 0
  );

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [id, dispatch, _id, reviewSubmited,reviewDeleted]);

  const decreseQuantity = () => {
    if (quantity > 1 && product.stock !== 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity !== product.stock && product.stock !== 0) {
      setQuantity(quantity + 1);
    }
  };

  const addtoCartHandler = () => {
    dispatch(addToCartAction(_id, id));
    toast.success("Product added successfully");
  };

  const ratingChangeHandler = (newRating) => {
    setRating(newRating);
  };
  console.log(comment);

  const reviewSubmitHandler = () => {
    onClose();
    const reviewData = {
      productId: id,
      comment: comment,
      rating: rating,
    };
    dispatch(submitReviewAction(reviewData));
    toast.success("Review Submit successfully");
  };

  if (!product) return;

  return (
    <VStack
      w={"100%"}
      justifyContent={"center"}
      gap={"2rem"}
      pb={"2rem"}
      pt={"5rem"}
    >
      <Heading>ProductDetails</Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <HStack w={"full"} justifyContent={"center"} gap={10}>
            <VStack w={"25rem"}>
              <Carousel
                // autoPlay={true}
                showArrows={false}
                infiniteLoop={true}
                showStatus={false}
              >
                {product.images &&
                  product.images.map((img) => (
                    <Image key={img._id} src={img.url} />
                  ))}
              </Carousel>
            </VStack>
            <VStack alignItems={"flex-start"} gap={4}>
              <Text>{product.name}</Text>
              <Text>{`₹ ${product.price}`}</Text>
              <HStack>
                <ReactStars
                  value={product.ratings}
                  size={24}
                  color2={"#ffd700"}
                  half={true}
                  edit={false}
                />
                <Text>{`Reviews ${product.numOfReviews}`}</Text>
              </HStack>
              <HStack>
                <Button onClick={decreseQuantity}>-</Button>
                <FormControl>
                  <Input type="number" value={quantity} w={"4rem"} readOnly />
                </FormControl>
                <Button onClick={increaseQuantity}>+</Button>
              </HStack>
              <HStack>
                <Button
                  px={3}
                  color={"white"}
                  bgImage={
                    "linear-gradient(to right, #d9afd9 0%, #97d9e1 100%)"
                  }
                  _hover={{ opacity: 0.8 }}
                >
                  BUY NOW
                </Button>
                {Carts.length > 0 && Carts.some((cart) => cart._id === id) ? (
                  <Link to={"/carts"}>
                    <Button
                      bgImage={
                        "linear-gradient(to right, #d9afd9 0%, #97d9e1 100%)"
                      }
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
                    bgImage={
                      "linear-gradient(to right, #d9afd9 0%, #97d9e1 100%)"
                    }
                    px={3}
                    color={"white"}
                    _hover={{ opacity: 0.8 }}
                    onClick={addtoCartHandler}
                  >
                    Add to Cart
                  </Button>
                )}
              </HStack>
              <HStack>
                <Text fontWeight={"bold"}>Status : </Text>
                <Text color={product.stock > 0 ? "green" : "red"}>
                  {product.stock > 0 ? "IN Stock" : "Out Stock"}
                </Text>
              </HStack>

              <Text fontSize={"1.5rem"} fontWeight={"bold"}>
                Description :
              </Text>
              <Text>{product.description}</Text>

              <Stack w={"full"}>
                <Popover
                  isOpen={isOpen}
                  initialFocusRef={firstFieldRef}
                  onOpen={onOpen}
                  onClose={onClose}
                  placement="right"
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                    <Button
                      css={{
                        "&:hover": {
                          transform: "scale(1.2)",
                          transition: "0.5s ease-in",
                        },
                      }}
                    >
                      Submit Review
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <FormControl pt={5}>
                        <FormLabel>Comment</FormLabel>
                        <Textarea
                          placeholder="Write Comment"
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                        />
                        <VStack pt={3} alignItems={"flex-start"}>
                          <Text>Give Rating</Text>
                          <ReactStars
                            value={rating}
                            size={24}
                            color2={"#ffd700"}
                            half={true}
                            edit={true}
                            onChange={ratingChangeHandler}
                          />
                        </VStack>
                        <HStack w={"full"} justifyContent={"center"} pt={5}>
                          <Button onClick={reviewSubmitHandler}>Submit</Button>
                        </HStack>
                      </FormControl>
                    </FocusLock>
                  </PopoverContent>
                </Popover>
              </Stack>
            </VStack>
          </HStack>
          <VStack w={"full"}>
            <Heading
              borderBottom={"4px"}
              borderColor={"blue.400"}
              borderRadius={"1px"}
            >
              Reviews
            </Heading>
            {product.reviews[0] ? (
              product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} productId={id} />
              ))
            ) : (
              <Text>No Review </Text>
            )}
          </VStack>
        </>
      )}
    </VStack>
  );
};

export default CardDetail;
