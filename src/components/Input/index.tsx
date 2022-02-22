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
  title,
  placeholder,
  type,
  size,
  value,
  onChange,
}: inputProps) => {
  return (
    <Box>
      <FormLabel style={{ fontWeight: "bold" }}>{title}</FormLabel>
      <Input
        bgColor='white'
        border='2px solid #373737'
        _focus={{ border: "2px solid #000" }}
        onChange={onChange}
        size={size}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </Box>
  );
};

export const InputPassword = ({
  onClick,
  onChange,
  label,
  placeholder,
}: inputPasswordProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <Box>
      <FormLabel style={{ fontWeight: "bold" }}>{label}</FormLabel>
      <InputGroup size='md'>
        <Input
          bgColor='white'
          onClick={onClick}
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
