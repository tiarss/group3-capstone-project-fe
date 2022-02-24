import {
  Box,
  Button,
  Flex,
  HTMLChakraComponents,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ButtonPrimary, ButtonSecondary } from "../Button";
import { InputText } from "../Input";

export const RequestModal = () => {
  const [checked, setChecked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const role: number = 2;

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setChecked(value);
  };
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Peminjaman Aset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {role === 1 ? (
              <Flex flexDir='column' gap='10px'>
                <InputText title='Kategori Aset' placeholder='Laptop' />
                <InputText
                  title='Pilih Aset'
                  placeholder='Lenovo Thinkpad Yoga'
                />
                <InputText
                  title='Deskripsi Keperluan'
                  placeholder='Tuliskan Keperluan'
                />
              </Flex>
            ) : (
              <Flex flexDir='column' gap='10px'>
                <InputText title='Kategori Aset' placeholder='Laptop' />
                <InputText
                  title='Pilih Aset'
                  placeholder='Lenovo Thinkpad Yoga'
                />
                <InputText title='Karyawan' placeholder='Bahtiar Subrata' />
                <InputText
                  title='Deskripsi Keperluan'
                  placeholder='Tuliskan Keperluan'
                />
                <Text>Gunakan Tanggal Pengembalian</Text>
                <Switch id='isChecked' onChange={handleChecked} />
                <Box display={checked? "block" : "none"}>
                  <InputText
                    title='Tanggal Pengembalian'
                    placeholder='Tuliskan Keperluan'
                  />
                </Box>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent='end' gap='10px'>
              <ButtonSecondary title='Batal' onclick={onClose} />
              <ButtonPrimary title='Ajukan Peminjaman' />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
