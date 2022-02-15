import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, IconButton, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom"
import axios from "axios";
import React, { useState } from "react";
// import { InputText } from "../components/Input";

const SignIn = () => {
  const [userLogin, setUserLogin] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [show, setShow] = React.useState(false);
  
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserPassword(value)
  };
  const handlePhoneEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserLogin(value)
  };
  const handleClick = () => setShow(!show);

  const isLoginError = userLogin === '';
  const isPasswordError = userPassword === '';

  const handleSignIn = () =>{
    axios.post('https://klender.xyz/login',{
      input: userLogin,
      password: userPassword
    }).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err.response)
    })
  }

  return (
      <Container maxW='container.md' marginTop='10' centerContent>
        <Box width='100%' padding={5} border='1px' borderColor='gray.200' borderRadius='lg'>
            {/* <InputText
              label='Email/Phone'
              type='text'
              placeholder='Enter Name'
              onChange={handlePhoneEmail}
            /> */}
            <FormControl isInvalid={isLoginError}>
                <FormLabel htmlFor='email/phone' pt='5'>Email/Telepon</FormLabel>
                <Input
                    id='email/phone'
                    type='text'
                    placeholder='Enter your Email!'
                    value={userLogin}
                    onChange={handlePhoneEmail}
                />
                {!isLoginError ? (
                    <FormHelperText mb='5'>
                    Enter your registered email or phone number!
                    </FormHelperText>
                ) : (
                    <FormErrorMessage mb='5'>Email or phone number is required.</FormErrorMessage>
                )}
            </FormControl>
            {/* <InputText
              label='Password'
              type='password'
              placeholder='Enter Name'
              onChange={handlePassword}
            />
            <button onClick={handleSignIn}>Login</button> */}
            <FormControl isInvalid={isPasswordError}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        id='password'
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        onChange={handlePassword}
                    />
                    <InputRightElement width='4.5rem'>
                        <IconButton size='sm' aria-label='Show password' onClick={handleClick} variant='ghost' icon={show ? <ViewOffIcon /> : <ViewIcon/>} />
                    </InputRightElement>
                </InputGroup>
                {!isPasswordError ? (
                    <FormHelperText pb='5'>
                    Enter your password!
                    </FormHelperText>
                    ) : (
                        <FormErrorMessage pb='5'>Password is required.</FormErrorMessage>
                    )}
            </FormControl>
            <Button colorScheme='blue' mb={5} width='100%' onClick={handleSignIn}>Sign In</Button>
            <Text fontSize='sm' align='center'>Don't have an account? <Link color='teal.500' as={ReactRouterLink} to='/sign-up'>Sign Up</Link></Text>
        </Box>
      </Container>
  );
};

export default SignIn;
