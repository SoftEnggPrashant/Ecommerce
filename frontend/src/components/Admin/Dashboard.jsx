import { HStack, Heading, Stack, VStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { fetchProductAdmin } from "../../Actions/adminProductActions";
import { getAllOrders } from "../../Actions/OrderAction";
import { getAllusers } from "../../Actions/AdminUsersAction";
ChartJS.register(...registerables);

const Dashboard = () => {

  const dispatch = useDispatch();
  const { data } = useSelector((state)=> state.products);
  const { orders } = useSelector((state)=> state.orders);
  const { users } = useSelector((state)=> state.users);


  let outOfStock = 0;

  data && data.forEach(element => {
    if(element.Stock === 0){
      outOfStock = outOfStock + 1;
    }    
  });

  const lineState = {
    labels: ["initial amount", "total amount Earn"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["orange"],
        data: [0, 5000],
      },
    ],
  };

  const DoughnutState = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor:['#63318c','#1b0b36'],
        hoverBackgroundColor:['#622e8c','#2b143d'],
        data: [outOfStock, data.length - outOfStock],
      }
    ]
  }

  useEffect(()=>{
    dispatch(fetchProductAdmin());
    dispatch(getAllOrders());
    dispatch(getAllusers());
  },[dispatch]);


  return (
    <Stack w={"full"} justifyContent={"center"} direction={'column'} gap={10}>
      <VStack pt={"5rem"} gap={5}>
        <Heading>Dashboard</Heading>
        <HStack w={"90%"} bgColor={"blue.300"} justifyContent={"center"} p={5}>
          <Text textColor={"white"} fontSize={"2xl"}>
            Total Amount : ₹ 2000
          </Text>
        </HStack>
        <HStack py={10} gap={3}>
          <Stack
            direction={"column"}
            alignItems={"center"}
            bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
            p={"4rem"}
            borderRadius={"full"}
          >
            <Text textColor={"white"} fontSize={"2xl"} fontWeight={"bold"}>
              {data && data.length}
            </Text>
            <NavLink to={"/admin/products"}>
              <Text textColor={"white"} fontSize={"2xl"} fontWeight={"bold"}>
                Product
              </Text>
            </NavLink>
          </Stack>
          <Stack
            direction={"column"}
            alignItems={"center"}
            bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
            p={"4rem"}
            borderRadius={"full"}
          >
            <Text textColor={"white"} fontSize={"2xl"} fontWeight={"bold"}>
              {orders && orders.length}
            </Text>
            <NavLink to={"/admin/orders"}>
              <Text textColor={"white"} fontSize={"2xl"} fontWeight={"bold"}>
                Orders
              </Text>
            </NavLink>
          </Stack>
          <Stack
            direction={"column"}
            alignItems={"center"}
            bgImage={"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"}
            p={"4rem"}
            borderRadius={"full"}
          >
            <Text textColor={"white"} fontSize={"2xl"} fontWeight={"bold"}>
              {users && users.length}
            </Text>
            <NavLink to={"/admin/users"}>
              <Text textColor={"white"} fontSize={"2xl"} fontWeight={"bold"}>
                Users
              </Text>
            </NavLink>
          </Stack>
        </HStack>
      </VStack>
      <HStack w={'full'} justifyContent={'center'} gap={10} pl={2}>
        <Stack w={'90%'} pb={5}>
        <Line data={lineState} />
        </Stack>
        <Stack w={'40%'} pb={5}>
        <Doughnut data={DoughnutState} />
        </Stack>
      </HStack>
    </Stack>
  );
};

export default Dashboard;
