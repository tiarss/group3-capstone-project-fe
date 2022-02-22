import {
  AddIcon,
  ExternalLinkIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../helper/UserContext";

export const Header = () => {
  const { userData, setUserData } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetUser()
  },[]);

  console.log(userData)
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
          id: data.id
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
      bgColor='teal.600'
      alignItems='center'>
      <Flex gap='10px'>
        <Text display='flex' alignItems='center'>
          Logo
        </Text>
        <Button
          color='teal.50'
          bgColor='teal.600'
          _hover={{ bgColor: "#31979566" }}
          _focus={{ border: "none" }}
          _active={{ bgColor: "teal.500" }}>
          About
        </Button>
        <Button
          color='teal.50'
          bgColor='teal.600'
          _hover={{ bgColor: "#31979566" }}
          _focus={{ border: "none" }}
          _active={{ bgColor: "teal.500" }}>
          Contact
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
