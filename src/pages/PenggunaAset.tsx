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
  TableCaption,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useToast,
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
import { InputText } from "../components/Input";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const PenggunaAset = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [valueRadio, setValueRadio] = useState("all");
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
  const [countReturned, setCountReturned] = useState<number>(0);
  const [countWaitingReturn, setCountWaitingReturn] = useState<number>(0);

   //Admin State
   const [requestData, setRequestData] = useState<tableRequest[]>();
   const [selectedData, setSelectedData] = useState<tableRequest>();
   const [isLoadingTable, setIsLoadingTable] = useState(true);
   const [selectedIdReq, setSelectedIdReq] = useState<number>(0);
   const [activity, setActivity] = useState<string>("borrow");
   const [order, setOrder] = useState("recent");
   const [category, setCategory] = useState("all");
   const [dates, setDates] = useState<string>("");
   const [reloadNumber, setReloadNumber] = useState(0);
   //End Admin State

  let roles = localStorage.getItem("role");

  const logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    localStorage.setItem("id", "");
    localStorage.setItem("isAuth", JSON.stringify(false));
  };

  useEffect(() => {
    roleCondition();
    if (roles === "Administrator") {
      handleGetAllRequest();
    } else if (roles === "Manager") {
      handleGetAllManagerRequest();
    }else{
      navigate("/not-found")
    }
  }, [activePage, valueRadio, order, category, dates,reloadNumber]);

  useEffect(() => {
    if (roles === "Administrator") {
      handleGetAll();
      handleGetWaiting();
      handleGetWaitingReturn();
      handleGetApproved();
      handleGetRejected();
      handleGetReturned();
    } else if (roles === "Manager") {
      handleGetManagerAll();
      handleGetManagerWaiting();
      handleGetManagerApproved();
      handleGetManagerRejected();
      handleGetManagerReturned();
    }else{
      navigate("/not-found")
    }
  }, [activePage, order, valueRadio, category, dates, reloadNumber]);

  const roleCondition = () => {
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
    console.log(filtering)
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  const handleSelectReturn = () => {
    setActivity("return")
    setPage(1)
  }
  
  const handleSelectBorrow = () => {
    setActivity("borrow")
    setPage(1)
  }

  const handleGetAllRequest = () => {
    setIsLoadingTable(true);
    const status = valueRadio === "waiting-approvals" ? "" : valueRadio;
    axios
      .get(`/requests/admin/borrow`, {
        params: {
          p: activePage,
          rp: 5,
          o: order,
          s: status,
          a: activity,
          c: category,
          d: dates
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        const { total_record } = res.data;
        console.log(data)
        setRequestData(data);
        setTotalData(total_record);
        setIsLoadingTable(false);
      })
      .catch((err) => {
        const { data } = err.response;
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
      .get(`/requests/admin/borrow`, {
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
        console.log(err.response);
      });
  };

  const handleGetWaiting = () => {
    axios
      .get(`/requests/admin/borrow`, {
        params: {
          s: "waiting-approval",
          a: "borrow"
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
        console.log(err.response);
      });
  };

  const handleGetWaitingReturn = () => {
    axios
      .get(`/requests/admin/borrow`, {
        params: {
          s: "waiting-approval",
          a: "return"
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { total_record } = res.data;
        setCountWaitingReturn(total_record);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleGetApproved = () => {
    axios
      .get(`/requests/admin/borrow`, {
        params: {
          s: "approved",
          a: "borrow"
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
        console.log(err.response);
      });
  };

  const handleGetRejected = () => {
    axios
      .get(`/requests/admin/borrow`, {
        params: {
          s: "rejected",
          a: "borrow"
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
        console.log(err.response);
      });
  };

  const handleGetReturned = () => {
    axios
      .get(`/requests/admin/borrow`, {
        params: {
          s: "returned",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { total_record } = res.data;
        setCountReturned(total_record);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleToManager = (id: number) => {
    axios
      .put(
        `/requests/borrow/${id}`,
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

  const handleAcceptReqAdmin = (id: number) => {
    axios
      .put(
        `/requests/borrow/${id}`,
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
            title: "Berhasil Menerima Permintaan Peminjaman Aset",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }

        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, status: "Approved by Admin" });
        }
        setReloadNumber(reloadNumber+1);
        handleGetAllRequest();
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

  const handleAcceptReturn = (id: number) => {
    axios
      .put(
        `/requests/borrow/${id}`,
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
            title: "Berhasil Menerima Pengembalian Aset",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, status: "Approved by Admin" });
        }
        setReloadNumber(reloadNumber+1);
        handleGetAllRequest();
      })
      .catch((err) => {
        const { data } = err.response;
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

  const handleRejectReqAdmin = (id: number) => {
    axios
      .put(
        `/requests/borrow/${id}`,
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
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, status: "Rejected by Admin" });
        }
        setReloadNumber(reloadNumber+1);
        handleGetAllRequest();
      })
      .catch((err) => {
        const { data } = err.response;
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

  const handleAjukanPengembalian = (id: number) => {
    axios
      .put(
        `/requests/return/${id}`,
        {
          askingreturn: true,
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
            title: "Berhasil Mengajukan Pengembalian",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, activity: "Request to Return" });
        }
        setReloadNumber(reloadNumber+1);
        handleGetAllRequest();
      })
      .catch((err) => {
        const { data } = err.response;
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
  //End of Logic Admin

  //Manager Logic
  const handleGetAllManagerRequest = () => {
    setIsLoadingTable(true);
    axios
      .get(`/requests/manager/borrow?p=${activePage}&rp=${5}&o=${order}&s=${valueRadio}&c=${category}&d=${dates}`, {
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
      });
  };

  const handleGetManagerAll = () => {
    axios
      .get(`/requests/manager/borrow`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { total_record } = res.data;
        setCountAll(total_record);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleGetManagerWaiting = () => {
    axios
      .get(`/requests/manager/borrow?s=waiting-approval`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { total_record } = res.data;
        setCountWaiting(total_record);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleGetManagerApproved = () => {
    axios
      .get(`/requests/manager/borrow?s=approved`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { total_record } = res.data;
        setCountApproved(total_record);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleGetManagerRejected = () => {
    axios
      .get(`/requests/manager/borrow?s=rejected`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { total_record } = res.data;
        setCountRejected(total_record);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleGetManagerReturned = () => {
    axios
      .get(`/requests/manager/borrow?s=returned`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { total_record } = res.data;
        setCountReturned(total_record);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleAcceptReqManager = (id: number) => {
    axios
      .put(
        `/requests/borrow/${id}`,
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
            title: "Berhasil Menerima Permintaan Peminjaman Aset",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, status: "Approved by Manager" });
        }
        setReloadNumber(reloadNumber+1);
        handleGetAllRequest();
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
        `/requests/borrow/${id}`,
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
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, status: "Rejected by Manager" });
        }
        setReloadNumber(reloadNumber+1);
        handleGetAllRequest();
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

  const handleDate= (e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value
    setDates(value);
  }

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
    setCategory("printer-and-scanner");
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
          <Text textAlign='center' fontSize="24px" fontWeight="bold">{role === 2 ? "Pengguna Aset" : "Permintaan Permohonan"}</Text>
          <Text textAlign='center' fontSize="14px">{role === 2 ? "Berisi Informasi Pengguna Aset" : "Berisi Informasi Permintaan Permohonan"}</Text>
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
                data={ role===2 ? [
                  {
                    label: (
                      <Center onClick={handleSelectBorrow}>
                        <Box
                          transition='all 0.5s ease'
                          color={valueRadio === "all" ? "white" : "#222222"}>
                          Semua Pengguna
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
                      <Center onClick={handleSelectBorrow}>
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
                      <Center onClick={handleSelectReturn}>
                        <Box
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "waiting-approvals"
                              ? "white"
                              : "#222222"
                          }>
                          Permohonan Pengembalian
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          ml='10px'
                          bgColor={
                            valueRadio === "waiting-approvals"
                              ? "white"
                              : "#222222"
                          }
                          borderRadius='20px'
                          w='20px'
                          h='20px'
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "waiting-approvals"
                              ? "#3CA9DB"
                              : "white"
                          }>
                          {countWaitingReturn}
                        </Box>
                      </Center>
                    ),
                    value: "waiting-approvals",
                  },
                  {
                    label: (
                      <Center onClick={handleSelectBorrow}>
                        <Box
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "approved" ? "white" : "#222222"
                          }>
                          Digunakan
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
                      <Center onClick={handleSelectBorrow}>
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
                  {
                    label: (
                      <Center onClick={handleSelectBorrow}>
                        <Box
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "returned" ? "white" : "#222222"
                          }>
                          Dikembalikan
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          ml='10px'
                          bgColor={
                            valueRadio === "returned" ? "white" : "#222222"
                          }
                          borderRadius='20px'
                          w='20px'
                          h='20px'
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "returned" ? "#3CA9DB" : "white"
                          }>
                          {countReturned}
                        </Box>
                      </Center>
                    ),
                    value: "returned",
                  },
                ] : [
                  {
                    label: (
                      <Center>
                        <Box
                          transition='all 0.5s ease'
                          color={valueRadio === "all" ? "white" : "#222222"}>
                          Semua Permohonan
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
                          Butuh Persetujuan
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
                          Disetujui
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
                  {
                    label: (
                      <Center onClick={handleSelectBorrow}>
                        <Box
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "returned" ? "white" : "#222222"
                          }>
                          Dikembalikan
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          ml='10px'
                          bgColor={
                            valueRadio === "returned" ? "white" : "#222222"
                          }
                          borderRadius='20px'
                          w='20px'
                          h='20px'
                          transition='all 0.5s ease'
                          color={
                            valueRadio === "returned" ? "#3CA9DB" : "white"
                          }>
                          {countReturned}
                        </Box>
                      </Center>
                    ),
                    value: "returned",
                  },
                ]}
              />
            </Box>
          </Flex>
          <Box bgColor='white' minHeight="500px" p='50px 20px 20px' borderRadius='10px' overflow="auto">
            <Flex align="center" justify="start" marginTop={3} marginEnd={5}>
              <Box width="300px" my="10px">
                <InputText type="date" title="Filter Tanggal" onChange={handleDate}/>
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
                        TANGGAL PERMOHONAN
                      </MenuButton>
                      <MenuList color='blue.500'>
                        <MenuItem onClick={selectAscend}>Oldest</MenuItem>
                        <MenuItem onClick={selectDescend}>Recent</MenuItem>
                      </MenuList>
                    </Menu>
                    </Th>
                  <Th color='white'>
                    Tanggal Pengembalian
                  </Th>
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
                  <Th color='white'>Barang</Th>
                  {/* <Th color='white'>Sisa Waktu</Th> */}
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
                    {/* <Td>
                      <Skeleton>Sisa Waktu</Skeleton>
                    </Td> */}
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
                      <>
                      </>
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
                                { 
                                value.activity === "Borrow" ? 
                                  value.status === "Approved by Admin" 
                                  ? "Belum Dikembalikan"
                                  : "-"
                                : value.status === "Waiting approval" 
                                ? "Menunggu Konfirmasi Admin" 
                                : moment(value.return_time).format(
                                  "h:mm a, DD MMM YYYY"
                                )}
                              </Td>
                              <Td>{value.Asset.category}</Td>
                              <Td>
                                {`${value.Asset.name.substring(0, 20)}+..`}
                              </Td>
                              {/* <Td>Sisa Waktu</Td> */}
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
                                  }
                                >
                                  {role === 3 ?
                                    value.activity==="Borrow" ? 
                                      value.status === "Waiting approval from Manager" 
                                      ? "Menunggu Persetujuan" : 
                                      value.status === "Approved by Manager" 
                                      ? "Disetujui" :
                                      value.status === "Rejected by Manager"
                                      ? "Ditolak" : "Tidak Diketahui"
                                    : "Dikembalikan"
                                  : 
                                    value.activity==="Borrow" ? 
                                      value.status === "Waiting approval from Manager" 
                                      ? "Menunggu Persetujuan Manager" :
                                      value.status === "Waiting approval from Admin" 
                                      ? "Menunggu Persetujuan Admin" :  
                                      value.status === "Approved by Admin" 
                                      ? "Disetujui" :
                                      value.status === "Approved by Manager" 
                                      ? "Menunggu Persetujuan Admin" :
                                      value.status === "Rejected by Manager"
                                      ? "Ditolak Manager" : 
                                      value.status === "Rejected by Admin"
                                      ? "Ditolak Admin" :
                                      "Dibatalkan"
                                    : 
                                      value.status==="Waiting approval" ? 
                                      "Menunggu Persetujuan" : "Dikembalikan"
                                  }
                                </Tag>
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
                            {/* <Td>
                              <Skeleton>Sisa Waktu</Skeleton>
                            </Td> */}
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
      role={role} 
      data={selectedData}
      handleToManager={() => handleToManager(selectedIdReq)}
      handleAcceptReqManager={() => handleAcceptReqManager(selectedIdReq)}
      handleAcceptReqAdmin={() => handleAcceptReqAdmin(selectedIdReq)}
      handleAjukanPengembalian={() => handleAjukanPengembalian(selectedIdReq)}
      handleAcceptReturn={() => handleAcceptReturn(selectedIdReq)}
      handleRejectReqAdmin={() => handleRejectReqAdmin(selectedIdReq)}
      handleRejectReqManager={() => handleRejectReqManager(selectedIdReq)} 
      />
    </div>
  );
};

/*

*/
