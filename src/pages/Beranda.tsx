import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Table,
  TableCaption,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { Pagination } from "@mantine/core";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
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
import {
  historyDataType,
  selectHistoryDataType,
  tableProcure,
  tableRequest,
} from "../types";
import moment from "moment";
import ModalAddAssets from "../components/Modal/tambah-asset";
import { Trigger, triggerType } from "../helper/Trigger";
import { AssignAssets } from "../components/AssignAssets";
import { HistoryModal } from "../components/HistoryModal";
import { ModalProcure } from "../components/ModalActivity/Procure";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const Beranda = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { trigger, setTrigger } = useContext(Trigger);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const [isOpenRequest, setIsOpenRequest] = useState(false);
  const [isOpenAssign, setIsOpenAssign] = useState(false);
  const [isOpenProcure, setIsOpenProcure] = useState(false);
  const [isOpenAddAssets, setIsOpenAddAssets] = useState(false);
  const [role, setRole] = useState(1);
  const [activePage, setPage] = useState(1);
  const [activePageProcure, setPageProcure] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalDataProcure, setTotalDataProcure] = useState(0);
  const idUser = localStorage.getItem("id");
  const dummy = [1, 2, 3, 4, 5];
  const logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    localStorage.setItem("id", "");
    localStorage.setItem("isAuth", JSON.stringify(false));
  };

  //Employee State
  //Create Request

  const [assetShortName, setAssetShortName] = useState<string>("");
  const [descriptionRequest, setDesciptionRequest] = useState<string>("");
  const [historyAssets, setHistoryAssets] = useState<historyDataType[]>();

  //End Employee State

  //Admin State
  //Create Assets
  const [addAssetsName, setAddAssetsName] = useState<string>("");
  const [addAssetsDescription, setAddAssetsDescription] = useState<string>("");
  const [addAssetsSum, setAddAssetsSum] = useState<number>(0);
  const [addAssetsImage, setAddAssetsImage] = useState<File>();
  const [addAssetsCategory, setAddAssetsCategory] = useState<string>("");
  const [activitySelect, setActivitySelect] = useState("");

  const [employeeId, setEmployeeId] = useState<number>(0);
  const [returnDate, setReturnDate] = useState<string>();
  const [ImageData, setImageData] = useState<File>();
  const [reqAssetsCategory, setReqAssetsCategory] = useState<string>("");

  const [requestData, setRequestData] = useState<tableRequest[]>();
  const [procureData, setProcureData] = useState<tableProcure[]>();
  const [selectedData, setSelectedData] = useState<tableRequest>();
  const [selectedDataProcure, setSelectedDataProcure] =
    useState<tableProcure>();
  const [selectedDataHistory, setSelectedDataHistory] =
    useState<selectHistoryDataType>();
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [isLoadingTableProcure, setIsLoadingTableProcure] = useState(true);
  const [selectedIdReq, setSelectedIdReq] = useState<number>(0);
  const [selectedIdProcure, setSelectedIdProcure] = useState<number>(0);
  const [selectedIdHistory, setSelectedIdHistory] = useState<number>(0);
  const [isMaintained, setIsMaintained] = useState<boolean>(false);
  const [order, setOrder] = useState("recent");
  const [category, setCategory] = useState("all");
  const [orderProc, setOrderProc] = useState("recent");
  const [categoryProc, setCategoryProc] = useState("all");
  //End Admin State

  let roles = localStorage.getItem("role");
  useEffect(() => {
    roleCondition();
    if (roles === "Administrator") {
      handleGetAllRequest();
    } else if (roles === "Manager") {
      handleGetManagerReq();
    } else {
      getAllHistory();
    }
  }, [activePage, activitySelect, order, category]);

  useEffect(() => {
    roleCondition();
    if (roles === "Administrator") {
      handleGetAllProcurement();
    } else if (roles === "Manager") {
      handleGetAllProcurementManager();
    } else {
      getAllHistory();
    }
  }, [activePageProcure, orderProc, categoryProc]);

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

  const handlePageProcure = (value: number) => {
    setPageProcure(value);
  };

  //Logic as Employee
  const handleOpenHistory = (id: number) => {
    axios
      .get(`/histories/users/${idUser}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setSelectedDataHistory(data);
        setSelectedIdHistory(id);
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
      })
      .finally(() => {
        setIsOpenHistory(true);
      });
  };

  const handleCloseHistory = () => setIsOpenHistory(false);

  const handleOpenRequest = () => {
    setIsOpenRequest(true);
  };

  const handleCloseRequest = () => setIsOpenRequest(false);

  const getAllHistory = () => {
    setIsLoadingTable(true);
    axios
      .get(`/histories/users/${idUser}`, {
        params: {
          page: activePage,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setHistoryAssets(data.histories);
        setTotalData(data.count);
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

  const handleRequest = () => {
    axios
      .post(
        "/requests/borrow",
        {
          short_name: assetShortName,
          description: descriptionRequest,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const { data } = res.data;
        if (data.code === 200) {
          toast({
            title: "Berhasil Membuat Permintaan Peminjaman Aset",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
        const temp: number = trigger.trig;
        setTrigger({ ...trigger, trig: temp + 1 });
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "input cannot be empty") {
          toast({
            title: "Input Harus Terisi Semua",
            description: "Anda Gagal Request Pengadaan Aset",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
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

  const handleAssetName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setAssetShortName(value);
    console.log(value);
  };

  const handleDescriptionRequest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDesciptionRequest(value);
    console.log(value);
  };

  // End of Employee Logic

  // Admin Logic
  const selectActivityReturn = () => {
    setActivitySelect("return");
    setPage(1);
  };

  const selectActivityBorrow = () => {
    setActivitySelect("");
    setPage(1);
  };

  const handleOpen = (id: number) => {
    const filtering = requestData?.find((value) => value.id === id);
    setSelectedData(filtering);
    if (filtering !== undefined) {
      setSelectedIdReq(filtering?.id);
    }
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  const handleOpenAssign = () => {
    setIsOpenAssign(true);
  };

  const handleCloseAssign = () => {
    setIsOpenAssign(false);
  };

  const handleOpenProcure = (id: number) => {
    const filtering = procureData?.find((value) => value.id === id);
    setSelectedDataProcure(filtering);
    if (filtering !== undefined) {
      setSelectedIdProcure(filtering?.id);
    }
    setIsOpenProcure(true);
  };

  const handleCloseProcure = () => setIsOpenProcure(false);

  const handleGetAllRequest = () => {
    setIsLoadingTable(true);
    axios
      .get("/requests/admin/borrow", {
        params: {
          p: activePage,
          rp: 5,
          a: activitySelect,
          o: order,
          c: category,
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
      });
  };

  const handleGetAllProcurement = () => {
    setIsLoadingTableProcure(true);
    axios
      .get("/requests/admin/procure", {
        params: {
          p: activePageProcure,
          rp: 5,
          o: orderProc,
          c: categoryProc,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        const { total_record } = res.data;
        setProcureData(data);
        setTotalDataProcure(total_record);
        setIsLoadingTableProcure(false);
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

  const handleOpenAddAssets = () => {
    setIsOpenAddAssets(true);
  };

  const handleCloseAddAssets = () => {
    setIsOpenAddAssets(false);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setAddAssetsCategory(value);
    console.log(value);
  };

  const handleAddName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddAssetsName(value);
    console.log(value);
  };

  const handleAddDeskripsi = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddAssetsDescription(value);
    console.log(value);
  };

  const handleAddJumlah = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setAddAssetsSum(value);
    console.log("sum: ", value);
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.files;
    if (!value) return;
    setAddAssetsImage(value[0]);
    console.log(value);
  };

  const handleMaintenance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    console.log(value);
    setIsMaintained(value);
  };

  const handleEmployee = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setEmployeeId(parseInt(value));
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const convert = moment(value).format();
    setReturnDate(convert);
  };

  const handleImageProcurement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.files;
    if (!value) return;
    setImageData(value[0]);
  };

  const handleCategoryReq = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setReqAssetsCategory(value);
    console.log(value);
  };

  const handleAddAssets = () => {
    const formData = new FormData();
    formData.append("name", addAssetsName);
    formData.append("category", addAssetsCategory);
    formData.append("description", addAssetsDescription);
    formData.append("quantity", addAssetsSum as any);
    formData.append("under_maintenance", isMaintained as any);
    if (addAssetsImage) {
      formData.append("image", addAssetsImage);
    }
    axios
      .post("/assets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        if (data.message === "success create asset") {
          toast({
            title: "Anda Berhasil Menambah Aset",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "failed to bind data") {
          toast({
            title: "Input Harus Terisi Semua",
            description: "Anda Gagal Request Pengadaan Aset",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        if (data.message === "forbidden file type") {
          toast({
            title: `Tipe File Gambar Salah`,
            description: "Gunakan tipe file jpeg/png",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        if (data.message === "file size too big") {
          toast({
            title: `Ukuran Gambar Terlalu besar`,
            description: "Ukuran Gambar Maksimal 2mb",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
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
        const { data } = res.data;
        if (data.code === 200) {
          toast({
            title: "Berhasil Meneruskan Permintaan ke Manager",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, status: "Waiting approval from Manager" });
        }
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
        const { data } = res.data;
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
        const { data } = res.data;
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
        const { data } = res.data;
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
        const { data } = res.data;
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
        handleClose();
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
      });
  };

  const handleRequestProcurement = () => {
    console.log(ImageData);
    console.log(reqAssetsCategory);
    console.log(descriptionRequest);
    const formData = new FormData();
    formData.append("category", reqAssetsCategory);
    formData.append("description", descriptionRequest);
    if (ImageData) {
      formData.append("image", ImageData);
    }
    axios
      .post(`/requests/procure`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        if (data.code === 200) {
          toast({
            title: "Berhasil Menambahkan Permintaan Pengadaan Aset",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "input cannot be empty") {
          toast({
            title: "Input Harus Terisi Semua",
            description: "Anda Gagal Request Pengadaan Aset",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        if (data.message === "forbidden file type") {
          toast({
            title: `Tipe File Gambar Salah`,
            description: "Gunakan tipe file jpeg/png",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        if (data.message === "file size too big") {
          toast({
            title: `Ukuran Gambar Terlalu besar`,
            description: "Ukuran Gambar Maksimal 2mb",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
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
        console.log(data);
      });
  };

  const handleAssignAssets = () => {
    axios
      .post(
        "/requests/borrow",
        {
          short_name: assetShortName,
          employee_id: employeeId,
          description: descriptionRequest,
          return_date: returnDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const { data } = res.data;
        if (data.code === 200) {
          toast({
            title: "Berhasil Assign Aset Ke Karyawan",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "input cannot be empty") {
          toast({
            title: "Input Harus Terisi Semua",
            description: "Anda Gagal Request Pengadaan Aset",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
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

  const selectAscend = () => {
    setOrder("old");
    setPage(1);
  };

  const selectDescend = () => {
    setOrder("recent");
    setPage(1);
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

  const selectAscendProc = () => {
    setOrderProc("old");
    setPageProcure(1);
  };

  const selectDescendProc = () => {
    setOrderProc("recent");
    setPageProcure(1);
  };

  const selectCategoryAllProc = () => {
    setCategoryProc("all");
    setPage(1);
  };

  const selectCategoryComProc = () => {
    setCategoryProc("computer");
    setPage(1);
  };

  const selectCategoryComAccProc = () => {
    setCategoryProc("computer-accessories");
    setPage(1);
  };

  const selectCategoryNetProc = () => {
    setCategoryProc("networking");
    setPage(1);
  };

  const selectCategoryUPSProc = () => {
    setCategoryProc("ups");
    setPage(1);
  };

  const selectCategoryPrintScanProc = () => {
    setCategoryProc("printer-scanner");
    setPage(1);
  };

  const selectCategoryElecProc = () => {
    setCategoryProc("electronics");
    setPage(1);
  };

  const selectCategoryOtherProc = () => {
    setCategoryProc("others");
    setPage(1);
  };
  // End of Admin Logic

  // Manager Logic

  const handleGetManagerReq = () => {
    const pageView = (activePage - 1) * 5 + 1;
    setIsLoadingTable(true);
    axios
      .get(`/requests/manager/borrow`, {
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

  const handleGetAllProcurementManager = () => {
    setIsLoadingTableProcure(true);
    axios
      .get("/requests/manager/procure", {
        params: {
          p: activePageProcure,
          rp: 5,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        const { total_record } = res.data;
        setProcureData(data);
        setTotalDataProcure(total_record);
        setIsLoadingTableProcure(false);
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
        const { data } = res.data;
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
        handleGetManagerReq();
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
        const { data } = res.data;
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
        handleGetManagerReq();
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

  const handleAcceptProcure = (id: number) => {
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
        const { data } = res.data;
        if (data.code === 200) {
          toast({
            title: "Berhasil Menerima Permintaan Pengadaan Aset",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
        const temp = selectedDataProcure;
        if (temp !== undefined) {
          setSelectedDataProcure({ ...temp, status: "Approved by Manager" });
        }
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

  const handleRejectProcure = (id: number) => {
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
        const { data } = res.data;
        if (data.code === 200) {
          toast({
            title: "Berhasil Menolak Permintaan Peminjaman Aset",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
        const temp = selectedDataProcure;
        if (temp !== undefined) {
          setSelectedDataProcure({ ...temp, status: "Rejected by Manager" });
        }
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

  // End of Manager Logic

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
                    <ButtonTertier
                      title='Assign Aset Ke Karyawan'
                      onclick={handleOpenAssign}
                    />
                  </>
                ) : (
                  <></>
                )}
              </Flex>
            </Flex>
            <Box overflowX='auto'>
              {role === 1 ? (
                <Table minW='800px' size='sm' borderRadius='20px'>
                  <Thead bgColor='blue.500'>
                    <Tr>
                      <Th color='white'>No</Th>
                      <Th color='white'>Tanggal Peminjaman</Th>
                      <Th color='white'>Jenis Aktivitas</Th>
                      <Th color='white'>Kategori Aset</Th>
                      <Th color='white'>Barang</Th>
                      <Th color='white'></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {isLoadingTable ? (
                      <>
                        {dummy.map((value: number) => (
                          <Tr key={value}>
                            <Td>
                              <Skeleton>1</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>12:22 WIB, 11 Jan 2022</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Peminjaman Aset</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Headphone</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>dBe DJ80 Foldable DJ...</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>
                                <ButtonTertier title='Details' />
                              </Skeleton>
                            </Td>
                          </Tr>
                        ))}
                      </>
                    ) : (
                      <>
                        {historyAssets === null ? (
                          <>
                            {dummy.map((value: number) => (
                              <Tr key={value}>
                                <Td>
                                  <Skeleton>1</Skeleton>
                                </Td>
                                <Td>
                                  <Skeleton>12:22 WIB, 11 Jan 2022</Skeleton>
                                </Td>
                                <Td>
                                  <Skeleton>Peminjaman Aset</Skeleton>
                                </Td>
                                <Td>
                                  <Skeleton>Headphone</Skeleton>
                                </Td>
                                <Td>
                                  <Skeleton>dBe DJ80 Foldable DJ...</Skeleton>
                                </Td>
                                <Td>
                                  <Skeleton>
                                    <ButtonTertier title='Details' />
                                  </Skeleton>
                                </Td>
                              </Tr>
                            ))}
                          </>
                        ) : historyAssets !== undefined ? (
                          historyAssets.map((value, index) => (
                            <Tr key={value.id}>
                              <Td>{(activePage - 1) * 5 + index + 1}</Td>
                              <Td>
                                {moment(value.request_date).format(
                                  "h:mm A, DD MMM YYYY"
                                )}
                              </Td>
                              <Td>
                                {value.activity_type === "Borrowing Asset"
                                  ? "Peminjaman Aset"
                                  : "Peminjaman Aset"}
                              </Td>
                              <Td>{value.category}</Td>
                              <Td>{`${value.asset_name.substring(
                                0,
                                20
                              )}+..`}</Td>
                              <Td>
                                <ButtonTertier
                                  title='Details'
                                  onclick={() => handleOpenHistory(value.id)}
                                />
                              </Td>
                            </Tr>
                          ))
                        ) : (
                          <Tr>
                            <Td>
                              <Skeleton>1</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>12:22 WIB, 11 Jan 2022</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Peminjaman Aset</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Headphone</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>dBe DJ80 Foldable DJ...</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>
                                <ButtonTertier title='Details' />
                              </Skeleton>
                            </Td>
                          </Tr>
                        )}
                      </>
                    )}
                  </Tbody>
                </Table>
              ) : role === 2 ? (
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
                      <Th color='white'>
                        <Menu>
                          <MenuButton
                            as={Button}
                            size='sm'
                            colorScheme='blue'
                            fontSize='12px'
                            rightIcon={<ChevronDownIcon />}>
                            JENIS AKTIVITAS
                          </MenuButton>
                          <MenuList color='blue.500'>
                            <MenuItem onClick={selectActivityBorrow}>
                              Peminjaman
                            </MenuItem>
                            <MenuItem onClick={selectActivityReturn}>
                              Pengembalian
                            </MenuItem>
                          </MenuList>
                        </Menu>
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
                            <MenuItem onClick={selectCategoryAll}>
                              Semua
                            </MenuItem>
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
                      <Th color='white'></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {isLoadingTable ? (
                      <>
                        {dummy.map((value: number) => (
                          <Tr key={value}>
                            <Td>
                              <Skeleton>1</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>12:22 WIB, 11 Jan 2022</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Peminjaman Aset</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Headphone</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>dBe DJ80 Foldable DJ...</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>
                                <ButtonTertier title='Details' />
                              </Skeleton>
                            </Td>
                          </Tr>
                        ))}
                      </>
                    ) : (
                      <>
                        {requestData === null ? (
                          <></>
                        ) : requestData !== undefined ? (
                          requestData.map((value, index) => (
                            <Tr key={value.id}>
                              <Td>{(activePage - 1) * 5 + index + 1}</Td>
                              <Td>
                                {moment(value.request_time).format(
                                  "h:mm A, DD MMM YYYY"
                                )}
                              </Td>
                              <Td>
                                {value.activity === "Borrow"
                                  ? "Peminjaman Aset"
                                  : "Pengembalian Aset"}
                              </Td>
                              <Td>{value.Asset.category}</Td>
                              <Td>{`${value.Asset.name.substring(
                                0,
                                20
                              )}+..`}</Td>
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
                              <Skeleton>1</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>12:22 WIB, 11 Jan 2022</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Peminjaman Aset</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Headphone</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>dBe DJ80 Foldable DJ...</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>
                                <ButtonTertier title='Details' />
                              </Skeleton>
                            </Td>
                          </Tr>
                        )}
                      </>
                    )}
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
                    {isLoadingTable ? (
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
                          <ButtonTertier title='Details' />
                        </Td>
                      </Tr>
                    ) : (
                      <>
                        {requestData === null ? (
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
                        ) : requestData !== undefined ? (
                          requestData!.map((value) => (
                            <Tr key={value.id}>
                              <Td>1</Td>
                              <Td>
                                {moment(value.request_time).format(
                                  "h:mm A, DD MMM YYYY"
                                )}
                              </Td>
                              <Td>{value.User.name}</Td>
                              <Td>{value.Asset.category}</Td>
                              <Td>{`${value.Asset.name.substring(
                                0,
                                20
                              )}+..`}</Td>
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
                            <Td>1</Td>
                            <Td>12:22 WIB, 11 Jan 2022</Td>
                            <Td>Peminjaman Aset</Td>
                            <Td>Headphone</Td>
                            <Td>dBe DJ80 Foldable DJ...</Td>
                            <Td>
                              <ButtonTertier title='Details' />
                            </Td>
                          </Tr>
                        )}
                      </>
                    )}
                  </Tbody>
                </Table>
              )}
            </Box>
            <Flex mt='10px' justifyContent='center'>
              <Pagination
                total={Math.ceil(totalData / 5)}
                page={activePage}
                onChange={handlePage}
              />
            </Flex>
          </Box>
        </Box>
        <Box display={role === 1 ? "none" : "block"} gap='20px'>
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
                Permohonan Pengadaan
              </Text>
              <Flex gap='10px' display={role === 3 ? "none" : "flex"}>
                <ButtonSecondary
                  title='Pengajuan Aset Baru'
                  onclick={handleOpenRequest}
                />
                <ButtonPrimary
                  title='Tambah Aset'
                  onclick={handleOpenAddAssets}
                />
              </Flex>
            </Flex>
            <Box overflowX='auto'>
              {role === 2 ? (
                <Table minW='800px' size='sm' borderRadius='20px'>
                  <TableCaption>
                    {procureData === null ? "Tidak ada Data" : ""}
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
                            <MenuItem onClick={selectAscendProc}>
                              Oldest
                            </MenuItem>
                            <MenuItem onClick={selectDescendProc}>
                              Recent
                            </MenuItem>
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
                            <MenuItem onClick={selectCategoryAllProc}>
                              Semua
                            </MenuItem>
                            <MenuItem onClick={selectCategoryComProc}>
                              Computer
                            </MenuItem>
                            <MenuItem onClick={selectCategoryComAccProc}>
                              Computer Accessories
                            </MenuItem>
                            <MenuItem onClick={selectCategoryNetProc}>
                              Networking
                            </MenuItem>
                            <MenuItem onClick={selectCategoryUPSProc}>
                              UPS
                            </MenuItem>
                            <MenuItem onClick={selectCategoryPrintScanProc}>
                              Printer and Scanner
                            </MenuItem>
                            <MenuItem onClick={selectCategoryElecProc}>
                              Electronics
                            </MenuItem>
                            <MenuItem onClick={selectCategoryOtherProc}>
                              Others
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Th>
                      <Th color='white'>Deskripsi</Th>
                      <Th color='white'></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {isLoadingTableProcure ? (
                      <>
                        {dummy.map((value: number) => (
                          <Tr key={value}>
                            <Td>
                              <Skeleton>1</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>12:22 WIB, 11 Jan 2022</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Peminjaman Aset</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Headphone</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>dBe DJ80 Foldable DJ...</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>
                                <ButtonTertier title='Details' />
                              </Skeleton>
                            </Td>
                          </Tr>
                        ))}
                      </>
                    ) : (
                      <>
                        {procureData === null ? (
                          <></>
                        ) : procureData !== undefined ? (
                          procureData.map((value, index) => (
                            <Tr key={value.id}>
                              <Td>{(activePageProcure - 1) * 5 + index + 1}</Td>
                              <Td>
                                {moment(value.request_time).format(
                                  "h:mm a, DD MMM YYYY"
                                )}
                              </Td>
                              <Td>
                                {value.activity === "Procure"
                                  ? "Pengadaan Aset"
                                  : "Pengadaan Aset"}
                              </Td>
                              <Td>{value.category}</Td>
                              <Td>{`${value.description.substring(
                                0,
                                20
                              )}+..`}</Td>
                              <Td>
                                <ButtonTertier
                                  title='Details'
                                  onclick={() => handleOpenProcure(value.id)}
                                />
                              </Td>
                            </Tr>
                          ))
                        ) : (
                          <Tr>
                            <Td>
                              <Skeleton>1</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>12:22 WIB, 11 Jan 2022</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Peminjaman Aset</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Headphone</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>dBe DJ80 Foldable DJ...</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>
                                <ButtonTertier title='Details' />
                              </Skeleton>
                            </Td>
                          </Tr>
                        )}
                      </>
                    )}
                  </Tbody>
                </Table>
              ) : (
                <Table size='sm' borderRadius='20px'>
                  <Thead bgColor='blue.500'>
                    <Tr>
                      <Th color='white'>No</Th>
                      <Th color='white'>Tanggal</Th>
                      <Th color='white'>Jenis Aktivitas</Th>
                      <Th color='white'>Kategori Aset</Th>
                      <Th color='white'>Deskripsi</Th>
                      <Th color='white'></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {isLoadingTableProcure ? (
                      <>
                        {dummy.map((value: number) => (
                          <Tr key={value}>
                            <Td>
                              <Skeleton>1</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>12:22 WIB, 11 Jan 2022</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Peminjaman Aset</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>Headphone</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>dBe DJ80 Foldable DJ...</Skeleton>
                            </Td>
                            <Td>
                              <Skeleton>
                                <ButtonTertier title='Details' />
                              </Skeleton>
                            </Td>
                          </Tr>
                        ))}
                      </>
                    ) : (
                      <>
                        {procureData === null ? (
                          <>
                            {dummy.map((value: number) => (
                              <Tr key={value}>
                                <Td>
                                  <Skeleton>1</Skeleton>
                                </Td>
                                <Td>
                                  <Skeleton>12:22 WIB, 11 Jan 2022</Skeleton>
                                </Td>
                                <Td>
                                  <Skeleton>Peminjaman Aset</Skeleton>
                                </Td>
                                <Td>
                                  <Skeleton>Headphone</Skeleton>
                                </Td>
                                <Td>
                                  <Skeleton>dBe DJ80 Foldable DJ...</Skeleton>
                                </Td>
                                <Td>
                                  <Skeleton>
                                    <ButtonTertier title='Details' />
                                  </Skeleton>
                                </Td>
                              </Tr>
                            ))}
                          </>
                        ) : procureData !== undefined ? (
                          procureData!.map((value, index) => (
                            <Tr key={value.id}>
                              <Td>{(activePageProcure - 1) * 5 + index + 1}</Td>
                              <Td>
                                {moment(value.request_time).format(
                                  "h:mm a, DD MMM YYYY"
                                )}
                              </Td>
                              <Td>
                                {value.activity === "Procure"
                                  ? "Pengadaan Aset"
                                  : "Pengadaan Aset"}
                              </Td>
                              <Td>{value.category}</Td>
                              <Td>{`${value.description.substring(
                                0,
                                20
                              )}+..`}</Td>
                              <Td>
                                <ButtonTertier
                                  title='Details'
                                  onclick={() => handleOpenProcure(value.id)}
                                />
                              </Td>
                            </Tr>
                          ))
                        ) : (
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
                        )}
                      </>
                    )}
                  </Tbody>
                </Table>
              )}
            </Box>
            <Flex mt='10px' justifyContent='center'>
              <Pagination
                total={Math.ceil(totalDataProcure / 5)}
                page={activePageProcure}
                onChange={handlePageProcure}
              />
            </Flex>
          </Box>
        </Box>
      </Box>
      <RequestModal
        role={role}
        isOpen={isOpenRequest}
        onClose={handleCloseRequest}
        onChangeAset={handleAssetName}
        onChangeDeskripsi={handleDescriptionRequest}
        onClickRequest={handleRequest}
        onClickProcurement={handleRequestProcurement}
        onChangeEmployee={handleEmployee}
        onChangeImage={handleImageProcurement}
        onChangeReqCategory={handleCategoryReq}
      />
      <ModalActivity
        data={selectedData}
        handleToManager={() => handleToManager(selectedIdReq)}
        handleAcceptReqManager={() => handleAcceptReqManager(selectedIdReq)}
        handleAcceptReqAdmin={() => handleAcceptReqAdmin(selectedIdReq)}
        handleAjukanPengembalian={() => handleAjukanPengembalian(selectedIdReq)}
        handleAcceptReturn={() => handleAcceptReturn(selectedIdReq)}
        handleRejectReqAdmin={() => handleRejectReqAdmin(selectedIdReq)}
        handleRejectReqManager={() => handleRejectReqManager(selectedIdReq)}
        isOpen={isOpen}
        onClose={handleClose}
        role={role}
      />
      <AssignAssets
        isOpen={isOpenAssign}
        onClose={handleCloseAssign}
        onClickAssign={handleAssignAssets}
        onChangeDeskripsi={handleDescriptionRequest}
        onChangeEmployee={handleEmployee}
        onChangeAset={handleAssetName}
        onChangeDate={handleDate}
      />
      <ModalAddAssets
        isOpen={isOpenAddAssets}
        onClose={handleCloseAddAssets}
        onChangeName={handleAddName}
        onChangeDeskripsi={handleAddDeskripsi}
        onChangeKategori={handleCategory}
        onChangeJumlah={handleAddJumlah}
        onChangeMaintained={handleMaintenance}
        onChangeImage={handleAddImage}
        onClickAdd={handleAddAssets}
      />
      <HistoryModal
        isOpen={isOpenHistory}
        dataHistory={selectedDataHistory}
        onClose={handleCloseHistory}
      />
      <ModalProcure
        handleAcceptReqProcure={() => handleAcceptProcure(selectedIdProcure)}
        handleRejectReqProcure={() => handleRejectProcure(selectedIdProcure)}
        data={selectedDataProcure}
        role={role}
        isOpen={isOpenProcure}
        onClose={handleCloseProcure}
      />
    </div>
  );
};
