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
import { getAllusers } from "../../Actions/AdminUsersAction";
import { NavLink } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const Users = () => {
  const dispatch = useDispatch();
  const { isLoading, users } = useSelector((state) => state.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllusers());
    }
  }, [dispatch]);
  return (
    <Stack w={"full"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <TableContainer w={"full"} pt={"5rem"}>
          <Table variant="simple">
            <TableCaption> All Users </TableCaption>
            <Thead>
              <Tr>
                <Th>User Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Controls</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
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

export default Users;
