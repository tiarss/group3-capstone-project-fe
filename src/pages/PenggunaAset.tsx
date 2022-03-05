import {
  Box,
  Flex,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Tag
} from "@chakra-ui/react";
import { Center, Pagination } from "@mantine/core";
import { ButtonTertier } from "../components/Button";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { ModalActivity } from "../components/ModalActivity";
import { SegmentedControl } from "@mantine/core";
import moment from "moment";
import axios from "axios";
import { tableRequest } from "../types";

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
  const [totalData, setTotalData] = useState(0);
  const [role, setRole] = useState(1);
  const idUser = localStorage.getItem("id");
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let roles = localStorage.getItem("role");

  useEffect(() => {
    roleCondition();
    if (roles === "Administrator") {
      handleGetAllRequest();
    } else if (roles === "Manager") {
    }
  }, [activePage]);

  useEffect(() => {}, [valueRadio]);

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
  //Admin State
  const [requestData, setRequestData] = useState<tableRequest[]>();
  const [selectedData, setSelectedData] = useState<tableRequest>();
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [selectedIdReq, setSelectedIdReq] = useState<number>(0);
  //End Admin State

  //Logic Administrator

  const handleGetAllRequest = () => {
    const pageView = (activePage - 1) * 5 + 1;
    setIsLoadingTable(true);
    axios
      .get("/requests/admin", {
        params: {
          p: pageView,
          rp: 5,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        const { total_record } = res.data;
        setRequestData(data);
        setTotalData(total_record);
        console.log(total_record);
        console.log(data);
        setIsLoadingTable(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  //End of Logic Admin

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
                    borderRadius: "5px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  },
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
                            valueRadio === "Digunakan" ? "white" : "#222222"
                          }>
                          Digunakan
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          ml='10px'
                          bgColor={
                            valueRadio === "Digunakan" ? "white" : "#222222"
                          }
                          borderRadius='20px'
                          w='20px'
                          h='20px'
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "Digunakan" ? "#3CA9DB" : "white"
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
                            valueRadio === "Ditolak" ? "white" : "#222222"
                          }>
                          Ditolak
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          ml='10px'
                          bgColor={
                            valueRadio === "Ditolak" ? "white" : "#222222"
                          }
                          borderRadius='20px'
                          w='20px'
                          h='20px'
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "Ditolak" ? "#3CA9DB" : "white"
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
                            valueRadio === "Dikembalikan" ? "white" : "#222222"
                          }>
                          Dikembalikan
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          ml='10px'
                          bgColor={
                            valueRadio === "Dikembalikan" ? "white" : "#222222"
                          }
                          borderRadius='20px'
                          w='20px'
                          h='20px'
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "Dikembalikan" ? "#3CA9DB" : "white"
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
          <Box bgColor='white' p='50px 20px 20px' borderRadius='10px'>
            <Table minW='800px' size='sm' borderRadius='20px'>
              <Thead bgColor='blue.500'>
                <Tr>
                  <Th color='white'>No</Th>
                  <Th color='white'>Tanggal Permohonan</Th>
                  <Th color='white'>Tanggal Pengembalian</Th>
                  <Th color='white'>Kategori Aset</Th>
                  <Th color='white'>Barang</Th>
                  <Th color='white'>Sisa Waktu</Th>
                  <Th color='white'>Status</Th>
                  <Th color='white'></Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoadingTable ? (
                  <Tr>
                    <Td>
                      <Skeleton>No</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton>Tanggal Permohonan</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton>Tanggal Pengembalian</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton>Kategori Aset</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton>Barang</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton>Sisa Waktu</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton>Status</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton></Skeleton>
                    </Td>
                  </Tr>
                ) : (
                  <>
                    {requestData === null ? (
                      <Tr>
                        <Td>
                          <Skeleton>No</Skeleton>
                        </Td>
                        <Td>
                          <Skeleton>Tanggal Permohonan</Skeleton>
                        </Td>
                        <Td>
                          <Skeleton>Tanggal Pengembalian</Skeleton>
                        </Td>
                        <Td>
                          <Skeleton>Kategori Aset</Skeleton>
                        </Td>
                        <Td>
                          <Skeleton>Barang</Skeleton>
                        </Td>
                        <Td>
                          <Skeleton>Sisa Waktu</Skeleton>
                        </Td>
                        <Td>
                          <Skeleton>Status</Skeleton>
                        </Td>
                        <Td>
                          <Skeleton></Skeleton>
                        </Td>
                      </Tr>
                    ) : (
                      <>
                        {requestData !== undefined ? (
                          requestData.map((value, index) => (
                            <Tr key={value.id}>
                              <Td>{(activePage - 1) * 5 + index + 1}</Td>
                              <Td>
                                {moment(value.request_time).format(
                                  "h:mm a, DD MMM YYYY"
                                )}
                              </Td>
                              <Td>
                                {moment(value.return_time).format(
                                  "h:mm a, DD MMM YYYY"
                                )}
                              </Td>
                              <Td>{value.Asset.category}</Td>
                              <Td>
                                {`${value.Asset.name.substring(0, 20)}+..`}
                              </Td>
                              <Td>Sisa Waktu</Td>
                              <Td>
                                <Tag>{value.status}</Tag>
                              </Td>
                              <Td><ButtonTertier
                                  title='Details'
                                  onclick={handleOpen}
                                /></Td>
                            </Tr>
                          ))
                        ) : (
                          <Tr>
                            <Td>
                              <Skeleton>No</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Tanggal Permohonan</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Tanggal Pengembalian</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Kategori Aset</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Barang</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Sisa Waktu</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Status</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton></Skeleton>
                            </Td>
                          </Tr>
                        )}
                      </>
                    )}
                  </>
                )}
              </Tbody>
            </Table>
            <Flex mt='10px' justifyContent='center'>
              <Pagination
                total={Math.ceil(totalData / 5)}
                page={activePage}
                onChange={handlePage}
              />
            </Flex>
          </Box>
        </Box>
      </Box>
      <ModalActivity
        isOpen={isOpen}
        onClose={handleClose}
        role={1}
      />
    </div>
  );
};
