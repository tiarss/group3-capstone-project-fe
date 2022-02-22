import { Box, Button, Flex, Stack, Text, useBoolean } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { InputPassword, InputText } from "../components/Input";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CloseButton } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { FiCheck, FiX } from "react-icons/fi";

const SignUp = () => {
  const [isEditing, setIsEditing] = useBoolean();
  const toast = useToast();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [isUppercase, setIsUppercase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.match(/[A-Z]+/g)) {
      setIsUppercase(true);
    } else {
      setIsUppercase(false);
    }

    if (value.match(/[\d]+/g)) {
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }

    if (value.match(/[\W]+/g)) {
      setIsSymbol(true);
    } else {
      setIsSymbol(false);
    }

    if (isUppercase && isSymbol && isNumber) {
      setUserPassword(value);
    }
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
        const { data } = res;
        // console.log(res);
        if (data.code === 200) {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        const { data } = err.response;
        // console.log(err.response);
        const message = data.message
          .toLowerCase()
          .replace(/(^\w{1})|(\s{1}\w{1})/g, (m: string) => m.toUpperCase());
        if (data.message.includes("password")) {
          const passMessage = message.replace(/[^:]+../, " ");
          toast({
            title: `${passMessage}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: `${message}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
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
        flexDir='column'
        bgColor='blue.700'>
        <Box
          w='450px'
          p='30px 40px'
          bgColor='white'
          boxShadow='md'
          borderRadius='20px'>
          <Text mb='20px' fontSize='2xl' fontWeight='bold'>
            Sign Up
          </Text>
          <Stack spacing={3}>
            <InputText
              title='Name'
              type='text'
              placeholder='Enter Name'
              onChange={handleName}
            />
            <Box w='100%' position='relative'>
              <InputPassword
                onClick={setIsEditing.on}
                label='Password'
                placeholder='Enter Password'
                onChange={handlePassword}
              />
              <Popover
                placement='bottom'
                isOpen={isEditing}
                onOpen={setIsEditing.on}>
                <PopoverTrigger>
                  <Box position='absolute' right='0px'></Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    position='relative'>
                    Confirmation!{" "}
                    <CloseButton
                      onClick={setIsEditing.off}
                      position='absolute'
                      right='10px'
                    />
                  </PopoverHeader>
                  <PopoverBody minW='500px'>
                    <Box textAlign='left' p='10px'>
                      <Flex alignItems='center'>
                        {isUppercase ? (
                          <FiCheck color='green' />
                        ) : (
                          <FiX color='red' />
                        )}
                        <Text ml='5px'>
                          Password {isUppercase ? "contained" : "not contained"}{" "}
                          UPPERCASE{" "}
                        </Text>
                      </Flex>
                      <Flex alignItems='center'>
                        {isNumber ? (
                          <FiCheck color='green' />
                        ) : (
                          <FiX color='red' />
                        )}
                        <Text ml='5px'>
                          Password {isNumber ? "contained" : "not contained"}{" "}
                          NUMBER
                        </Text>
                      </Flex>
                      <Flex alignItems='center'>
                        {isSymbol ? (
                          <FiCheck color='green' />
                        ) : (
                          <FiX color='red' />
                        )}
                        <Text ml='5px'>
                          Password {isSymbol ? "contained" : "not contained"}{" "}
                          SYMBOL
                        </Text>
                      </Flex>
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <InputText
              title='Email'
              type='email'
              placeholder='Enter Email'
              onChange={handleEmail}
            />
            <InputText
              title='Phone'
              type='text'
              placeholder='Enter Phone'
              onChange={handlePhone}
            />
            <Button onClick={handleRegister} colorScheme='blue'>
              Create Account
            </Button>
          </Stack>
          {/* <button onClick={handleRegister}>Create User</button> */}
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
