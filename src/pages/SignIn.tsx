import axios from "axios";
import React, { useState } from "react";
import { InputText } from "../components/Input";

const SignIn = () => {
  const [userLogin, setUserLogin] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserPassword(value)
  };
  const handlePhoneEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserLogin(value)
  };

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
      <InputText
        label='Email/Phone'
        type='text'
        placeholder='Enter Name'
        onChange={handlePhoneEmail}
      />
      <InputText
        label='Password'
        type='password'
        placeholder='Enter Name'
        onChange={handlePassword}
      />
      <button onClick={handleSignIn}>Login</button>
    </>
  );
};

export default SignIn;
