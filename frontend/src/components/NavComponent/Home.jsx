import { Box, Heading, HStack, Image, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/social-media.jpg";
import img2 from "../../assets/web-design.jpg";
import img3 from "../../assets/web-development.jpg";
import img4 from "../../assets/ecommerce.jpg";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../Actions/ProductAction";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (error) return;

  return (
    <VStack
      w={"100%"}
      gap={5}
      bgImage={"linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)"}
    >
      <Box w={"full"} mt={"4rem"}>
        <Carousel
          // autoPlay={true}
          showArrows={true}
          infiniteLoop={true}
          showStatus={false}
        >
          <Image
            src={img2}
            borderRadius={"1xl"}
            height={"38rem"}
            objectFit={"cover"}
          />
          <Image
            src={img1}
            borderRadius={"1xl"}
            height={"38rem"}
            objectFit={"cover"}
          />
          <Image
            src={img3}
            borderRadius={"1xl"}
            height={"38rem"}
            objectFit={"cover"}
          />
          <Image
            src={img4}
            borderRadius={"1xl"}
            height={"38rem"}
            objectFit={"cover"}
          />
        </Carousel>
      </Box>
      <Heading
        w={"full"}
        bgImage={
          "linear-gradient(to left, #3ab5b0 0%, #3d99be 31%, #56317a 100%)"
        }
        textAlign={"center"}
        p={5}
      >
        Products
      </Heading>
      <HStack gap={5} w={"85%"} wrap={"wrap"} justifyContent={"center"}>
        {isLoading ? (
          <Spinner size={"xl"} color={"blue"} />
        ) : (
          data
            .slice(0, 10)
            .map((product) => (
              <Card
                key={product._id}
                id={product._id}
                title={product.name}
                price={product.price}
                img={product.images[0].url}
              />
            ))
        )}
      </HStack>

      <Heading
        w={"full"}
        bgImage={
          "linear-gradient(to left, #3ab5b0 0%, #3d99be 31%, #56317a 100%)"
        }
        textAlign={"center"}
        p={5}
      >
        SmartPhones
      </Heading>
      <HStack gap={5} w={"85%"} overflow={"auto"} justifyContent={"center"}>
        {isLoading ? (
          <Spinner size={"xl"} color={"blue"} />
        ) : (
          data &&
          data
            .filter((product) => product.category === "SmartPhones")
            .map((product) => (
              <Card
                key={product._id}
                id={product._id}
                title={product.name}
                price={product.price}
                img={product.images[0].url}
              />
            ))
        )}
      </HStack>

      <Heading
        w={"full"}
        bgImage={
          "linear-gradient(to left, #3ab5b0 0%, #3d99be 31%, #56317a 100%)"
        }
        textAlign={"center"}
        p={5}
      >
        Computers
      </Heading>
      <HStack gap={5} w={"85%"} overflow={"auto"} justifyContent={"center"}>
        {isLoading ? (
          <Spinner size={"xl"} color={"blue"} />
        ) : (
          data &&
          data
            .filter((product) => product.category === "Laptop")
            .map((product) => (
              <Card
                key={product._id}
                id={product._id}
                title={product.name}
                price={product.price}
                img={product.images[0].url}
              />
            ))
        )}
      </HStack>

      <Heading
        w={"full"}
        bgImage={
          "linear-gradient(to left, #3ab5b0 0%, #3d99be 31%, #56317a 100%)"
        }
        textAlign={"center"}
        p={5}
      >
        T-Shirts
      </Heading>
      <HStack gap={5} w={"85%"} overflow={"auto"} justifyContent={"center"}>
        {isLoading ? (
          <Spinner size={"xl"} color={"blue"} />
        ) : (
          data &&
          data
            .filter(
              (product) =>
                product.category === "Tops" || product.category === "T-shirt"
            )
            .map((product) => (
              <Card
                key={product._id}
                id={product._id}
                title={product.name}
                price={product.price}
                img={product.images[0].url}
              />
            ))
        )}
      </HStack>

      <Heading
        w={"full"}
        bgImage={
          "linear-gradient(to left, #3ab5b0 0%, #3d99be 31%, #56317a 100%)"
        }
        textAlign={"center"}
        p={5}
      >
        Sports
      </Heading>
      <HStack gap={5} w={"85%"} overflow={"auto"} justifyContent={"center"}>
        {isLoading ? (
          <Spinner size={"xl"} color={"blue"} />
        ) : (
          data &&
          data
            .filter((product) => product.category === "Sports")
            .map((product) => (
              <Card
                key={product._id}
                id={product._id}
                title={product.name}
                price={product.price}
                img={product.images[0].url}
              />
            ))
        )}
      </HStack>
    </VStack>
  );
};

export default Home;
