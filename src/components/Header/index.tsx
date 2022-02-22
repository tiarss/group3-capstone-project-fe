import { AddIcon, ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../helper/UserContext";
import logoWhite from "../../assets/Logo-sirclo-white.png";

export const Header = () => {
  const { userData, setUserData } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetUser();
  }, []);

  console.log(userData);
  const handleGetUser = () => {
    axios
      .get("https://klender.xyz/users/2", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setUserData({
          name: data.name,
          avatar: data.avatar,
          id: data.id,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box
      display='flex'
      width='100%'
      height='70px'
      padding='16px 32px'
      boxSizing='border-box'
      justifyContent='space-between'
      bgColor='#2296CB'
      alignItems='center'>
      <Flex gap='5px'>
        <Image src={logoWhite} w='100px' mr='20px' />
        <Button
          color='white'
          fontWeight='normal'
          bgColor='#2296CB'
          _hover={{ bgColor: "#3CA9DB" }}
          _focus={{ border: "none" }}
          _active={{ bgColor: "#1788BB" }}>
          Beranda
        </Button>
        <Button
          fontWeight='medium'
          color='white'
          bgColor='#2296CB'
          _hover={{ bgColor: "#3CA9DB" }}
          _focus={{ border: "none" }}
          _active={{ bgColor: "#1788BB" }}>
          Direktori Aset
        </Button>
        <Button
          display='none'
          color='teal.50'
          bgColor='#2296CB'
          _hover={{ bgColor: "#3CA9DB" }}
          _focus={{ border: "none" }}
          _active={{ bgColor: "#1788BB" }}>
          Pengguna Aset
        </Button>
      </Flex>
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            bgColor='none'
            border='none'
            _hover={{ bgColor: "none" }}
            _active={{ border: "none", bgColor: "none" }}
            _focus={{ border: "none" }}
            icon={
              <Avatar
                name={userData.name === "" ? "Guest" : userData.name}
                width='40px'
                height='40px'
                src={userData.avatar}
              />
            }
            variant='outline'
          />
          <MenuList>
            <MenuItem icon={<AddIcon />}>Sign In</MenuItem>
            <MenuItem icon={<ExternalLinkIcon />}>Sign Up</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};
