import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { CardDetailProps } from "../../types";
import { ButtonSecondary } from "../Button";

const CardDetail = ({backgroundImage, kategori, name, deskripsi, pengguna, stok}: CardDetailProps) => {
    return(
        <>
            <Box width={200} minHeight={250} borderWidth='2px' borderColor='black' borderRadius='lg' overflow='hidden'>
                <Box height={108} style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: backgroundImage,
                }}>
                    <Box width={50} ms={3} mb={9} paddingTop={2}>
                        <Text
                        fontWeight='semibold'
                        borderRadius='5px'
                        width='fit-content'
                        fontSize='9px'
                        textAlign='left'
                        padding='5px'
                        bgColor='white'
                        >
                        {kategori}
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
                        {name}
                    </Text>
                    </Box>
                </Box>
                <Box mt={2} mx={3}>
                    <Text fontSize='xs' lineHeight={1}>{deskripsi}</Text>
                </Box>
                <Flex mt={5}>
                    <Box ms={3}>
                        <Text fontSize='xs' fontWeight='bold'>{pengguna} Pengguna</Text>
                    </Box>
                    <Spacer/>
                    <Box me={3}>
                        <Text fontSize='xs' fontWeight='bold'>{stok} Tersedia</Text>
                    </Box>
                </Flex>
                <Flex width='100%' p={3}  align="center" justifyContent="center">
                    <ButtonSecondary title="Lihat Detail" customFontSize="12px"/>
                </Flex>

            </Box>
        </>
    )
}
export default CardDetail;