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
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userContext);
  const [role, setRole] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    roleCondition();
    handleGetUser();
  }, []);

  const roleCondition = () => {
    const roles = localStorage.getItem("role");
    if (roles === "Employee") {
      setRole(1);
    } else if (roles === "Administrator") {
      setRole(2);
    } else {
      setRole(3);
    }
  };

  const handleGetUser = () => {
    const id = localStorage.getItem("id");
    axios
      .get(`https://klender.xyz/users/${id}`, {
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

  const handleLogOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("expired", "");
    localStorage.setItem("role", "");
    localStorage.setItem("id", "");
    localStorage.setItem("isAuth", JSON.stringify(false));
    navigate("/sign-in");
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
          onClick={() => navigate("/beranda")}
          _hover={{ bgColor: "#3CA9DB" }}
          _focus={{ border: "none" }}
          _active={{ bgColor: "#1788BB" }}>
          Beranda
        </Button>
        <Button
          display={role === 1 || role === 2 ? "block" : "none"}
          fontWeight='medium'
          color='white'
          bgColor='#2296CB'
          onClick={() => navigate("/direktori-aset")}
          _hover={{ bgColor: "#3CA9DB" }}
          _focus={{ border: "none" }}
          _active={{ bgColor: "#1788BB" }}>
          Direktori Aset
        </Button>
        <Button
          display={role === 2 || role === 3 ? "block" : "none"}
          fontWeight='medium'
          color='white'
          bgColor='#2296CB'
          onClick={() => navigate("/pengguna-aset")}
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
                // src={userData.avatar}
              />
            }
            variant='outline'
          />
          <MenuList>
            <MenuItem icon={<ExternalLinkIcon />} onClick={handleLogOut} >Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};
