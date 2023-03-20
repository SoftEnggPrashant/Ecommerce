import React from "react";
import { Avatar, Button, HStack, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";

const Header = () => {
  return (
    <HStack bgImage={'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);'} py={1.5} justifyContent={"space-between"}>
      <HStack gap={5}>
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

      <HStack gap={5} pr={5}>
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

        <Button
          variant={"unstyled"}
          color={"white"}
          _active={{ color: "blue.300" }}
        >
          <Link to="/login">LOGIN</Link>
        </Button>

        <Button
          variant={"unstyled"}
          color={"white"}
          _active={{ color: "blue.300" }}
        >
          <Link to="/register">REGISTER</Link>
        </Button>

        <Link to="/profile">
          <Avatar size={"sm"} />
        </Link>
      </HStack>
    </HStack>
  );
};

export default Header;
