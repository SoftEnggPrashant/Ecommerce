import React from "react";
import { Avatar, Button, HStack, IconButton, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import logo from "../../assets/logo.png";

const Header = (props) => {
  const { isAuthenticated } = props;

  return (
    <HStack
      bgImage={"linear-gradient(to left, #2b5876 50%, #4e4376 70%);"}
      py={1.5}
      justifyContent={'space-between'}
      position={'fixed'}
      w={'100vw'}
      zIndex={1}
    >
      <HStack gap={5}>

        <Link to={'/'}>
        <Image src={logo} w={'8rem'}/>
        </Link>
        <Button
          variant={"unstyled"}
          color={"white"}
          _active={{ color: "blue.300" }}
        >
          <Link to={"/"}>Home</Link>
        </Button>

        <Button
          variant={"unstyled"}
          color={"white"}
          _active={{ color: "blue.300" }}
        >
          <Link to={"/products"}>Products</Link>
        </Button>

        <Button
          variant={"unstyled"}
          color={"white"}
          _active={{ color: "blue.300" }}
        >
          <Link to={"/contact"}>Contact</Link>
        </Button>

        <Button
          variant={"unstyled"}
          color={"white"}
          _active={{ color: "blue.300" }}
        >
          <Link to={"/about"}>About</Link>
        </Button>
      </HStack>

      <HStack gap={5} pr={'5rem'}>
        <Link to={"/searchproduct"}>
          <IconButton
            aria-label="Search database"
            variant={"unstyled"}
            size={"lg"}
            color={"white"}
            _active={{ color: "blue.300" }}
            icon={<Search2Icon />}
          />
        </Link>

        {!isAuthenticated && (
          <Button
            variant={"unstyled"}
            color={"white"}
            _active={{ color: "blue.300" }}
          >
            <Link to="/login">LOGIN</Link>
          </Button>
        )}

        {!isAuthenticated && (
          <Button
            variant={"unstyled"}
            color={"white"}
            _active={{ color: "blue.300" }}
          >
            <Link to="/signup">SIGNUP</Link>
          </Button>
        )}

        {isAuthenticated && (
          <Link to="/profile">
            <Avatar size={"sm"} />
          </Link>
        )}
      </HStack>
    </HStack>
  );
};

export default Header;
