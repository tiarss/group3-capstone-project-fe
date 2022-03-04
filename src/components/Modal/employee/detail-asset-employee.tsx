import { Box, FormLabel, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { MaintenanceContext } from "../../../helper/MaintenanceContext";

type detailEmployeeProps = {
    nama: string | undefined;
    total_aset: number | undefined;
    deskripsi: string | undefined;
    kategori: string | undefined;
    backgroundImage?: string | undefined;
}
const DetailEmployee = ({nama, total_aset, deskripsi, kategori, backgroundImage}: detailEmployeeProps) => {
    const {Maintained, setMaintained} = useContext(MaintenanceContext);
    return(
        <>
            <Box width='100%' height="93.4px" style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${backgroundImage})`}}>
                      <Box width='100%' ms={3} mb={1} paddingTop={2}>
                        <Text
                            mt='30px'
                            fontWeight='semibold'
                            borderRadius='5px'
                            width='fit-content'
                            fontSize='13px'
                            textAlign='left'
                            padding='5px'
                            bgColor='white'
                            lineHeight={1}>
                            {nama}
                        </Text>
                    </Box>
                    <Box width={200} ms={3}>
                    <Text
                        fontWeight='semibold'
                        borderRadius='5px'
                        width='fit-content'
                        fontSize='10px'
                        textAlign='left'
                        padding='5px'
                        bgColor='white'
                        >
                        {total_aset} Tersedia
                        </Text>
                    </Box>
            </Box>
            <Box>
                <FormLabel mt={5} fontSize='13px' style={{ fontWeight: "bold" }}>Deskripsi Aset</FormLabel>
                 <Box>
                     <Text ms={5} mb={5} fontWeight='bold' fontSize='11px'>{deskripsi}</Text>
                 </Box>
            </Box>
            <Box>
                <FormLabel fontSize='13px' style={{ fontWeight: "bold" }}>Kategori Aset</FormLabel>
                 <Box>
                     <FormLabel ms={5} mb={5} fontSize='11px' style={{ fontWeight: "bold" }}>{kategori}</FormLabel>
                 </Box>
            </Box>
            <Box height="32px" bg="#EFEFEF">
                {Maintained === true ? 
                <Text paddingTop={1} paddingLeft={5} color="#2296CB">Sedang dalam perbaikan</Text>
            : <Text paddingTop={1} paddingLeft={5} color="#2296CB">Tersedia</Text>}
            </Box>
        </>
    )
} 
export default DetailEmployee;