import React, { useEffect, useState } from "react";
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
    Tag,
} from "@chakra-ui/react";
import { Center, Pagination } from "@mantine/core";
import { ButtonTertier } from "../components/Button";
import { Header } from "../components/Header";
import { ModalActivity } from "../components/ModalActivity";
import { SegmentedControl } from "@mantine/core";
import moment from "moment";
import axios from "axios";
import { tableProcure, tableRequest } from "../types";
import { ModalProcure } from "../components/ModalActivity/Procure";

const PengadaanAset = () => {
    const [valueRadio, setValueRadio] = useState("all");
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
    const [all, setAll] = useState<any[]>();
    const idUser = localStorage.getItem("id");
    const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [countAll, setCountAll] = useState<number>(0);
    const [countWaiting, setCountWaiting] = useState<number>(0);
    const [countApproved, setCountApproved] = useState<number>(0);
    const [countRejected, setCountRejected] = useState<number>(0);

    let roles = localStorage.getItem("role");

    useEffect(() => {
            roleCondition();
        if (roles === "Administrator") {
            handleGetAllRequest();
        } else if (roles === "Manager") {
        }
    }, [activePage]);

    useEffect(() => {
        handleGetAllRequest();
    }, [valueRadio]);

    useEffect(() => {
        handleGetAll();
        handleGetWaiting();
        handleGetApproved();
        handleGetRejected();
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

    //Admin State
    const [requestData, setRequestData] = useState<tableProcure[]>();
    const [selectedData, setSelectedData] = useState<tableProcure>();
    const [isLoadingTable, setIsLoadingTable] = useState(true);
    const [selectedIdReq, setSelectedIdReq] = useState<number>(0);
    //End Admin State

    //Logic Administrator
    const handleOpen = (id: number) => {
        const filtering = requestData?.find((value) => value.id === id);
        setSelectedData(filtering);
        if (filtering !== undefined) {
          setSelectedIdReq(filtering?.id);
        }
        setIsOpen(true);
        console.log(filtering)
    };
    const handleClose = () => setIsOpen(false);

    const handleGetAllRequest = () => {
        setIsLoadingTable(true);
        axios
          .get(`/requests/admin/procure`, {
            params: {
              p: activePage,
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
            console.log("total: ", total_record);
            console.log("data: ", data);
            setIsLoadingTable(false);
          })
          .catch((err) => {
            console.log(err.response);
        });
    };

    const handleGetAll = () => {
        axios
          .get(`/requests/admin/procure`, {
            params: {
              s: "all",
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            const { total_record } = res.data;
            setCountAll(total_record);
            console.log("All: ", total_record);
          })
          .catch((err) => {
            console.log(err.response);
          });
      };
    
      const handleGetWaiting = () => {
        axios
          .get(`/requests/admin/procure`, {
            params: {
              s: "waiting-approval",
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            const { total_record } = res.data;
            setCountWaiting(total_record);
            console.log("Waiting: ", total_record);
          })
          .catch((err) => {
            console.log(err.response);
          });
      };
    
      const handleGetApproved = () => {
        axios
          .get(`/requests/admin/procure`, {
            params: {
              s: "approved",
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            const { total_record } = res.data;
            setCountApproved(total_record);
            console.log("Approved: ", total_record);
          })
          .catch((err) => {
            console.log(err.response);
          });
      };
    
      const handleGetRejected = () => {
        axios
          .get(`/requests/admin/procure`, {
            params: {
              s: "rejected",
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            const { total_record } = res.data;
            setCountRejected(total_record);
            console.log("Rejected: ", total_record);
          })
          .catch((err) => {
            console.log(err.response);
          });
      };

      const handleToManager = (id: number) => {
        axios
          .put(
            `/requests/procure/${id}`,
            {
              approved: true,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            const temp = selectedData;
            if (temp !== undefined) {
              setSelectedData({ ...temp, status: "Waiting approval from Manager" });
            }
            handleGetAllRequest();
          })
          .catch((err) => {
            console.log(err.response);
          });
      };
      //End of Logic Admin

    return(
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
                <Text textAlign='center'>Daftar Pengadaan Aset</Text>
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
                                    color={valueRadio === "all" ? "white" : "#222222"}>
                                    Semua Pengadaan
                                    </Box>
                                    <Box
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    ml='10px'
                                    bgColor={valueRadio === "all" ? "white" : "#222222"}
                                    borderRadius='20px'
                                    w='20px'
                                    h='20px'
                                    transition='all 0.5s ease'
                                    color={valueRadio === "all" ? "#3CA9DB" : "white"}>
                                    {countAll}
                                    </Box>
                                </Center>
                                ),
                                value: "all",
                            },
                            {
                                label: (
                                <Center>
                                    <Box
                                    transition='all 0.5s ease'
                                    color={
                                        valueRadio === "waiting-approval"
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
                                        valueRadio === "waiting-approval"
                                        ? "white"
                                        : "#222222"
                                    }
                                    borderRadius='20px'
                                    w='20px'
                                    h='20px'
                                    transition='all 0.5s ease'
                                    color={
                                        valueRadio === "waiting-approval"
                                        ? "#3CA9DB"
                                        : "white"
                                    }>
                                    {countWaiting}
                                    </Box>
                                </Center>
                                ),
                                value: "waiting-approval",
                            },
                            {
                                label: (
                                <Center>
                                    <Box
                                    transition='all 0.5s ease'
                                    color={
                                        valueRadio === "approved" ? "white" : "#222222"
                                    }>
                                    Diterima
                                    </Box>
                                    <Box
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    ml='10px'
                                    bgColor={
                                        valueRadio === "approved" ? "white" : "#222222"
                                    }
                                    borderRadius='20px'
                                    w='20px'
                                    h='20px'
                                    transition='all 0.5s ease'
                                    color={
                                        valueRadio === "approved" ? "#3CA9DB" : "white"
                                    }>
                                    {countApproved}
                                    </Box>
                                </Center>
                                ),
                                value: "approved",
                            },
                            {
                                label: (
                                <Center>
                                    <Box
                                    transition='all 0.5s ease'
                                    color={
                                        valueRadio === "rejected" ? "white" : "#222222"
                                    }>
                                    Ditolak
                                    </Box>
                                    <Box
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    ml='10px'
                                    bgColor={
                                        valueRadio === "rejected" ? "white" : "#222222"
                                    }
                                    borderRadius='20px'
                                    w='20px'
                                    h='20px'
                                    transition='all 0.5s ease'
                                    color={
                                        valueRadio === "rejected" ? "#3CA9DB" : "white"
                                    }>
                                    {countRejected}
                                    </Box>
                                </Center>
                                ),
                                value: "rejected",
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
                        <Th color='white'>Tanggal Pengajuan</Th>
                        <Th color='white'>Jenis Aktivitas</Th>
                        <Th color='white'>Kategori Aset</Th>
                        <Th color='white'>Deskripsi</Th>
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
                            <Skeleton>Tanggal Pengajuan</Skeleton>
                            </Td>
                            <Td>
                            <Skeleton>Jenis Aktivitas</Skeleton>
                            </Td>
                            <Td>
                            <Skeleton>Kategori Aset</Skeleton>
                            </Td>
                            <Td>
                            <Skeleton>Deskripsi</Skeleton>
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
                                    <Skeleton>Tanggal Pengajuan</Skeleton>
                                    </Td>
                                    <Td>
                                    <Skeleton>Jenis Aktivitas</Skeleton>
                                    </Td>
                                    <Td>
                                    <Skeleton>Kategori Aset</Skeleton>
                                    </Td>
                                    <Td>
                                    <Skeleton>Deskripsi</Skeleton>
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
                                    <Td>{value.activity}</Td>
                                    <Td>{value.category}</Td>
                                    <Td>
                                        {`${value.description.substring(0, 20)}+..`}
                                    </Td>
                                    <Td>
                                        <Tag>{value.status}</Tag>
                                    </Td>
                                    <Td>
                                        <ButtonTertier
                                        title='Details'
                                        onclick={()=>handleOpen(value.id)}
                                        />
                                    </Td>
                                    </Tr>
                                ))
                                ) : (
                                <Tr>
                                    <Td>
                                        <Skeleton>No</Skeleton>
                                    </Td>
                                    <Td>
                                        <Skeleton>Tanggal Pengajuan</Skeleton>
                                    </Td>
                                    <Td>
                                        <Skeleton>Jenis Aktivitas</Skeleton>
                                    </Td>
                                    <Td>
                                        <Skeleton>Kategori Aset</Skeleton>
                                    </Td>
                                    <Td>
                                        <Skeleton>Deskripsi</Skeleton>
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
            <ModalProcure 
            isOpen={isOpen} 
            onClose={handleClose} 
            role={role} 
            data={selectedData}
            />
        </div>
    )
}
export default PengadaanAset;