import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Box,
  FormControl,
  Switch,
  Flex,
} from "@chakra-ui/react";
import { InputNumber, InputSelect, InputText } from "../Input";
import { addAssets } from "../../types";
import { ButtonPrimary, ButtonSecondary } from "../Button";

const category = [
  { id: 1, name: "Computer" },
  { id: 2, name: "Computer Accessories" },
  { id: 3, name: "Networking" },
  { id: 4, name: "UPS" },
  { id: 5, name: "Printer and Scanner" },
  { id: 6, name: "Electronics" },
  { id: 7, name: "Others" },
];

const ModalAddAssets = ({
  isOpen,
  onClose,
  onChangeName,
  onChangeDeskripsi,
  onChangeKategori,
  onChangeJumlah,
  onChangeMaintained,
  onChangeImage,
  onClickAdd,
}: addAssets) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Asset</ModalHeader>
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
              <InputText
                title='Gambar Aset'
                onChange={onChangeImage}
                type='file'
              />
              <Box bgColor='#EFEFEF' marginTop={3} borderRadius={5}>
                <FormControl display='flex' alignItems='center'>
                  <FormLabel htmlFor='email-alerts' mb='0'>
                    Maintenance?
                  </FormLabel>
                  <Switch id='email-alerts' onChange={onChangeMaintained}/>
                </FormControl>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent='end' gap='10px'>
              <ButtonSecondary title='Batal' onclick={onClose} />
              <ButtonPrimary title='Tambah Aset' onclick={onClickAdd}/>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalAddAssets;
