import { Box, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { InputPassword, InputText } from "../components/Input";

const SignUp = () => {
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserPassword(value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserEmail(value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserPhone(value);
  };

  const handleRegister = () => {
    axios
      .post("https://klender.xyz/users", {
        name: userName,
        password: userPassword,
        email: userEmail,
        phone: userPhone,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <Box
        width='100%'
        height='100vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDir="column"
        >
          <Text>Sign In</Text>
        <Box w='450px' p="50px" bgColor="white" boxShadow="md">
          <Stack spacing={3}>
            <InputText
              label='Name'
              type='text'
              placeholder='Enter Name'
              onChange={handleName}
            />
            <InputPassword
              label='Password'
              placeholder='Enter Password'
              onChange={handlePassword}
            />
            <InputText
              label='Email'
              type='email'
              placeholder='Enter Email'
              onChange={handleEmail}
            />
            <InputText
              label='Phone'
              type='text'
              placeholder='Enter Phone'
              onChange={handlePhone}
            />
          </Stack>
          <button onClick={handleRegister}>Create User</button>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
