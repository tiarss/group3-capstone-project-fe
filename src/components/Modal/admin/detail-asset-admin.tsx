import { Box, Button, FormControl, FormLabel, ModalBody, ModalFooter, Switch } from "@chakra-ui/react";
import React, { useState } from "react";
import { InputSelect, InputText } from "../../Input";

const DetailAdmin = () => {
    const [ namaAset, setNamaAset ] = useState<string>("");
    const [ deskripsiAset, setDeskripsiAset ] = useState<string>("");
    const [ kategoriAset, setKategoriAset ] = useState<{id: number, name: string}[]>([{id:1, name: "Laptop"}, {id:2, name:"Alat"}]);
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

    const handleKategori = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

    return(
        <>
            <InputText title="Nama Aset" placeholder="Masukkan Nama Aset" onChange={handleNama}/>
            <InputText title="Deskripsi Aset" placeholder="Masukkan Deskripsi Aset" onChange={handleDeskripsi}/>
            <InputSelect title="Kategori Aset" placeholder="Pilih Kategori Aset" value={selectedCategoryId} onChange={handleKategori} data={kategoriAset}/>
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
        </>
    )
}
export default DetailAdmin;