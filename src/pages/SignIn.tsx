import { Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { ButtonPrimary } from "../components/Button";
import { InputPassword, InputText } from "../components/Input";
import bgLogin from "../assets/login.png";
import logoBlue from "../assets/Logo-sirclo.png";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [userLogin, setUserLogin] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserPassword(value);
  };
  const handlePhoneEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserLogin(value);
  };

  const handleSignIn = () => {
    axios
      .post("/login", {
        input: userLogin,
        password: userPassword,
      })
      .then((res) => {
        const code = res.data.code
        const { data } = res.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("expired", data.expire);
        localStorage.setItem('role', JSON.stringify(data.role))
        localStorage.setItem('id', data.id)
        localStorage.setItem("isAuth", JSON.stringify(true));
        console.log(data)
        if (code === 200) {
          toast({
            title: "Sign In Success.",
            description: "You are succest to Sign In",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/beranda");
        }
        //localStorage.setItem("role", JSON.stringify(data.role));
        //console.log(res);
      })
      .catch((err) => {
        const { data } = err.response;
        const message = data.message
          .toLowerCase()
          .replace(/(^\w{1})|(\s{1}\w{1})/g, (m: string) => m.toUpperCase());
        console.log(err.response);
        toast({
          title: `${message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex width='100%' h='100vh'>
      <Box
        bgColor='#EFEFEF'
        transition="all 0.5s ease"
        w={{ base: "100%", lg: "50%" }}
        padding={{ base: "50px", md: "50px 125px" }}
        display='flex'
        alignItems='center'
        justifyContent='center'
        position='relative'>
        <Box
          w='100%'
          display='flex'
          flexDirection='column'
          gap='20px'
          transition="all 0.5s ease"
          padding={{base: "30px", md: "0px"}}
          borderRadius={{base: "10px", md: "0px"}}
          bgColor={{ base: "white", md: "#EFEFEF" }}>
          <Box position='absolute' top='50px'>
            <Image w='120px' src={logoBlue} />
            <Text textAlign='left' fontWeight='600' fontSize='12px'>
              Employee Management Assets
            </Text>
          </Box>
          <Text textAlign='left' fontWeight='700' fontSize='24px'>
            Sign In
          </Text>
          <InputText
            title='Email/Phone'
            type='text'
            placeholder='Enter Name/Phone'
            onChange={handlePhoneEmail}
          />
          <InputPassword
            label='Password'
            placeholder='Enter Password'
            onChange={handlePassword}
          />
          <Box display='flex' w='100%' justifyContent='end'>
            <ButtonPrimary title='Sign In' onclick={handleSignIn} />
          </Box>
        </Box>
      </Box>
      <Box w='50%' overflow='hidden' display={{ base: "none", lg: "block" }} transition="all 0.5s ease">
        <Image w='100%' h='fit-content' src={bgLogin} />
      </Box>
    </Flex>
  );
};

export default SignIn;
