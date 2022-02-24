import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

const HistoryAset = () => {
    return(
        <>
            <Box width='100%' height="93.4px" bg='tomato' marginBottom={5}>

            </Box>
            <Table variant='simple' size='sm'>
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Pengguna Aset</Th>
                        <Th>Tanggal Peminjaman</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>1</Td>
                        <Td>Adi</Td>
                        <Td>23/02/2022</Td>
                        <Td>Nyoba aja</Td>
                    </Tr>
                </Tbody>
            </Table>
        </>
    )
}
export default HistoryAset;