import { Box, Heading, HStack, Image, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/social-media.jpg";
import img2 from "../../assets/web-design.jpg";
import img3 from "../../assets/web-development.jpg";
import img4 from "../../assets/ecommerce.jpg";
import Card from "../card/Card";
import axios from 'axios';

const Home = () => {

  const[products,setData] = useState([]);

  useEffect(() => {
    const getData = async() =>{
      try {
        const {data} = await axios.get('http://localhost:4000/api/v1/products');
        console.log(data);
        setData(data.products);
      }
      catch(error){
        console.log(error);
      }    
    }
    getData();

  }, [])
  
  return (
    <VStack w={"100%"} gap={5} bgImage={'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)'} >
      <Box w={"full"} mt={3}>
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
              id={product.id}
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
