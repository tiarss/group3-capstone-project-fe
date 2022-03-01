import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { addAssets } from "../../types";
import { ButtonPrimary, ButtonSecondary } from "../Button";
import { InputNumber, InputSelect, InputText } from "../Input";

const category = [
  { id: 1, name: "Computer" },
  { id: 2, name: "Computer Accessories" },
  { id: 3, name: "Networking" },
  { id: 4, name: "UPS" },
  { id: 5, name: "Printer and Scanner" },
  { id: 6, name: "Electronics" },
  { id: 7, name: "Others" },
];

export const AddAssets = ({
  role,
  isOpen,
  onClose,
//   onChangeName,
//   onChangeDeskripsi,
//   onChangeKategori,
//   onChangeJumlah,
//   onChangeImage,
}: addAssets ) => {
  return (
    <>
      {/* <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Aset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir='column' gap='10px'>
              <InputText
                title='Nama Aset'
                placeholder='Masukkan Nama Aset'
                type='text'
                onChange={onChangeName}
              />
              <InputText
                title='Deskripsi Aset'
                placeholder='Masukkan Desckripsi Aset'
                type='text'
                onChange={onChangeDeskripsi}
              />
              <InputSelect
                title='Kategori Aset'
                placeholder='Pilih Aset'
                data={category}
                onChange={onChangeKategori}
              />
              <InputNumber title='Jumlah Aset' onChange={onChangeJumlah} />
              <InputText title="Gambar Aset" onChange={onChangeImage} type='file'/>
            </Flex> */}

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


          {/* </ModalBody>
          <ModalFooter>
            <Flex justifyContent='end' gap='10px'>
              <ButtonSecondary title='Batal' onclick={onClose} />
              <ButtonPrimary title='Tambah Aset' />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};
