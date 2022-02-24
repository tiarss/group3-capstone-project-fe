import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";

const CardDetail = () => {
    return(
        <>
            <Box width={200} borderWidth='2px' borderColor='black' borderRadius='lg' overflow='hidden'>
                <Box height={108} style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage:
                    "url(https://id.360buyimg.com/Indonesia/nHBfsgAAYwAAABkACvFW2gAKOCI.jpg)",
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
                        Kategori
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
                        Lenovo Thinkpad Yoga 370 Core i7 7600U Ge..
                    </Text>
                    </Box>
                </Box>
                <Box mt={2} mx={3}>
                    <Text fontSize='xs' lineHeight={1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a dui metus. Maecenas malesuada suscipit odio, id convallis enim ...</Text>
                </Box>
                <Flex mt={5}>
                    <Box ms={3}>
                        <Text fontSize='xs' fontWeight='bold'>4 Pengguna</Text>
                    </Box>
                    <Spacer/>
                    <Box me={3}>
                        <Text fontSize='xs' fontWeight='bold'>10 Tersedia</Text>
                    </Box>
                </Flex>
                <Box m={3}>
                    <Button width='100%' colorScheme='blue' variant='outline'>Lihat Detail</Button>
                </Box>

            </Box>
        </>
    )
}
export default CardDetail;