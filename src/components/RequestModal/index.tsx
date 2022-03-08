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
import {
  InputSelect,
  InputSelectData,
  InputText,
} from "../Input";

export const RequestModal = ({
  isOpen,
  role,
  onClose,
  onChangeDeskripsi,
  onChangeAset,
  onClickRequest,
  onClickProcurement,
  onChangeImage,
  onChangeReqCategory,
}: {
  isOpen: boolean;
  role?: number;
  onClose: () => void;
  onChangeDeskripsi: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAset: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickRequest: () => void;
  onClickProcurement: () => void;
  onChangeEmployee: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeReqCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const [assetData, setAssetData] = useState();
  const [userData, setUserData] = useState();
  const roles = localStorage.getItem("role");

  useEffect(() => {
    if (roles === "Administrator") {
      fetchDataUsers();
    }
  }, []);

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
    fetchDataAset(value);
  };

  const category = [
    { id: 1, name: "Computer" },
    { id: 2, name: "Computer-Accessories" },
    { id: 3, name: "Networking" },
    { id: 4, name: "UPS" },
    { id: 5, name: "Printer-and-Scanner" },
    { id: 6, name: "Electronics" },
    { id: 7, name: "Others" },
  ];

  const categoryProc = [
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
          <ModalHeader>
            {role === 1 ? "Peminjaman Aset" : "Pengajuan Aset Baru"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {role === 1 ? (
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
                <InputText
                  title='Deskripsi Keperluan'
                  placeholder='Tuliskan Keperluan'
                  onChange={onChangeDeskripsi}
                />
              </Flex>
            ) : (
              <Flex flexDir='column' gap='10px'>
                <InputSelect
                  data={categoryProc}
                  title='Kategori Aset'
                  placeholder='Pilih Kategori'
                  onChange={onChangeReqCategory}
                />
                <InputText
                  title='Deskripsi Keperluan'
                  placeholder='Tuliskan Keperluan'
                  onChange={onChangeDeskripsi}
                />
                <InputText type='file' title='Upload Foto' onChange={onChangeImage} />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            {role === 1 ? (
              <Flex gap='10px'>
                <ButtonSecondary title='Batal' onclick={onClose} />
                <ButtonPrimary
                  title='Ajukan Peminjaman'
                  onclick={onClickRequest}
                />
              </Flex>
            ) : (
              <Flex gap='10px'>
                <ButtonSecondary title='Batal' onclick={onClose} />
                <ButtonPrimary title='Ajukan Pengadaan' onclick={onClickProcurement} />
              </Flex>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
