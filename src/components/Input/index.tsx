import {
  Box,
  Button,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { inputPasswordProps, inputProps } from "../../types";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const InputText = ({
  label,
  type,
  placeholder,
  onChange,
}: inputProps) => {
  return (
    <Box display='flex' flexDir='column'>
      <FormLabel>{label}</FormLabel>
      <Input
        border='2px solid #373737'
        _focus={{ border: "2px solid #000" }}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Box>
  );
};

export const InputPassword = ({
  onChange,
  label,
  placeholder,
}: inputPasswordProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <InputGroup size='md'>
        <Input
          size='lg'
          pr='4.5rem'
          type={isShowPassword ? "text" : "password"}
          placeholder={placeholder}
          border='2px solid #373737'
          _focus={{ border: "2px solid #000" }}
          // value={passwordAccount}
          onChange={onChange}
        />
        <InputRightElement width='4.5rem' h='100%'>
          <Button
            h='1.75rem'
            size='sm'
            onClick={handleShowPassword}
            bgColor='white'
            _focus={{ border: "none" }}
            _active={{ bgColor: "#000" }}
            _hover={{ bgColor: "#373737", color: "white" }}
            p='2px'>
            {isShowPassword ? <Icon as={FaEyeSlash} /> : <Icon as={FaEye} />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export const InputTextArea = () => {
  return <div>index</div>;
};

export const InputSelect = () => {
  return <div>index</div>;
};
