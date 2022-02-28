import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { inputPasswordProps, inputProps, inputSelectProps } from "../../types";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";

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

export const InputSelect = ({title, placeholder, value, onChange, data}: inputSelectProps) => {
  return(
    <Box>
      <FormLabel style={{ fontWeight: "bold" }}>{title}</FormLabel>
      <Select 
        bgColor='white'
        border='2px solid #373737'
        _focus={{ border: "2px solid #000" }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      >
        {data !== undefined ? data.map((datas, index)=>(
          <option key={datas.id} value={datas.id}>{datas.name}</option>
        )) : <option value={0}>Kosong</option>}
      </Select>
    </Box>
  );
};

type searchData = {
  id: number
  name: string
  value: string
}

type searchProps = {
  data: searchData[];
  value: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Search = ({data, value, onChangeSearch, onChangeSelect} : searchProps) => {
  return(
    <Flex align="center" justify="center" mt={9}>
        <Flex>
        <Select 
            bg='#2296CB'
            borderColor='#2296CB'
            color='white'
            width={166}
            onChange={onChangeSelect}
            value={value}
        >
          {data !== undefined ? data.map((datas)=>(
              <option key={datas.id} value={datas.value} style={{ color: 'black' }}>{datas.name}</option>
            )) : <option value={0}>Kosong</option>}
        </Select>
        <InputGroup>
            <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='#2296CB' />}
            />
            <Input width={700} bg='white' type='text' placeholder='Cari Barang' onChange={onChangeSearch}/>
        </InputGroup>
        </Flex>
    </Flex>
  )
}
