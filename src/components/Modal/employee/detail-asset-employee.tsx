import { Box, FormLabel } from "@chakra-ui/react";
import React from "react";

const DetailEmployee = () => {
    return(
        <>
            <Box width='100%' height="93.4px" bg='tomato'>

            </Box>
            <Box>
                <FormLabel style={{ fontWeight: "bold" }}>Deskripsi Aset</FormLabel>
                 <Box>
                     <FormLabel ms={5} style={{ fontWeight: "bold" }}>Aset Penunjang Pekerjaan Karyawan Divisi Tech</FormLabel>
                 </Box>
            </Box>
            <Box>
                <FormLabel style={{ fontWeight: "bold" }}>Kategori Aset</FormLabel>
                 <Box>
                     <FormLabel ms={5} style={{ fontWeight: "bold" }}>Laptop</FormLabel>
                 </Box>
            </Box>
            <Box height="32px" bg="#EFEFEF">
                <p>Sedang dalam perbaikan</p>
            </Box>
        </>
    )
} 
export default DetailEmployee;