import {
  AddIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  Text,
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
import "@fontsource/open-sans";

export const Header = () => {
  const toast = useToast();
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
        console.log(data);
        setUserData({
          name: data.name,
          avatar: data.avatar,
          id: data.id,
          role: data.role,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        const { data } = err.response;
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
        if (data.message === "missing or malformed jwt") {
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
        if (data.message === "unauthorized") {
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
        <Box display={{ base: "block", lg: "none" }}>
          <Menu>
            <MenuButton
              as={Button}
              bgColor='#2296CB'
              padding='10px 15px'
              letterSpacing='1px'
              fontSize='15px'
              fontWeight='medium'
              color='white'
              fontFamily='open sans'
              transition='all 0.5s ease'
              _hover={{
                bgColor: "#3CA9DB",
              }}
              _focus={{
                border: "none",
              }}
              _active={{
                border: "none",
                bgColor: "#1788BB",
              }}
              rightIcon={<ChevronDownIcon />}>
              MENU
            </MenuButton>
            <MenuList color='blue.500'>
              <MenuItem onClick={() => navigate("/beranda")}>Beranda</MenuItem>
              <MenuItem
                onClick={() => navigate("/direktori-aset")}
                display={role === 1 || role === 2 ? "block" : "none"}>
                Direktori Aset
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/pengguna-aset")}
                display={role === 2 ? "block" : "none"}>
                Pengguna Aset
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/permohonan")}
                display={role === 3 ? "block" : "none"}>
                Permohonan Permintaan
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/pengadaan-aset")}
                display={role === 2 || role === 3 ? "block" : "none"}>
                Pengadaan Aset
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Flex display={{ base: "none", lg: "flex" }}>
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
            display={role === 2 ? "block" : "none"}
            fontWeight='medium'
            color='white'
            bgColor='#2296CB'
            onClick={() => navigate("/pengguna-aset")}
            _hover={{ bgColor: "#3CA9DB" }}
            _focus={{ border: "none" }}
            _active={{ bgColor: "#1788BB" }}>
            {"Pengguna Aset"}
          </Button>
          <Button
            display={role === 3 ? "block" : "none"}
            fontWeight='medium'
            color='white'
            bgColor='#2296CB'
            onClick={() => navigate("/permohonan")}
            _hover={{ bgColor: "#3CA9DB" }}
            _focus={{ border: "none" }}
            _active={{ bgColor: "#1788BB" }}>
            {"Permintaan Permohonan"}
          </Button>
          <Button
            display={role === 2 || role === 3 ? "block" : "none"}
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
      </Flex>
      <Box display='flex' alignItems='center'>
        <Text mr='10px' color='white'>
          Hi! ,
          {userData !== undefined
            ? userData.name === ""
              ? "Guest"
              : userData.name.split(" ").pop()?.toString()
            : "Guess"}{" "}
        </Text>
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
            variant='outline'></MenuButton>
          <MenuList>
            <MenuItem icon={<ExternalLinkIcon />} onClick={handleLogOut}>
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};
