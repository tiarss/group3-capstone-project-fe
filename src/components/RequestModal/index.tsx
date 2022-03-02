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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllAssets } from "../../types";
import { ButtonPrimary, ButtonSecondary } from "../Button";
import { InputSelect, InputSelectData, InputText } from "../Input";

export const RequestModal = ({
  isOpen,
  onClose,
  onChangeDeskripsi,
  onChangeAset,
  onClickRequest
}: {
  isOpen: boolean;
  onClose: () => void;
  onChangeDeskripsi: (e: React.ChangeEvent<HTMLInputElement>)=> void;
  onChangeAset: (e: React.ChangeEvent<HTMLSelectElement>)=> void
  onClickRequest: () => void;
}) => {
  // const [checked, setChecked] = useState(false);
  // const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.checked;
  //   setChecked(value);
  // };
  const [assetData, setAssetData] = useState();

  useEffect(() => {}, []);

  const fetchDataAset = (value: string) => {
    axios
      .get(`/assets?category=${value}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const { data } = res.data;
        console.log(data)
        const filterAvailable = data.filter((value: getAllAssets) => value.stock_available !== 0)
        console.log(filterAvailable)
        setAssetData(filterAvailable);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(value);
    fetchDataAset(value)
  };

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
                data={category}
                title='Kategori Aset'
                placeholder='Pilih Kategori'
                onChange={handleChangeCategory}
              />
              <InputSelectData title='List Aset' placeholder='Pilih Aset' data={assetData} onChange={onChangeAset}/>
              <InputText
                title='Deskripsi Keperluan'
                placeholder='Lenovo Thinkpad Yoga'
                onChange={onChangeDeskripsi}
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
            <Flex gap='10px'>
              <ButtonSecondary title='Batal' onclick={onClose} />
              <ButtonPrimary title='Ajukan Peminjaman' onclick={onClickRequest} />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
