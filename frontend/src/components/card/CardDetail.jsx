import { Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CardDetail = () => {

  const {id} = useParams();

  const [cardDetail,setCardDetails] = useState({});

  useEffect(()=>{
    const getCardDetails = async()=>{
      try{
        const {data} = await axios.get(`http://localhost:4000/api/v1/products/details/${id}`);
        console.log(data);
        setCardDetails(data);
      }catch(error){
        console.log(error);
      }
    }
    getCardDetails();
  },[id])

  return (
    <VStack w={"100%"} h={'100vh'} justifyContent={'center'}>
      <Text>CardDetail</Text>
    </VStack>
  )
}

export default CardDetail