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
import {
  deleteProductAdmin,
  fetchProductAdmin,
} from "../../Actions/adminProductActions";
import { toast } from "react-hot-toast";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.adminProduct);
  const { message} = useSelector((state) => state.deleteProduct);

  useEffect(() => {
    dispatch(fetchProductAdmin());
  }, [dispatch]);

  const deleteHandler = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to Delete It.",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteProductAdmin(id)),
        },
        {
          label: "No",
          onClick: () => null,
        },
      ],
    });
  };

  return (
    <Stack w={"full"} flexDirection={"row"} justifyContent={"center"}>
      {message ? toast.success(message) : <></>}
      {error ? (
        toast.error(error)
      ) : !products ? (
        <Spinner />
      ) : (
        <TableContainer w={"full"} pt={"5rem"}>
          <Table variant="simple">
            <TableCaption> All Products </TableCaption>
            <Thead>
              <Tr>
                <Th>Product Id</Th>
                <Th>Name</Th>
                <Th isNumeric>Stock</Th>
                <Th isNumeric>Price</Th>
                <Th>Controls</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product._id}>
                  <Td>{product._id}</Td>
                  <Td>{product.name}</Td>
                  <Td isNumeric>{product.stock}</Td>
                  <Td isNumeric>{product.price}</Td>
                  <Td>
                    <HStack gap={5}>
                      <NavLink to={`/admin/updateProduct/${product._id}`}>
                        <AiFillEdit fontSize={"1.5rem"} />
                      </NavLink>
                      <Button
                        variant={"unstyled"}
                        _hover={{ color: "red" }}
                        onClick={() => deleteHandler(product._id)}
                      >
                        <AiFillDelete fontSize={"1.5rem"} />
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default AdminProducts;
