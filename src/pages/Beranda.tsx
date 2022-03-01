import {
  Box,
  Flex,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Pagination } from "@mantine/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonTertier,
} from "../components/Button";
import { Header } from "../components/Header";
import { ModalActivity } from "../components/ModalActivity";
import { RequestModal } from "../components/RequestModal";
import { ResumeCard } from "../components/ResumeCard";
import SliderImage from "../components/Slider";
import axios from "axios";

export const Beranda = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRequest, setIsOpenRequest] = useState(false);
  const [isOpenAddAssets, setIsOpenAddAssets] = useState(false);
  const [role, setRole] = useState(1);
  const [activePage, setPage] = useState(1);
  const idUser = localStorage.getItem("id");

  //Employee State
  //Create Request

  const [assetName, setAssetName] = useState<string>("");
  const [activity, setActivity] = useState<string>("Peminjaman Aset");
  const [description, setDesciption] = useState<string>("");

  //End Employee State

  //Admin State
  //Create Assets
  const [addAssetsName, setAddAssetsName] = useState<string>("");
  const [addAssetsDescription, setAddAssetsDescription] = useState<string>("");
  const [addAssetsSum, setAddAssetsSum] = useState<number>(0);
  const [addAssetsImage, setAddAssetsImage] = useState<File>();;
  const [addAssetsCategory, setAddAssetsCategory] = useState<string>("");
 


  //End Admin State

  useEffect(() => {
    roleCondition();
  }, []);

  const roleCondition = () => {
    const roles = localStorage.getItem("role");
    if (roles === "Employee") {
      setRole(1);
    } else if (roles === "Administrator") {
      setRole(2);
    } else {
      setRole(3);
    }
  };

  const handlePage = (value: number) => {
    console.log(value);
    setPage(value);
  };
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  //Logic as Employee
  const handleOpenRequest = () => {
    axios
      .get(`/activities/${idUser}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setIsOpenRequest(true);
      });
  };

  const handleCloseRequest = () => setIsOpenRequest(false);

  const handleRequest = () => {
    axios.put(
      "/request/borrow",
      {
        // assets_name: assets_nama
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    console.log(value)
  };

  // End of Employee Logic
  // Admin Logic
  const handleOpenAddAssets = () => {
    setIsOpenAddAssets(true);
  };

  const handleCloseAddAssets = () => {
    setIsOpenAddAssets(false);
  };

  const handleAddName = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value
    setAddAssetsName(value)
    console.log(value)
  }
  const handleAddDeskripsi = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value
    setAddAssetsDescription(value)
    console.log(value)
  }
  const handleAddJumlah = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = parseInt(e.target.value)
    setAddAssetsSum(value)
    console.log(value)
  }
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.files
    if(!value) return
    setAddAssetsImage(value[0])
    console.log(value)
  }

  const handleAddAssets = () =>{

  }
  // End of Admin Logic

  return (
    <div>
      <Header />
      <Box
        transition='all 0.5s ease'
        padding={{ base: "50px 25px", md: "50px", lg: "50px 100px" }}
        bgColor='#EFEFEF'
        display='flex'
        flexDir='column'
        gap='20px'>
        <Box
          transition='all 0.5s ease'
          display='flex'
          flexDir={{ base: "column", lg: "row" }}
          gap='20px'>
          <Box
            bgColor='white'
            height='200px'
            width='100%'
            padding='20px'
            borderRadius='10px'>
            <Text fontSize='24px'>Welcome To</Text>
            <Text>Employee Assets Management</Text>
          </Box>
          <Box
            bgColor='white'
            borderRadius='10px'
            padding='10px'
            height={{ base: "fit-content", lg: "200px" }}
            transition='all 0.5s ease'
            minW={{ base: "100%", lg: "249px" }}
            maxW={{ base: "100%", lg: "250px" }}
            display='flex'
            flexWrap='wrap'>
            <ResumeCard />
          </Box>
        </Box>
        <Box display={role === 1 ? "block" : "none"}>
          <Box padding='20px' bgColor='white' borderRadius='10px'>
            <Text fontSize='16px' fontWeight='semibold' textAlign='left'>
              Aktivitas
            </Text>
            <SliderImage />
          </Box>
        </Box>
        <Box display='flex' gap='20px'>
          <Box
            bgColor='white'
            width='100%'
            minH='200px'
            padding='20px'
            borderRadius='10px'>
            <Flex
              transition='all 0.5s ease'
              alignItems={{ base: "start", md: "center" }}
              justifyContent='space-between'
              mb='20px'
              flexDir={{ base: "column", md: "row" }}>
              <Text
                fontSize='16px'
                fontWeight='semibold'
                textAlign='left'
                transition='all 0.5s ease'
                mb={{ base: "10px", md: "0px" }}>
                Permohonan Terbaru
              </Text>
              <Flex gap='10px'>
                {role === 1 ? (
                  <>
                    <ButtonPrimary
                      title='Peminjaman Aset'
                      onclick={handleOpenRequest}
                    />
                  </>
                ) : role === 2 ? (
                  <>
                    <ButtonTertier title='Assign Aset Ke Karyawan' />
                    <ButtonSecondary title='Pengajuan Aset Baru' />
                    <ButtonPrimary
                      title='Tambah Aset'
                      onclick={handleOpenAddAssets}
                    />
                  </>
                ) : (
                  <></>
                )}
              </Flex>
            </Flex>
            <Box overflowX='auto'>
              {role === 1 || role === 2 ? (
                <Table minW='800px' size='sm' borderRadius='20px'>
                  <Thead bgColor='blue.500'>
                    <Tr>
                      <Th color='white'>No</Th>
                      <Th color='white'>Tanggal</Th>
                      <Th color='white'>Jenis Aktivitas</Th>
                      <Th color='white'>Kategori Aset</Th>
                      <Th color='white'>Barang</Th>
                      <Th color='white'></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>1</Td>
                      <Td>12:22 WIB, 11 Jan 2022</Td>
                      <Td>Peminjaman Aset</Td>
                      <Td>Headphone</Td>
                      <Td>dBe DJ80 Foldable DJ...</Td>
                      <Td>
                        <ButtonTertier title='Details' onclick={handleOpen} />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>1</Td>
                      <Td>12:22 WIB, 11 Jan 2022</Td>
                      <Td>Peminjaman Aset</Td>
                      <Td>Headphone</Td>
                      <Td>dBe DJ80 Foldable DJ...</Td>
                      <Td>
                        <ButtonTertier title='Details' />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>1</Td>
                      <Td>12:22 WIB, 11 Jan 2022</Td>
                      <Td>Peminjaman Aset</Td>
                      <Td>Headphone</Td>
                      <Td>dBe DJ80 Foldable DJ...</Td>
                      <Td>
                        <ButtonTertier title='Details' />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>1</Td>
                      <Td>12:22 WIB, 11 Jan 2022</Td>
                      <Td>Peminjaman Aset</Td>
                      <Td>Headphone</Td>
                      <Td>dBe DJ80 Foldable DJ...</Td>
                      <Td>
                        <ButtonTertier title='Details' />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>1</Td>
                      <Td>12:22 WIB, 11 Jan 2022</Td>
                      <Td>Peminjaman Aset</Td>
                      <Td>Headphone</Td>
                      <Td>dBe DJ80 Foldable DJ...</Td>
                      <Td>
                        <ButtonTertier title='Details' />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              ) : (
                <Table size='sm' borderRadius='20px'>
                  <Thead bgColor='blue.500'>
                    <Tr>
                      <Th color='white'>No</Th>
                      <Th color='white'>Tanggal</Th>
                      <Th color='white'>Pemohon</Th>
                      <Th color='white'>Kategori Aset</Th>
                      <Th color='white'>Barang</Th>
                      <Th color='white'>Status</Th>
                      <Th color='white'></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>1</Td>
                      <Td>12:22 WIB, 11 Jan 2022</Td>
                      <Td>Bahtiar Subrata</Td>
                      <Td>Headphone</Td>
                      <Td>dBe DJ80 Foldable DJ...</Td>
                      <Td>
                        <Tag>Menunggu Persetujuan</Tag>
                      </Td>
                      <Td>
                        <ButtonTertier title='Details' onclick={handleOpen} />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>1</Td>
                      <Td>12:22 WIB, 11 Jan 2022</Td>
                      <Td>Bahtiar Subrata</Td>
                      <Td>Headphone</Td>
                      <Td>dBe DJ80 Foldable DJ...</Td>
                      <Td>
                        <Tag colorScheme='green'>Disetujui</Tag>
                      </Td>
                      <Td>
                        <ButtonTertier title='Details' onclick={handleOpen} />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>1</Td>
                      <Td>12:22 WIB, 11 Jan 2022</Td>
                      <Td>Bahtiar Subrata</Td>
                      <Td>Headphone</Td>
                      <Td>dBe DJ80 Foldable DJ...</Td>
                      <Td>
                        <Tag colorScheme='red'>Ditolak</Tag>
                      </Td>
                      <Td>
                        <ButtonTertier title='Details' onclick={handleOpen} />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              )}
            </Box>
            <Flex mt='10px' justifyContent='center'>
              <Pagination
                total={Math.ceil(20 / 5)}
                page={activePage}
                onChange={handlePage}
              />
            </Flex>
          </Box>
        </Box>
      </Box>
      <RequestModal isOpen={isOpenRequest} onClose={handleCloseRequest} />
      <ModalActivity
        isOpen={isOpen}
        onClose={handleClose}
        activity='history'
        role={1}
        status='Approved by Admin'
      />
    </div>
  );
};
