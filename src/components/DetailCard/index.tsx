import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";

const CardDetail = () => {
    return(
        <>
            <Box width={200} borderWidth='2px' borderColor='black' borderRadius='lg' overflow='hidden'>
                <Box bg='tomato'>
                    <Box width={50} ms={3} mb={5} bg="#EFEFEF">
                        <Text fontSize='xs'>Kategori</Text>
                    </Box>
                    <Box width={175} ms={3} bg="#EFEFEF">
                        <Text fontSize='sm' fontWeight='bold'>Lenovo Thinkpad Yoga 370 Core i7 7600U Ge..</Text>
                    </Box>
                </Box>
                <Box mt={2} mx={3}>
                    <Text fontSize='xs'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a dui metus. Maecenas malesuada suscipit odio, id convallis enim ...</Text>
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