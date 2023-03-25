import { Box, Heading, HStack, Image, VStack } from "@chakra-ui/react";
import React, { useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/social-media.jpg";
import img2 from "../../assets/web-design.jpg";
import img3 from "../../assets/web-development.jpg";
import img4 from "../../assets/ecommerce.jpg";
import Card from "../card/Card";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from "../../Actions/ProductAction";

const Home = () => {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch])

  if(!products) return;
  
  return (
    <VStack w={"100%"} gap={5} bgImage={'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)'} >
      <Box w={"full"} mt={'4rem'}>
        <Carousel
          // autoPlay={true}
          showArrows={true}
          infiniteLoop={true}
          showStatus={false}
        >
          <Image src={img2} borderRadius={"1xl"} height={'38rem'} objectFit={'cover'}/>
          <Image src={img1} borderRadius={"1xl"} height={'38rem'} objectFit={'cover'}/>
          <Image src={img3} borderRadius={"1xl"} height={'38rem'} objectFit={'cover'}/>
          <Image src={img4} borderRadius={"1xl"} height={'38rem'} objectFit={'cover'}/>
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
      <HStack gap={5} w={"85%"} wrap={"wrap"}>
        {
          products.map((product,index) => (
            <Card
              key={product._id}
              id={product._id}
              title={product.name}
              price={product.price}
              img={products[index].images[0].url}
            />
          ))
        }
      </HStack>

      <Heading
        w={"full"}
        bgImage={
          "linear-gradient(to left, #3ab5b0 0%, #3d99be 31%, #56317a 100%)"
        }
        textAlign={"center"}
        p={5}
      >
        Phones
      </Heading>
      <HStack gap={5} w={"85%"} overflow={"auto"}>
        <Card />
        <Card />
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
      <HStack gap={5} w={"85%"} overflow={"auto"}>
        <Card />
        <Card />
        
      </HStack>

      <Heading
        w={"full"}
        bgImage={
          "linear-gradient(to left, #3ab5b0 0%, #3d99be 31%, #56317a 100%)"
        }
        textAlign={"center"}
        p={5}
      >
        Accessories
      </Heading>
      <HStack gap={5} w={"85%"} overflow={"auto"}>
        <Card />
        <Card />
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
      <HStack gap={5} w={"85%"} overflow={"auto"}>
        <Card />
        <Card />
      </HStack>
    </VStack>
  );
};

export default Home;
