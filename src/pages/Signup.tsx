import React, { useState } from "react";
import { InputText } from "../components/Input";

const SignUp = () => {
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
  };

  return (
    <>
      <InputText
        label='name'
        type='text'
        placeholder='Enter Name'
        onChange={handleName}
      />
      <InputText
        label='Password'
        type='password'
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
    </>
  );
};

export default SignUp;
