import {
  Button,
  HStack,
  Spinner,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../Actions/OrderAction";
import { NavLink } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);
  console.log(orders);

  useEffect(() => {
    if(orders.length === 0){
      dispatch(getAllOrders());
    }
  }, [dispatch]);
  return (
    <Stack w={"full"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <TableContainer w={"full"} pt={"5rem"}>
          <Table variant="simple">
            <TableCaption> All Orders </TableCaption>
            <Thead>
              <Tr>
                <Th>Order Id</Th>
                <Th>Status</Th>
                <Th isNumeric>Item Quantity</Th>
                <Th isNumeric>Amount</Th>
                <Th>Controls</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{order.orderStatus}</Td>
                  <Td isNumeric>{order.orderItems.length}</Td>
                  <Td isNumeric>{order.totalPrice}</Td>
                  <Td>
                    <HStack gap={5}>
                      <NavLink>
                        <AiFillEdit fontSize={"1.5rem"} />
                      </NavLink>
                      <Button variant={"unstyled"} _hover={{ color: "red" }}>
                        <AiFillDelete fontSize={"1.5rem"} />
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default Orders;
