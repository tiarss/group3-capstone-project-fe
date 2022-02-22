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
    FormControl,
    Switch,
  } from '@chakra-ui/react';
import { InputText } from "../Input";

const ModalAddAssets = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ namaAset, setNamaAset ] = useState<string>("");
    const [ deskripsiAset, setDeskripsiAset ] = useState<string>("");
    const [ kategoriAset, setKategoriAset ] = useState<{id: number, deskripsi: string}[]>([{id:1, deskripsi: "Laptop"}, {id:2, deskripsi:"Alat"}]);
    const [ selectedCategoryId, setSelectedCategoryId ] = useState<number>(0);
    const [ jumlahAset, setJumlahAset ] = useState<string | number>();
    const [ asetImage, setAsetImage ] = useState<File>();
    const [ isMaintained, setIsMaintained ] = useState<boolean>(false);

    const handleNama = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNamaAset(value);
    };

    const handleDeskripsi = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDeskripsiAset(value);
    };

    const handleKategori = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setSelectedCategoryId(value);
    };

    const handleJumlahAset = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setJumlahAset(value);
    };

    const handleAsetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.files;
        if (!value) return;
    
        setAsetImage(value[0]);
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
                <InputText title="Nama Aset" placeholder="Masukkan Nama Aset" onChange={handleNama}/>
                <InputText title="Deskripsi Aset" placeholder="Masukkan Deskripsi Aset" onChange={handleDeskripsi}/>
                <Box>
                    <FormLabel style={{ fontWeight: "bold" }}>Kategori Aset</FormLabel>
                    <Select placeholder='Pilih Kategori Aset' onChange={(e)=>handleKategori}>
                        {kategoriAset.map((item:any)=>(
                        <option key={item.id} value={item.id}>{item.deskripsi}</option>
                        ))}
                    </Select>
                </Box>
                <InputText title="Jumlah Aset" placeholder="Masukkan Jumlah Aset" onChange={handleJumlahAset}/>
                <Box>
                    <FormLabel style={{ fontWeight: "bold" }}>Foto Aset</FormLabel>
                    <input type='file' onChange={handleAsetImage} />
                </Box>
                <Box bgColor="#EFEFEF" marginTop={3} borderRadius={5}>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='email-alerts' mb='0'>
                            Maintenance?
                        </FormLabel>
                        <Switch id='email-alerts'/>
                    </FormControl>
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