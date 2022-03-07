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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  inputPasswordProps,
  inputProps,
  inputSelectDataProps,
  inputSelectDataUserProps,
  inputSelectProps,
  inputSelectStatusProps,
} from "../../types";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";

export const InputText = ({
  title,
  placeholder,
  type,
  size,
  width,
  value,
  onChange,
  isDisabled
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
        width={width}
        type={type}
        placeholder={placeholder}
        value={value}
        isDisabled={isDisabled}
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

export const InputNumber = ({
  title,
  placeholder,
  value,
  onChange,
}: inputProps) => {
  return (
    <Box>
      <FormLabel style={{ fontWeight: "bold" }}>{title}</FormLabel>
      <NumberInput defaultValue={1} min={1} max={99}>
        <NumberInputField
        type="number"
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          bgColor='white'
          border='2px solid #373737'
          _focus={{ border: "2px solid #000" }}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
};

export const InputSelect = ({
  title,
  placeholder,
  value,
  onChange,
  data,
  isDisabled
}: inputSelectProps) => {
  return (
    <Box>
      <FormLabel style={{ fontWeight: "bold" }}>{title}</FormLabel>
      <Select
        bgColor='white'
        border='2px solid #373737'
        _focus={{ border: "2px solid #000" }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}>
        {data !== undefined ? (
          data.map((datas, index) => (
            <option key={index} value={datas.name}>
              {datas.name.replace("-"," ")}
            </option>
          ))
        ) : (
          <option value={0}>Kosong</option>
        )}
      </Select>
    </Box>
  );
};

export const InputSelectData = ({
  title,
  placeholder,
  value,
  onChange,
  data,
}: inputSelectDataProps) => {
  return (
    <Box>
      <FormLabel style={{ fontWeight: "bold" }}>{title}</FormLabel>
      <Select
        bgColor='white'
        border='2px solid #373737'
        _focus={{ border: "2px solid #000" }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}>
        {data !== undefined ? data.length > 0 ? (
          data.map((datas, index) => (
            <option key={index} value={datas.short_name}>
              {datas.name}
            </option>
          ))
        ) : (
          <option value={0}>Kosong</option>
        ) : <option value={0}>Kosong</option> }
      </Select>
    </Box>
  );
};

export const InputSelectDataUser = ({
  title,
  placeholder,
  value,
  onChange,
  data,
}: inputSelectDataUserProps) => {
  return (
    <Box>
      <FormLabel style={{ fontWeight: "bold" }}>{title}</FormLabel>
      <Select
        bgColor='white'
        border='2px solid #373737'
        _focus={{ border: "2px solid #000" }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}>
        {data !== undefined ? data.length > 0 ? (
          data.map((datas, index) => (
            <option key={datas.id} value={datas.id}>
              {datas.user}
            </option>
          ))
        ) : (
          <option value={0}>Kosong</option>
        ) : <option value={0}>Kosong</option> }
      </Select>
    </Box>
  );
};


type searchData = {
  id: number;
  name: string;
  value: string;
};

type searchProps = {
  data: searchData[];
  value: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Search = ({
  data,
  value,
  onChangeSearch,
  onChangeSelect,
}: searchProps) => {
  return (
    <Flex align='center' justify='center' mt={9}>
      <Flex>
        <Select
          bg='#2296CB'
          borderColor='#2296CB'
          color='white'
          width={166}
          onChange={onChangeSelect}
          value={value}>
          {data !== undefined ? (
            data.map((datas) => (
              <option
                key={datas.id}
                value={datas.value}
                style={{ color: "black" }}>
                {datas.name}
              </option>
            ))
          ) : (
            <option value={0}>Kosong</option>
          )}
        </Select>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='#2296CB' />}
          />
          <Input
            width={700}
            bg='white'
            type='text'
            placeholder='Cari Barang'
            onChange={onChangeSearch}
          />
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export const InputSelectStatus = ({
  title,
  placeholder,
  value,
  onChange,
  data,
  isDisabled
}: inputSelectStatusProps) => {
  return (
    <Box>
      <FormLabel style={{ fontWeight: "bold" }}>{title}</FormLabel>
      <Select
        bgColor='white'
        border='2px solid #373737'
        _focus={{ border: "2px solid #000" }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}>
        {data !== undefined ? (
          data.map((datas, index) => (
            <option key={index} value={datas.value}>
              {datas.name}
            </option>
          ))
        ) : (
          <option value={0}>Kosong</option>
        )}
      </Select>
    </Box>
  );
};
