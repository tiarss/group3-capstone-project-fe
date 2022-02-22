import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { ButtonPrimary } from "../components/Button";
import { InputPassword, InputText } from "../components/Input";
import bgLogin from "../assets/login.png"

const SignIn = () => {
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
      .post("https://klender.xyz/login", {
        input: userLogin,
        password: userPassword,
      })
      .then((res) => {
        const { data } = res.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("expired", data.expire);
        localStorage.setItem("isAuth", JSON.stringify(false));
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Flex width='100%' h='100vh'>
      <Box
        bgColor="#EFEFEF"
        w='50%'
        padding='100px'
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <Box w='100%' display="flex" flexDirection="column" gap="20px">
          <Text>Sign In</Text>
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
          <Box display="flex" w="100%" justifyContent='end'>
            <ButtonPrimary title='Sign In' onclick={handleSignIn} />
          </Box>
        </Box>
      </Box>
      <Box w='50%' overflow="hidden">
        <Image w="100%" src={bgLogin} />
      </Box>
    </Flex>
  );
};

export default SignIn;
