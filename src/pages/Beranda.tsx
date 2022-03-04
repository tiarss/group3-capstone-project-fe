import {
  Box,
  Flex,
  Skeleton,
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
import { tableRequest } from "../types";
import moment from "moment";
import ModalAddAssets from "../components/Modal/tambah-asset";

export const Beranda = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRequest, setIsOpenRequest] = useState(false);
  const [isOpenAddAssets, setIsOpenAddAssets] = useState(false);
  const [role, setRole] = useState(1);
  const [activePage, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const idUser = localStorage.getItem("id");
  const dummy = [1,2,3,4,5]

  //Employee State
  //Create Request

  const [assetShortName, setAssetShortName] = useState<string>("");
  const [descriptionRequest, setDesciptionRequest] = useState<string>("");

  //End Employee State

  //Admin State
  //Create Assets
  const [addAssetsName, setAddAssetsName] = useState<string>("");
  const [addAssetsDescription, setAddAssetsDescription] = useState<string>("");
  const [addAssetsSum, setAddAssetsSum] = useState<number>(0);
  const [addAssetsImage, setAddAssetsImage] = useState<File>();
  const [addAssetsCategory, setAddAssetsCategory] = useState<string>("");

  const [requestData, setRequestData] = useState<tableRequest[]>();
  const [selectedData, setSelectedData] = useState<tableRequest>();
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [selectedIdReq, setSelectedIdReq] = useState<number>(0);
  const [isMaintained, setIsMaintained ] = useState<boolean>(false); 
  //End Admin State

  let roles = localStorage.getItem("role");
  useEffect(() => {
    roleCondition();
    if (roles === "Administrator") {
      handleGetAllRequest();
    } else if (roles === "Manager") {
      handleGetManagerReq();
    }
  }, [activePage]);

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

  //Logic as Employee
  const handleOpenRequest = () => {
    setIsOpenRequest(true);
  };

  const handleCloseRequest = () => setIsOpenRequest(false);

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
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
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
    const pageView = (activePage - 1) * 5 + 1
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
        setTotalData(total_record)
        console.log(total_record)
        console.log(data);
        setIsLoadingTable(false);
      })
      .catch((err) => {
        console.log(err.response);
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
    console.log(value)
    setIsMaintained(value)
  }

  const handleAddAssets = () => {
    axios
    .post(
      "/assets",
      {
        name: addAssetsName,
        category: addAssetsCategory,
        description: addAssetsDescription,
        quantity: addAssetsSum,
        under_maintenance: isMaintained,
        image: addAssetsImage
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
    .then((res) => {
      const { data } = res;
      console.log(data);
      handleCloseAddAssets();
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
        console.log(res);
        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, status: "Approved by Admin" });
        }
        handleGetAllRequest();
      })
      .catch((err) => {
        console.log(err.response);
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
        console.log(res);
        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, status: "Approved by Admin" });
        }
        handleGetAllRequest();
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const handleAjukanPengembalian = (id:number) => {
    axios
      .put(
        `/request/return/${id}`,
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
        console.log("respon: ", data);
        handleClose();
      })
      .catch((err) => {
        console.log(err.response);
      })
  }
  // End of Admin Logic

  // Manager Logic

  const handleGetManagerReq = () => {
    setIsLoadingTable(true);
    axios
      .get(`/requests/manager/borrow`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setRequestData(data);
        console.log(data);
        setIsLoadingTable(false);
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
        console.log(res);
        const temp = selectedData;
        if (temp !== undefined) {
          setSelectedData({ ...temp, status: "Approved by Manager" });
        }
        handleGetManagerReq();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  

  const handleRejectReqManager = (id: number) => {};

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
                    {isLoadingTable ? (
                      <>
                        {dummy.map((value:number) => (
                        <Tr key={value}>
                          <Td><Skeleton>1</Skeleton></Td>
                          <Td><Skeleton>12:22 WIB, 11 Jan 2022</Skeleton></Td>
                          <Td><Skeleton>Peminjaman Aset</Skeleton></Td>
                          <Td><Skeleton>Headphone</Skeleton></Td>
                          <Td><Skeleton>dBe DJ80 Foldable DJ...</Skeleton></Td>
                          <Td>
                          <Skeleton><ButtonTertier title='Details' /></Skeleton>
                          </Td>
                        </Tr>
                          ))}
                      </>
                    ) : (
                      <>
                        {requestData === null ? (
                        <>
                          {dummy.map((value:number) => (
                          <Tr key={value}>
                            <Td><Skeleton>1</Skeleton></Td>
                            <Td><Skeleton>12:22 WIB, 11 Jan 2022</Skeleton></Td>
                            <Td><Skeleton>Peminjaman Aset</Skeleton></Td>
                            <Td><Skeleton>Headphone</Skeleton></Td>
                            <Td><Skeleton>dBe DJ80 Foldable DJ...</Skeleton></Td>
                            <Td>
                            <Skeleton><ButtonTertier title='Details' /></Skeleton>
                            </Td>
                          </Tr>
                        ))}
                        </>
                        ) : requestData !== undefined ? (
                          requestData.map((value) => (
                            <Tr key={value.id}>
                              <Td>1</Td>
                              <Td>
                                {moment(value.request_time).format(
                                  "h:mm a, DD MMM YYYY"
                                )}
                              </Td>
                              <Td>
                                {value.activity === "Borrow"
                                  ? "Peminjaman Aset"
                                  : "Peminjaman Aset"}
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
                            <Td><Skeleton>1</Skeleton></Td>
                            <Td><Skeleton>12:22 WIB, 11 Jan 2022</Skeleton></Td>
                            <Td><Skeleton>Peminjaman Aset</Skeleton></Td>
                            <Td><Skeleton>Headphone</Skeleton></Td>
                            <Td><Skeleton>dBe DJ80 Foldable DJ...</Skeleton></Td>
                            <Td>
                            <Skeleton><ButtonTertier title='Details' /></Skeleton>
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
                                  "h:mm a, DD MMM YYYY"
                                )}
                              </Td>
                              <Td>{value.User.name}</Td>
                              <Td>{value.Asset.category}</Td>
                              <Td>{`${value.Asset.name.substring(
                                0,
                                20
                              )}+..`}</Td>
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
      </Box>
      <RequestModal
        isOpen={isOpenRequest}
        onClose={handleCloseRequest}
        onChangeAset={handleAssetName}
        onChangeDeskripsi={handleDescriptionRequest}
        onClickRequest={handleRequest}
      />
      
      <ModalActivity
        data={selectedData}
        handleToManager={() => handleToManager(selectedIdReq)}
        handleAcceptReqManager={() => handleAcceptReqManager(selectedIdReq)}
        handleAcceptReqAdmin={() => handleAcceptReqAdmin(selectedIdReq)}
        handleAjukanPengembalian={()=>handleAjukanPengembalian(selectedIdReq)}
        handleAcceptReturn={()=>handleAcceptReturn(selectedIdReq)}
        isOpen={isOpen}
        onClose={handleClose}
        role={role}
        status='Approved by Admin'
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
    </div>
  );
};
