import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, IconButton, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom"
import axios from "axios";
import React, { useState } from "react";
import { InputPassword, InputText } from "../components/Input";
// import { InputText } from "../components/Input";

const SignIn = () => {
  const [userLogin, setUserLogin] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userIsLoginError, setIsUserLoginError] = useState<boolean>(false);
  const [userIsPasswordError, setIsUserPasswordError] = useState<boolean>(false);
  const [show, setShow] = React.useState(false);
  
  const handlePhoneEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value===""){
      setIsUserLoginError(true);
    } else {
      setIsUserLoginError(false);
    }
    setUserLogin(value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(value === ""){
      setIsUserPasswordError(true);
    } else {
      setIsUserPasswordError(false);
    }
    setUserPassword(value);
  };
  
  const handleClick = () => setShow(!show);

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
    <>
      {/* <Container maxW='container.md' marginTop='10' centerContent> */}
        <Box
        width='100%'
        height='100vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDir="column">
        <Box width='75%' padding={5} border='1px' borderColor='gray.200' borderRadius='lg'>
            <FormControl isInvalid={userIsLoginError}>
                <InputText
                    label='Email/Phone Number'
                    type='text'
                    placeholder='Enter your email or phone number!'
                    onChange={handlePhoneEmail}
                />
                {!userIsLoginError ? (
                    <FormHelperText mb='5'>
                    Enter your registered email or phone number!
                    </FormHelperText>
                ) : (
                    <FormErrorMessage mb='5'>Email or phone number is required.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={userIsPasswordError}>
                    <InputPassword
                        label='Password'
                        placeholder='Enter password'
                        onChange={handlePassword}
                    />
                {!userIsPasswordError ? (
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
        </Box>
      {/* </Container> */}
    </>
  );
};

export default SignIn;
