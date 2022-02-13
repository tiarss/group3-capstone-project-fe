import React, { useState } from "react";
import { InputText } from "../components/Input";

const SignIn = () => {
  const [userLogin, setUserLogin] = useState();
  const [userPassword, setUserPassword] = useState();
  
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
  };
  const handlePhoneEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
  };

  return (
    <>
      <InputText
        label='name'
        type='text'
        placeholder='Enter Name'
        onChange={handlePhoneEmail}
      />
      <InputText
        label='name'
        type='text'
        placeholder='Enter Name'
        onChange={handlePassword}
      />
    </>
  );
};

export default SignIn;
