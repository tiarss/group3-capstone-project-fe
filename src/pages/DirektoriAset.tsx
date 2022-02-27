import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Input, InputGroup, InputLeftElement, Select, Spacer, Text, useDisclosure, Wrap } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CardDetail from "../components/DetailCard";
import { Header } from "../components/Header";
import ModalDetailAsset from "../components/Modal/detail-asset";

const DirektoriAset = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [asset, setAsset] = useState<any[]>([])
    const [details, setDetails] = useState<{category: string, description: string, image: string, name: string, total_asset: number}>()
    const [categoryHistory, setCategoryHistory] = useState<string>("");
    const [nameHistory, setNameHistory] = useState<string>("");
    const [imageHistory, setImageHistory] = useState<string>("");
    const [usersHistory, setUsersHistory] = useState<any[]>([]);

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

    const handleDetail = (short_name: string) => {
        setIsOpen(true);
        axios
        .get(`https://klender.xyz/assets/${short_name}` ,
        {headers : {"Authorization" : "Bearer "+ localStorage.getItem('token')}})
        .then((res) => {
        const { data } = res.data;
        setDetails(data);
        })
        .catch((err) => {
        console.log(err.response);
        });
        handleHistory(short_name);
    }

    const handleHistory = (short_name: string) => {
        axios
        .get(`https://klender.xyz/histories/assets/${short_name}` ,
        {headers : {"Authorization" : "Bearer "+ localStorage.getItem('token')}})
        .then((res) => {
        const { data } = res.data;
        setCategoryHistory(data.category);
        setNameHistory(data.asset_name);
        setImageHistory(data.asset_image);
        setUsersHistory(data.users)
        })
        .catch((err) => {
        console.log(err.response);
        });
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return(
        <>  
            {console.log(usersHistory)}
            <Header/>
            <Box bg="#EFEFEF" paddingBottom={9}>
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
                    <Box width={['55%', '70%', '90%']}>
                        <Wrap spacing='50px'>
                        {asset.map((item: any) => (
                            <CardDetail key={item.short_name} backgroundImage={item.image} kategori={item.category} name={item.name} deskripsi={item.description} pengguna={item.user_count} stok={item.stock_available} onClick={()=>handleDetail(item.short_name)}/>  
                        ))}
                        </Wrap>
                    </Box>
                    </Flex>
                </Box>
            </Flex>
            {/* <ModalDetailAsset isOpen={isOpen} onClose={handleClose} nama={details?.name} total_aset={details?.total_asset} deskripsi={details?.description} kategori={details?.category} backgroundimage={details?.image}/> */}
            </Box>
        </>
    )
}
export default DirektoriAset;