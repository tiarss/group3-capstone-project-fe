import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { history, modalProps } from "../../../types";

// type historyProps = {
//     category: string | undefined;
//     asset_name: string | undefined;
//     asset_image: string | undefined;
//     id: number | undefined;
//     user_name: string | undefined;
//     request_date: string | undefined;
//     status: string | undefined;
// }

const HistoryAset = ({category, asset_name, asset_image, users}: history) => {
    return(
        <>
            <Box width='100%' height="93.4px" marginBottom={5} style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${asset_image})`
                }}>
                    <Box width={100} ms={3} mb={9} paddingTop={2}>
                        <Text
                        fontWeight='semibold'
                        borderRadius='5px'
                        width='fit-content'
                        fontSize='9px'
                        textAlign='left'
                        padding='5px'
                        bgColor='white'
                        >
                        {category}
                        </Text>
                    </Box>
                    <Box width={175} ms={3}>
                    <Text
                        mt='5px'
                        fontWeight='semibold'
                        borderRadius='5px'
                        width='fit-content'
                        fontSize='11px'
                        textAlign='left'
                        padding='5px'
                        bgColor='white'
                        lineHeight={1}>
                        {asset_name}
                    </Text>
                    </Box>
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
                    {users == null ? <p>Data tidak ada</p> : users.map((item:any) => 
                    <Tr>
                        <Td>{item.id}</Td>
                        <Td>{item.user_name}</Td>
                        <Td>{item.request_date}</Td>
                        <Td>{item.status}</Td>
                    </Tr>
                    )}
                </Tbody>
            </Table>
        </>
    )
}
export default HistoryAset;