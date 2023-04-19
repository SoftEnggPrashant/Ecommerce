import { HamburgerIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Image,
  VStack,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartCheckFill } from "react-icons/bs";
import { getCarts } from "../../Actions/CartAction";

const Header = (props) => {
  const { isAuthenticate, user } = useSelector((state) => state.user);
  const { Carts,isAddCart,isRemovedCart } = useSelector((state) => state.Cart)

  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    if(user._id){
      dispatch(getCarts(user._id));
    }
  }, [isAuthenticate,isAddCart,user._id,dispatch,isRemovedCart]);

  return (
    <HStack
      bgImage={"linear-gradient(to left, #2b5876 50%, #4e4376 70%);"}
      py={1}
      justifyContent={"space-between"}
      position={"fixed"}
      w={"100%"}
      zIndex={1}
    >
      <HStack gap={5}>
        <Link to={"/"}>
          <Image src={logo} w={"8rem"} />
        </Link>
        <NavLink to={"/"}>
          <Button
            variant={"unstyled"}
            color={"white"}
            _active={{ color: "blue.300" }}
          >
            Home
          </Button>
        </NavLink>

        <NavLink to={"/products"}>
          <Button
            variant={"unstyled"}
            color={"white"}
            _active={{ color: "blue.300" }}
          >
            Products
          </Button>
        </NavLink>

        <NavLink to={"/contact"}>
          <Button
            variant={"unstyled"}
            color={"white"}
            _active={{ color: "blue.300" }}
          >
            Contact
          </Button>
        </NavLink>
        <NavLink to={"/about"}>
          <Button
            variant={"unstyled"}
            color={"white"}
            _active={{ color: "blue.300" }}
          >
            About
          </Button>
        </NavLink>
      </HStack>

      <HStack gap={10} pr={"5rem"}>
        <NavLink to={"/searchproduct"}>
          <IconButton
            aria-label="Search database"
            variant={"unstyled"}
            size={"lg"}
            color={"white"}
            _active={{ color: "blue.300" }}
            icon={<Search2Icon />}
          />
        </NavLink>
        {
          <Stack position={"relative"}>
            <NavLink to={'/carts'} >
              <BsFillCartCheckFill fontSize={"2rem"} color={"white"} />
              <Badge
                bgColor={"green"}
                color={"white"}
                position={"absolute"}
                top={-2}
                right={0}
                borderRadius={"full"}
              >
                { isAuthenticate &&  Carts.length}
              </Badge>
            </NavLink>
          </Stack>
        }

        {!isAuthenticate && (
          <Button
            variant={"unstyled"}
            color={"white"}
            _active={{ color: "blue.300" }}
          >
            <NavLink to="/login">LOGIN</NavLink>
          </Button>
        )}

        {!isAuthenticate && (
          <Button
            variant={"unstyled"}
            color={"white"}
            _active={{ color: "blue.300" }}
          >
            <NavLink to="/signup">SIGNUP</NavLink>
          </Button>
        )}

        {isAuthenticate && (
          <NavLink to="/profile">
            <Avatar size={"sm"} />
          </NavLink>
        )}

        {isAuthenticate && (
          <>
            {user.role === "admin" && (
              <IconButton
                icon={<HamburgerIcon fontSize={"2xl"} />}
                ref={btnRef}
                colorScheme="teal"
                onClick={onOpen}
              ></IconButton>
            )}
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Controls</DrawerHeader>
                <DrawerBody>
                  <VStack alignItems={"flex-start"}>
                    <Link to={"/admin/dashboard"}>
                      <Button onClick={onClose} variant={"unstyled"}>
                        Dashboard
                      </Button>
                    </Link>
                    <Link to={"/admin/newProduct"}>
                      <Button onClick={onClose} variant={"unstyled"}>
                        Create Product
                      </Button>
                    </Link>
                    <Link to={"/admin/Orders"}>
                      <Button onClick={onClose} variant={"unstyled"}>
                        Order
                      </Button>
                    </Link>
                    <Link to={"/admin/products"}>
                      <Button onClick={onClose} variant={"unstyled"}>
                        Prodcuts
                      </Button>
                    </Link>
                    <Link to={"/admin/users"}>
                      <Button variant="unstyled" onClick={onClose}>
                        Users
                      </Button>
                    </Link>
                  </VStack>
                </DrawerBody>

                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default Header;
