import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
import CardDetail from "../components/DetailCard";
import { Header } from "../components/Header";

const DirektoriAset = () => {
    return(
        <>  
            <Header/>
            <Box bg="#EFEFEF">
            <Flex align="center" justify="center">
                <Text fontSize='xl' fontWeight='bold' mt={7}>Direktori Aset</Text>
            </Flex>
            <Flex align="center" justify="center" mt={50}>
                <Box bg="white" width={1080} height={605} borderRadius={7} shadow="xl">
                    <Flex align="center" justify="center" mt={50}>
                    <Box width={950}>
                        <Flex>
                            <CardDetail/>
                            <Spacer/>
                            <CardDetail/>
                            <Spacer/>
                            <CardDetail/>
                            <Spacer/>
                            <CardDetail/>
                        </Flex>
                    </Box>
                    </Flex>
                </Box>
            </Flex>
            

                
            </Box>
        </>
    )
}
export default DirektoriAset;