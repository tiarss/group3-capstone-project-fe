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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../helper/UserContext";
import logoWhite from "../../assets/Logo-sirclo-white.png";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const toast = useToast()
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userContext);
  const [role, setRole] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    roleCondition();
    handleGetUser();
  }, []);

  const logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    localStorage.setItem("id", "");
    localStorage.setItem("isAuth", JSON.stringify(false));
  };

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
      .get(`/users/${id}`, {
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
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "unauthorized"){
          logOut();
          toast({
            title: `Unauthorized`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
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
          {role === 2 ? "Pengguna Aset" : "Permintaan Permohonan"}
        </Button>
        <Button
          display={role === 2  || role === 3 ? "block" : "none"}
          fontWeight='medium'
          color='white'
          bgColor='#2296CB'
          onClick={() => navigate("/pengadaan-aset")}
          _hover={{ bgColor: "#3CA9DB" }}
          _focus={{ border: "none" }}
          _active={{ bgColor: "#1788BB" }}>
          Pengadaan Aset
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
