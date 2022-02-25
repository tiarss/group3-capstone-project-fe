import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Input, InputGroup, InputLeftElement, Select, Spacer, Text, Wrap } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CardDetail from "../components/DetailCard";
import { Header } from "../components/Header";

const DirektoriAset = () => {

    const [asset, setAsset] = useState<any[]>([])

    useEffect(() => {
        fetchDataAset()
    }, [])

    const fetchDataAset = () => {
        axios
        .get("https://klender.xyz/assets" ,
        {headers : {"Authorization" : "Bearer "+ localStorage.getItem('token')}})
        .then((res) => {
        const { data } = res.data;
        setAsset(data);
        })
        .catch((err) => {
        console.log(err.response);
        });
    };

    return(
        <>  
            {console.log('asset=',asset)}
            <Header/>
            <Box bg="#EFEFEF">
            <Flex align="center" justify="center">
                <Text fontSize='xl' fontWeight='bold' mt={7}>Direktori Aset</Text>
            </Flex>
            <Flex align="center" justify="center" mt={9}>
                <Flex>
                <Select 
                    bg='#2296CB'
                    borderColor='#2296CB'
                    color='white'
                    width={166}
                    placeholder='Filled'
                />
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='#2296CB' />}
                    />
                    <Input width={700} bg='white' type='text' placeholder='Cari Barang' />
                </InputGroup>
                </Flex>
            </Flex>
            <Flex align="center" justify="center" mt={50}>
                <Box bg="white" width={1080} maxHeight={605} borderRadius={7} shadow="xl" overflowY='scroll'>
                    <Flex align="center" justify="center" mt={50}>
                    <Box width={950}>
                        
                        <Wrap spacing='50px'>
                        {asset.map((item: any, index) => (
                            <CardDetail key={index} backgroundImage={item.image} kategori={item.category} name={item.name} deskripsi={item.description} pengguna={item.user_count} stok={item.stock_available}/>  
                        ))}
                        </Wrap>
                    </Box>
                    </Flex>
                </Box>
            </Flex>
            

                
            </Box>
        </>
    )
}
export default DirektoriAset;