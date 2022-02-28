import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Input, InputGroup, InputLeftElement, Select, Spacer, Text, useDisclosure, Wrap } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CardDetail from "../components/DetailCard";
import { Header } from "../components/Header";
import { Search } from "../components/Input";
import ModalDetailAsset from "../components/Modal/detail-asset";

const DirektoriAset = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [asset, setAsset] = useState<any[]>([])
    const [details, setDetails] = useState<{category: string, description: string, image: string, name: string, total_asset: number}>()
    const [categoryHistory, setCategoryHistory] = useState<string>("");
    const [nameHistory, setNameHistory] = useState<string>("");
    const [imageHistory, setImageHistory] = useState<string>("");
    const [usersHistory, setUsersHistory] = useState<any[]>([]);
    const [isMaintained, setIsMaintained ] = useState<boolean>(false);
    const [shortName, setShortName] = useState<string>("");
    const [search, setSearch] = useState<string>("")
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const category = [
        { id: 1, name: "Computer" },
        { id: 2, name: "Computer Accessories" },
        { id: 3, name: "Networking" },
        { id: 4, name: "UPS" },
        { id: 5, name: "Printer and Scanner" },
        { id: 6, name: "Electronics" },
        { id: 7, name: "Others" },
      ];

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
        setShortName(short_name);
        axios
        .get(`https://klender.xyz/assets/${short_name}` ,
        {headers : {"Authorization" : "Bearer "+ localStorage.getItem('token')}})
        .then((res) => {
        const { data } = res.data;
        setDetails(data);
        })
        .catch((err) => {
        console.log(err.response);
        })
        .finally(()=> {
            setIsOpen(true);
        })
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
        setUsersHistory(data.users);
        })
        .catch((err) => {
        console.log(err.response);
        });
    }

    const handleClose = () => {
        setIsOpen(false);
        setShortName("");
        setDetails({category:"", description: "", image: "", name: "", total_asset: 0})
    }

    const handleMaintenance = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        console.log(value)
        setIsMaintained(value)
    }

    const handleUpdate = (short_name: string) => {
        axios
        .put(`https://klender.xyz/assets/${short_name}`,{
            under_maintenance: isMaintained
        },
        {headers : {"Authorization" : "Bearer "+ localStorage.getItem('token')}})
        .then((res) => {
        const { data } = res;
        console.log(data);
        })
        .catch((err) => {
        console.log(err.response);
        });
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedCategory(value);
        console.log(value);
        axios
        .get(`https://klender.xyz/assets?category=${value}`,
        {headers : {"Authorization" : "Bearer "+ localStorage.getItem('token')}})
        .then((res) => {
        const { data } = res.data;
        setAsset(data);
        })
        .catch((err) => {
        console.log(err.response);
        });
    }

    return(
        <>  
            <Header/>
            <Box bg="#EFEFEF" paddingBottom={9}>
            <Flex align="center" justify="center">
                <Text fontSize='xl' fontWeight='bold' mt={7}>Direktori Aset</Text>
            </Flex>
            <Search title="All" data={category} onChangeSearch={handleSearch} onChangeSelect={handleSelect}/>
            <Flex align="center" justify="center" mt={50}>
                <Box bg="white" width={1080} maxHeight={605} borderRadius={7} shadow="xl" overflowY='scroll'>
                    <Flex align="center" justify="center" mt={50}>
                    <Box width={['55%', '70%', '90%']}>
                        <Wrap spacing='50px'>
                        {asset.filter(
                            (el) =>
                                    el.name
                                      .toLowerCase()
                                      .includes(search.toLowerCase()) ||
                                    el.description
                                      .toLowerCase()
                                      .includes(search.toLowerCase())
                                )
                            .map((item: any) => (
                            <CardDetail key={item.short_name} backgroundImage={item.image} kategori={item.category} name={item.name} deskripsi={item.description} pengguna={item.user_count} stok={item.stock_available} onClick={()=>handleDetail(item.short_name)}/>  
                        ))}
                        </Wrap>
                    </Box>
                    </Flex>
                </Box>
            </Flex>
            <ModalDetailAsset isOpen={isOpen} onClose={handleClose} nama={details?.name} total_aset={details?.total_asset} deskripsi={details?.description} kategori={details?.category} backgroundimage={details?.image} category={categoryHistory} asset_name={nameHistory} asset_image={imageHistory} users={usersHistory} onChangeUpdate={handleMaintenance} onClickUpdate={()=>handleUpdate(shortName)}/>
            </Box>
        </>
    )
}
export default DirektoriAset;

// {data
//     .filter(
//       (el) =>
//         el.content //content bisa di ganti name
//           .toLowerCase()
//           .includes(textSearch.toLowerCase()) ||
//         el.description // description tetep description
//           .toLowerCase()
//           .includes(textSearch.toLowerCase())
//     )
//     .map((value) => (
//       <Todo
//         key={value.id}
//         title={value.content}
//         description={value.description}
//         completed={value.completed}
//         loading={this.state.isLoading}
//         onClickDeleted={() => this.handleDelete(value.id)}
//         onClickEdited={() => this.handleEdited(value.id)}
//         onClickCompleted={() => this.handleCompleted(value.id)}
//         onClickDetails={() => this.handleDetails(value.id)}
//       />
//     ))}