import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllAssets } from "../../types";
import { ButtonPrimary, ButtonSecondary } from "../Button";
import { InputSelect, InputSelectData, InputSelectDataUser, InputText } from "../Input";

const category = [
  { id: 1, name: "Computer" },
  { id: 2, name: "Computer Accessories" },
  { id: 3, name: "Networking" },
  { id: 4, name: "UPS" },
  { id: 5, name: "Printer and Scanner" },
  { id: 6, name: "Electronics" },
  { id: 7, name: "Others" },
];

export const AssignAssets = ({
  isOpen,
  onClose,
  onChangeDeskripsi,
  onChangeAset,
  onChangeEmployee,
  onClickAssign,
  onChangeDate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onChangeDeskripsi: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAset: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeEmployee: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickAssign: () => void;
  onChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const [assetData, setAssetData] = useState();
  const [userData, setUserData] = useState();
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    fetchDataUsers();
  }, []);
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.target.checked
     setIsChecked(value)
  }

  const fetchDataAset = (value: string) => {
    axios
      .get(`/assets?category=${value}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        const filterAvailable = data.filter(
          (value: getAllAssets) => value.stock_available !== 0
        );
        console.log(filterAvailable);
        setAssetData(filterAvailable);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const fetchDataUsers = () => {
    axios
      .get(`/users`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const { data } = res.data;
        const splice = data.splice(5, 40);
        setUserData(splice);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(value);
    fetchDataAset(value);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Aset ke Karyawan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Flex flexDir='column' gap='10px'>
              <InputSelect
                  data={category}
                  title='Kategori Aset'
                  placeholder='Pilih Kategori'
                  onChange={handleChangeCategory}
                />
                <InputSelectData
                  title='List Aset'
                  placeholder='Pilih Aset'
                  data={assetData}
                  onChange={onChangeAset}
                />
                <InputSelectDataUser
                  title='Pilih Karyawan'
                  placeholder='Karyawan - Divisi'
                  data={userData}
                  onChange={onChangeEmployee}
                />
                <InputText
                  title='Deskripsi Keperluan'
                  placeholder='Tuliskan Keperluan'
                  onChange={onChangeDeskripsi}
                />
                <Text>Gunakan Tanggal Pengembalian</Text>
                <Switch id='isChecked' onChange={handleChecked} width="fit-content" isChecked={isChecked} />
                <Box display={isChecked ? "block" : "none"}>
                  <InputText
                    title='Tanggal Pengembalian'
                    placeholder='Tuliskan Keperluan'
                    type="date"
                    onChange={onChangeDate}
                  />
                </Box>
              </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent='end' gap='10px'>
              <ButtonSecondary title='Batal' onclick={onClose} />
              <ButtonPrimary title='Assign Aset' onclick={onClickAssign} />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
