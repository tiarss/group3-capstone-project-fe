import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormLabel,
    Box,
    Select,
  } from '@chakra-ui/react';
import { InputText } from "../Input";

const ModalAddAssets = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [kategoriAset, setKategoriAset] = useState<{id: number, deskripsi: string}[]>([{id:1, deskripsi: "Laptop"}, {id:2, deskripsi:"Alat"}]);
    const [asetImage, setAsetImage] = useState<File>();

    const handleAsetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.files;
        if (!value) return;
    
        setAsetImage(value[0]);
        //  console.log(value)
    };

    return (
        <>
          <Button onClick={onOpen}>Open Modal</Button>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Tambah Asset</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <InputText title="Nama Aset" placeholder="Masukkan Nama Aset"/>
                <InputText title="Deskripsi Aset" placeholder="Masukkan Deskripsi Aset"/>
                {/* <InputText title="Kategori Aset"/> */}
                <Box>
                    <FormLabel style={{ fontWeight: "bold" }}>Kategori Aset</FormLabel>
                    <Select placeholder='Pilih Kategori Aset'>
                        {kategoriAset.map((item:any)=>(
                        <option value={item.id}>{item.deskripsi}</option>
                        ))}
                    </Select>
                </Box>
                <InputText title="Jumlah Aset" placeholder="Masukkan Jumlah Aset"/>
                <Box>
                    <FormLabel style={{ fontWeight: "bold" }}>Foto Aset</FormLabel>
                    <input type='file' onChange={handleAsetImage} />
                </Box>
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Ajukan
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    )
}
export default ModalAddAssets;