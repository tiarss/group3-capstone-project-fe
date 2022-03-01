import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Center, Pagination } from "@mantine/core";
import { ButtonTertier } from "../components/Button";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { ModalActivity } from "../components/ModalActivity";
import { SegmentedControl } from "@mantine/core";

export const PenggunaAset = () => {
  const [valueRadio, setValueRadio] = useState("Semua Pengguna");
  const [countData, setCountData] = useState({
    all: 23,
    new: 10,
    used: 10,
    rejected: 1,
    returned: 2,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setPage] = useState(1);

  useEffect(() => {}, [valueRadio]);

  const handlePage = (value: number) => {
    console.log(value);
    setPage(value);
  };
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

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
        <Box mb='50px'>
          <Text textAlign='center'>Daftar Pengguna Aset</Text>
        </Box>
        <Box position='relative'>
          <Flex justifyContent='center'>
            <Box w='fit-content' position='absolute' top='-25px'>
              <SegmentedControl
                transitionDuration={500}
                transitionTimingFunction='linear'
                styles={{
                  active: {
                    backgroundColor: "#3CA9DB",
                    // transition: "all 0.5s ease",
                  },
                  root: {
                    backgroundColor: "white",
                    borderRadius:"5px",
                    boxShadow:'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                  }
                }}
                value={valueRadio}
                onChange={setValueRadio}
                data={[
                  {
                    label: (
                      <Center>
                        <Box
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "Semua Pengguna"
                              ? "white"
                              : "#222222"
                          }>
                          Semua Pengguna
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          ml='10px'
                          bgColor={
                            valueRadio === "Semua Pengguna"
                              ? "white"
                              : "#222222"
                          }
                          borderRadius='20px'
                          w='20px'
                          h='20px'
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "Semua Pengguna"
                              ? "#3CA9DB"
                              : "white"
                          }>
                          {countData.all}
                        </Box>
                      </Center>
                    ),
                    value: "Semua Pengguna",
                  },
                  {
                    label: (
                      <Center>
                        <Box
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "Permohonan Baru"
                              ? "white"
                              : "#222222"
                          }>
                          Permohonan Baru
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          ml='10px'
                          bgColor={
                            valueRadio === "Permohonan Baru"
                              ? "white"
                              : "#222222"
                          }
                          borderRadius='20px'
                          w='20px'
                          h='20px'
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "Permohonan Baru"
                              ? "#3CA9DB"
                              : "white"
                          }>
                          {countData.new}
                        </Box>
                      </Center>
                    ),
                    value: "Permohonan Baru",
                  },
                  {
                    label: (
                      <Center>
                      <Box
                        transition='all 0.5s ease'
                        color={
                          valueRadio === "Digunakan"
                            ? "white"
                            : "#222222"
                        }>
                        Digunakan
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        ml='10px'
                        bgColor={
                          valueRadio === "Digunakan"
                            ? "white"
                            : "#222222"
                        }
                        borderRadius='20px'
                        w='20px'
                        h='20px'
                        transition='all 0.5s ease'
                        color={
                          valueRadio === "Digunakan"
                            ? "#3CA9DB"
                            : "white"
                        }>
                        {countData.used}
                      </Box>
                    </Center>
                    ),
                    value: "Digunakan",
                  },
                  {
                    label: (
                      <Center>
                      <Box
                        transition='all 0.5s ease'
                        color={
                          valueRadio === "Ditolak"
                            ? "white"
                            : "#222222"
                        }>
                        Ditolak
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        ml='10px'
                        bgColor={
                          valueRadio === "Ditolak"
                            ? "white"
                            : "#222222"
                        }
                        borderRadius='20px'
                        w='20px'
                        h='20px'
                        transition='all 0.5s ease'
                        color={
                          valueRadio === "Ditolak"
                            ? "#3CA9DB"
                            : "white"
                        }>
                        {countData.rejected}
                      </Box>
                    </Center>
                    ),
                    value: "Ditolak",
                  },
                  {
                    label: (
                      <Center>
                      <Box
                        transition='all 0.5s ease'
                        color={
                          valueRadio === "Dikembalikan"
                            ? "white"
                            : "#222222"
                        }>
                        Dikembalikan
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        ml='10px'
                        bgColor={
                          valueRadio === "Dikembalikan"
                            ? "white"
                            : "#222222"
                        }
                        borderRadius='20px'
                        w='20px'
                        h='20px'
                        transition='all 0.5s ease'
                        color={
                          valueRadio === "Dikembalikan"
                            ? "#3CA9DB"
                            : "white"
                        }>
                        {countData.returned}
                      </Box>
                    </Center>
                    ),
                    value: "Dikembalikan",
                  },
                ]}
              />
            </Box>
          </Flex>
          <Box bgColor='white' p='50px 20px 20px'>
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
            <Box mt='20px'>
              <Pagination
                total={Math.ceil(20 / 5)}
                page={activePage}
                onChange={handlePage}
              />
            </Box>
          </Box>
        </Box>
      </Box>
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
