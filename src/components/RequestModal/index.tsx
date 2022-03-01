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
import { InputSelect, InputText } from "../Input";

export const RequestModal = ({
  role,
  isOpen,
  onClose,
}: {
  role?: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  // const [checked, setChecked] = useState(false);
  // const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.checked;
  //   setChecked(value);
  // };
  const category = [
    { id: 1, name: "Computer" },
    { id: 2, name: "Computer Accessories" },
    { id: 3, name: "Networking" },
    { id: 4, name: "UPS" },
    { id: 5, name: "Printer and Scanner" },
    { id: 6, name: "Electronics" },
    { id: 7, name: "Others" },
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Peminjaman Aset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir='column' gap='10px'>
              <InputSelect
                title='Pilih Aset'
                placeholder='Pilih Aset'
                data={category}
              />
              <InputSelect title='Pilih Kategory' placeholder='Pilih Aset' />
              <InputText
                title='Pilih Aset'
                placeholder='Lenovo Thinkpad Yoga'
              />
            </Flex>

            {/* {role === 1 ? (
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
            )} */}
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
