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
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  TableCaption,
  useToast,
} from "@chakra-ui/react";
import { Center, Pagination } from "@mantine/core";
import { ButtonTertier } from "../components/Button";
import { Header } from "../components/Header";
import { SegmentedControl } from "@mantine/core";
import moment from "moment";
import axios from "axios";
import { tableProcure } from "../types";
import { ModalProcure } from "../components/ModalActivity/Procure";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { InputText } from "../components/Input";
import { useNavigate } from "react-router-dom";

const PengadaanAset = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [valueRadio, setValueRadio] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [role, setRole] = useState(1);
  const [all, setAll] = useState<any[]>();
  const idUser = localStorage.getItem("id");
  const dummy = [1, 2, 3, 4, 5];
  //Count Number Status
  const [countAll, setCountAll] = useState<number>(0);
  const [countWaiting, setCountWaiting] = useState<number>(0);
  const [countApproved, setCountApproved] = useState<number>(0);
  const [countRejected, setCountRejected] = useState<number>(0);
  //Admin State
  const [requestData, setRequestData] = useState<tableProcure[]>();
  const [selectedData, setSelectedData] = useState<tableProcure>();
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [selectedIdReq, setSelectedIdReq] = useState<number>(0);
  const [order, setOrder] = useState("recent");
  const [category, setCategory] = useState("all");
  const [dates, setDates] = useState<string>("");
  const [reloadNumber, setReloadNumber] = useState(0)
  //End Admin State

  let roles = localStorage.getItem("role");

  useEffect(() => {
    roleCondition();
    if (roles === "Administrator") {
      handleGetAllRequest();
    } else if (roles === "Manager") {
      handleGetManagerAllRequest();
    }
  }, [activePage, order, valueRadio, category, dates]);

  useEffect(() => {
    if (roles === "Administrator") {
      handleGetAll();
      handleGetWaiting();
      handleGetApproved();
      handleGetRejected();
    } else if (roles === "Manager") {
      handleGetManagerAllRequest();
      handleGetManagerAll();
      handleGetManagerWaiting();
      handleGetManagerApproved();
      handleGetManagerRejected();
    }
  }, [activePage, order, valueRadio, category, dates, reloadNumber]);

  const logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    localStorage.setItem("id", "");
    localStorage.setItem("isAuth", JSON.stringify(false));
  };

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
    setPage(value);
  };

  //Logic Administrator
  const handleOpen = (id: number) => {
    const filtering = requestData?.find((value) => value.id === id);
    setSelectedData(filtering);
    if (filtering !== undefined) {
      setSelectedIdReq(filtering?.id);
    }
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const handleGetAllRequest = () => {
    setIsLoadingTable(true);
    axios
      .get(`/requests/admin/procure`, {
        params: {
          p: activePage,
          rp: 5,
          o: order,
          s: valueRadio,
          c: category,
          d: dates,
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
        setIsLoadingTable(false);
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
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
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
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
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
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
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
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
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      });
  };

  const selectAscend = () => {
    setOrder("old");
  };

  const selectDescend = () => {
    setOrder("recent");
  };

  const selectCategoryAll = () => {
    setCategory("all");
    setPage(1);
  };

  const selectCategoryCom = () => {
    setCategory("computer");
    setPage(1);
  };

  const selectCategoryComAcc = () => {
    setCategory("computer-accessories");
    setPage(1);
  };

  const selectCategoryNet = () => {
    setCategory("networking");
    setPage(1);
  };

  const selectCategoryUPS = () => {
    setCategory("ups");
    setPage(1);
  };

  const selectCategoryPrintScan = () => {
    setCategory("printer-scanner");
    setPage(1);
  };

  const selectCategoryElec = () => {
    setCategory("electronics");
    setPage(1);
  };

  const selectCategoryOther = () => {
    setCategory("others");
    setPage(1);
  };

  const handleActivePage = () => {
    setPage(1);
  };

  //End of Logic Admin

  //Manager Logic
  const handleGetManagerAllRequest = () => {
    setIsLoadingTable(true);
    axios
      .get(`/requests/manager/procure`, {
        params: {
          p: activePage,
          rp: 5,
          o: order,
          s: valueRadio,
          c: category,
          d: dates,
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
        setIsLoadingTable(false);
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      });
  };

  const handleGetManagerAll = () => {
    axios
      .get(`/requests/manager/procure`, {
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
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      });
  };

  const handleGetManagerWaiting = () => {
    axios
      .get(`/requests/manager/procure`, {
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
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      });
  };

  const handleGetManagerApproved = () => {
    axios
      .get(`/requests/manager/procure`, {
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
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      });
  };

  const handleGetManagerRejected = () => {
    axios
      .get(`/requests/manager/procure`, {
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
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      });
  };

  const handleAcceptReqManager = (id: number) => {
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
        const { data } = res;
        if (data.code === 200) {
          toast({
            title: "Berhasil Menerima Permintaan Pengadaan Aset",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, status: "Approved by Manager" });
        }
        setReloadNumber(reloadNumber+1)
        handleGetManagerAllRequest();
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      });
  };

  const handleRejectReqManager = (id: number) => {
    axios
      .put(
        `/requests/procure/${id}`,
        {
          approved: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const { data } = res;
        if (data.code === 200) {
          toast({
            title: "Berhasil Menolak Permintaan Peminjaman Aset",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, status: "Rejected by Manager" });
        }
        setReloadNumber(reloadNumber+1)
        handleGetManagerAllRequest();
      })
      .catch((err) => {
        const {data} = err.response
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if(data.message === "missing or malformed jwt"){
          logOut();
          toast({
            title: `Sign In Error`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      });
  };
  //End of Logic Manager

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPage(1)
    setDates(value);
  };

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
          <Text textAlign='center' fontSize="24px" fontWeight="bold">Pengadaan Aset</Text>
          <Text textAlign='center' fontSize="14px">Berisi Informasi Permintaan Pengadaan Aset</Text>
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
                      <Center onClick={handleActivePage}>
                        <Box
                          transition='all 0.5s ease'
                          color={valueRadio === "all" ? "white" : "#222222"}>
                          {role === 2 ? "Semua Pengadaan" : "Semua Permohonan"}
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
                      <Center onClick={handleActivePage}>
                        <Box
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "waiting-approval"
                              ? "white"
                              : "#222222"
                          }>
                          {role === 2 ? "Permohonan Baru" : "Butuh Persetujuan"}
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
                      <Center onClick={handleActivePage}>
                        <Box
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "approved" ? "white" : "#222222"
                          }>
                          {role === 2 ? "Diterima" : "Disetujui"}
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
                      <Center onClick={handleActivePage}>
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
          <Box bgColor='white' p='20px' borderRadius='10px' minH="500px">
            <Flex justify="start">
              <Box width="300px" my="10px">
                <InputText
                  type='date'
                  title='Filter Tanggal'
                  onChange={handleDate}
                />
              </Box>
            </Flex>
            <Table minW='800px' size='sm' borderRadius='20px'>
              <TableCaption>
                {requestData === null ? "Tidak ada Data" : ""}
              </TableCaption>
              <Thead bgColor='blue.500'>
                <Tr>
                  <Th color='white'>No</Th>
                  <Th color='white'>
                    <Menu>
                      <MenuButton
                        as={Button}
                        size='sm'
                        colorScheme='blue'
                        fontSize='12px'
                        rightIcon={<ChevronDownIcon />}>
                        TANGGAL PENGAJUAN
                      </MenuButton>
                      <MenuList color='blue.500'>
                        <MenuItem onClick={selectAscend}>Oldest</MenuItem>
                        <MenuItem onClick={selectDescend}>Recent</MenuItem>
                      </MenuList>
                    </Menu>
                  </Th>
                  <Th color='white'>Jenis Aktivitas</Th>
                  <Th color='white'>
                    <Menu>
                      <MenuButton
                        as={Button}
                        size='sm'
                        colorScheme='blue'
                        fontSize='12px'
                        rightIcon={<ChevronDownIcon />}>
                        KATEGORI ASET
                      </MenuButton>
                      <MenuList color='blue.500'>
                        <MenuItem onClick={selectCategoryAll}>Semua</MenuItem>
                        <MenuItem onClick={selectCategoryCom}>
                          Computer
                        </MenuItem>
                        <MenuItem onClick={selectCategoryComAcc}>
                          Computer Accessories
                        </MenuItem>
                        <MenuItem onClick={selectCategoryNet}>
                          Networking
                        </MenuItem>
                        <MenuItem onClick={selectCategoryUPS}>UPS</MenuItem>
                        <MenuItem onClick={selectCategoryPrintScan}>
                          Printer and Scanner
                        </MenuItem>
                        <MenuItem onClick={selectCategoryElec}>
                          Electronics
                        </MenuItem>
                        <MenuItem onClick={selectCategoryOther}>
                          Others
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Th>
                  <Th color='white'>Deskripsi</Th>
                  <Th color='white'>Status</Th>
                  <Th color='white'></Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoadingTable ? (
                  <>
                    {dummy.map((value) => (
                      <Tr key={value}>
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
                          <Skeleton> <Tag
                            size='md'
                            variant='subtle'
                            colorScheme="orange">
                          </Tag>Diterima</Skeleton>
                        </Td>
                        <Td>
                          <Skeleton></Skeleton>
                        </Td>
                      </Tr>
                    ))}
                  </>
                ) : requestData === null ? (
                  <></>
                ) : requestData !== undefined ? (
                  requestData.map((value, index) => (
                    <Tr key={value.id}>
                      <Td>{(activePage - 1) * 5 + index + 1}</Td>
                      <Td>
                        {moment(value.request_time).format(
                          "DD MMM YYYY, h:mm A"
                        )}
                      </Td>
                      <Td>{value.activity}</Td>
                      <Td>{value.category}</Td>
                      <Td>{`${value.description.substring(0, 20)}+..`}</Td>
                      <Td>
                        <Td>
                          <Tag
                            size='md'
                            variant='subtle'
                            colorScheme={
                              value.status.includes("Approved")
                                ? "whatsapp"
                                : value.status.includes("Waiting")
                                ? "orange"
                                : "red"
                            }>
                            {value.status === "Waiting approval from Manager"
                              ? "Menunggu Persetujuan"
                              : value.status === "Approved by Manager"
                              ? "Disetujui"
                              : value.status === "Rejected by Manager"
                              ? "Ditolak"
                              : "Tidak Diketahui"}
                          </Tag>
                        </Td>
                      </Td>
                      <Td>
                        <ButtonTertier
                          title='Details'
                          onclick={() => handleOpen(value.id)}
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

                {/* {isLoadingTable ? (
                  <>
                    {dummy.map((value) => (
                      <Tr key={value}>
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
                    ))}
                  </>
                ) : (
                  requestData === null ? (
                      <></>
                    ) : (
                      requestData !== undefined ? (
                          requestData.map((value, index) => (
                            <Tr key={value.id}>
                              <Td>{(activePage - 1) * 5 + index + 1}</Td>
                              <Td>
                                {moment(value.request_time).format(
                                  "DD MMM YYYY, h:mm A"
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
                                  onclick={() => handleOpen(value.id)}
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
                ) : (
                  <>
                    {requestData === null ? (
                      <></>
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
                                <Tag
                                  size='md'
                                  variant='subtle'
                                  colorScheme={
                                    value.status.includes("Approved")
                                      ? "whatsapp"
                                      : value.status.includes("Waiting")
                                      ? "orange"
                                      : "red"
                                  }>
                                  {value.status ===
                                  "Waiting approval from Manager"
                                    ? "Menunggu Persetujuan"
                                    : value.status === "Approved by Manager"
                                    ? "Disetujui"
                                    : value.status === "Rejected by Manager"
                                    ? "Ditolak"
                                    : "Tidak Diketahui"}
                                </Tag>
                              </Td>
                              <Td>
                                <ButtonTertier
                                  title='Details'
                                  onclick={() => handleOpen(value.id)}
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
                )} */}
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
        handleAcceptReqProcure={() => handleAcceptReqManager(selectedIdReq)}
        handleRejectReqProcure={() => handleRejectReqManager(selectedIdReq)}
      />
    </div>
  );
};
export default PengadaanAset;
//                           </Tr>
//                         )}
//                       </>
//                     )}
//                   </>
//                 )}
//               </Tbody>
//             </Table>
//             <Flex mt='10px' justifyContent='center'>
//               <Pagination
//                 total={Math.ceil(totalData / 5)}
//                 page={activePage}
//                 onChange={handlePage}
//               />
//             </Flex>
//           </Box>
//         </Box>
//       </Box>
//       <ModalProcure
//         isOpen={isOpen}
//         onClose={handleClose}
//         role={role}
//         data={selectedData}
//       />
//     </div>
//   );
// };
// export default PengadaanAset;
