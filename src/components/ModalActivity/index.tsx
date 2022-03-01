import {
  Box,
  Text,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { ButtonPrimary, ButtonSecondary, ButtonTertier } from "../Button";

export const ModalActivity = ({
  role,
  status,
  activity,
  isOpen,
  onClose,
}: {
  role: number;
  status: string;
  activity: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [shortName, setShortName] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");
  const [isApproved, setIsApproved] = useState<boolean>(false);
  
  const handleShortName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setShortName(value);
  }

  const handleEmployeeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setEmployeeId(value);
  }

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
  }

  const handleReturnTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReturnTime(value);
  }

  const handleApproved = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setIsApproved(value);
  }

  const handleEmployeeReturn = () => {
    axios
    .post(`https://klender.xyz/borrow`,{
        short_name: shortName,
        description: description
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

  const handleAdminReturn = () => {
    axios
    .post(`https://klender.xyz/borrow`,{
        short_name: shortName,
        employee_id: employeeId,
        description: description,
        return_time: returnTime
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

  const handleAdminApproval = (request_id:number) => {
    axios
    .put(`https://klender.xyz/requet/borrow/${request_id}`,{
        approved: isApproved
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detail Permohonan Aset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box
                w='100%'
                h='100px'
                padding='10px'
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage:
                    "url(https://id.360buyimg.com/Indonesia/nHBfsgAAYwAAABkACvFW2gAKOCI.jpg)",
                }}>
                <Text
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='9px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  13:24 PM, 14 Feb 2022
                </Text>
                <Text
                  mt='5px'
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='12px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  Lenovo Thinkpad Yoga 370 Core i7 7600U Ge..
                </Text>
              </Box>
              <Flex mt='20px'>
                <Box w='50%'>
                  <Text fontSize='12px' fontWeight='bold'>
                    Pemohon
                  </Text>
                  <Text fontSize='12px'>Bahtiar Subrata</Text>
                  <Text fontSize='12px' fontWeight='bold'>
                    Divisi
                  </Text>
                  <Text fontSize='12px'>Tech</Text>
                  <Text fontSize='12px' fontWeight='bold'>
                    Status Pengajuan
                  </Text>
                  <Text
                    mt='5px'
                    fontWeight='semibold'
                    borderRadius='5px'
                    width='fit-content'
                    fontSize='10px'
                    textAlign='left'
                    padding='3px 6px'
                    color='white'
                    bgColor='#2A2A2A'>
                    Status Pengajuan
                  </Text>
                </Box>
                <Box w='50%'>
                  <Text fontSize='12px' fontWeight='bold'>
                    Waktu Pengajuan
                  </Text>
                  <Text fontSize='12px'>13:24 PM, 14 Feb 2022</Text>
                  <Text
                    fontSize='12px'
                    fontWeight='bold'
                    display={
                      role === 1 ? "none" : role === 2 ? "block" : "block"
                    }>
                    Waktu Pengembalian
                  </Text>
                  <Text
                    fontSize='12px'
                    display={
                      role === 1 ? "none" : role === 2 ? "block" : "block"
                    }>
                    -
                  </Text>
                  <Text
                    fontSize='12px'
                    fontWeight='bold'
                    display={
                      role === 1 ? "none" : role === 2 ? "block" : "block"
                    }>
                    Sisa Waktu
                  </Text>
                  <Text
                    fontSize='12px'
                    display={
                      role === 1 ? "none" : role === 2 ? "block" : "block"
                    }>
                    -
                  </Text>
                  <Text fontSize='12px' fontWeight='bold'>
                    Deskripsi Keperluan
                  </Text>
                  <Text fontSize='12px'>
                    Keperluan pengerjaan kantor karena laptop pribadi yang
                    kurang mempuni. Mohon Pertimbangannya
                  </Text>
                </Box>
              </Flex>
              <Flex
                display={role === 1 ? "none" : role === 2 ? "flex" : "flex"}
                p='0px 15px'
                justifyContent='space-between'
                alignItems='center'
                mt='20px'
                bgColor='#D9EAF2'
                h='50px'
                w='100%'>
                <Box>
                  <Text fontSize='12px' fontWeight='bold'>
                    Manager
                  </Text>
                  <Text fontSize='12px' fontWeight='normal'>
                    Handri Pangestiaji
                  </Text>
                </Box>
                <Box>
                  {status === "Waiting approval" ? (
                    <Text fontSize='12px' fontWeight='bold' color='#2296CB'>
                      Menunggu Persetujuan
                    </Text>
                  ) : status === "Approved by Manager" ? (
                    <Text fontSize='12px' fontWeight='bold' color='#2296CB'>
                      Disetujui
                    </Text>
                  ) : status === "Rejected by Manager" ? (
                    <Text fontSize='12px' fontWeight='bold' color='#2296CB'>
                      Ditolak Manager
                    </Text>
                  ) : status === "Approved by Admin" ? (
                    <Text fontSize='12px' fontWeight='bold' color='#2296CB'>
                      Disetujui
                    </Text>
                  ) : status === "Rejected by Admin" ? (
                    <Text fontSize='12px' fontWeight='bold' color='#2296CB'>
                      Ditolak Admin
                    </Text>
                  ) : (
                    <Text
                      fontSize='12px'
                      fontWeight='bold'
                      color='#2296CB'
                      cursor='pointer'>
                      Minta Persetujuan
                    </Text>
                  )}
                </Box>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            {role === 1 ? (
              status === "Waiting approval" ? (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonSecondary
                    title='Batalkan Pengajuan'
                    onclick={onClose}
                  />
                  <ButtonPrimary title='Kembali' />
                </Flex>
              ) : status === "Approved by Manager" ? (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonSecondary
                    title='Batalkan Pengajuan'
                    onclick={onClose}
                  />
                  <ButtonPrimary title='Kembali' />
                </Flex>
              ) : status === "Approved by Admin" ? (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonSecondary title='Kembali' onclick={onClose} />
                  <ButtonPrimary title='Ajukan Pengembalian' />
                </Flex>
              ) : (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonSecondary title='Kembali' onclick={onClose} />
                  <Box display='none'>
                    <ButtonPrimary title='Ajukan Pengembalian' />
                  </Box>
                </Flex>
              )
            ) : role === 2 ? (
              status === "Waiting approval" ? (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonSecondary
                    title='Tolak'
                    onclick={onClose}
                    isDisabled={true}
                  />
                  <ButtonPrimary title='Terima Permohonan' isDisabled={true} />
                </Flex>
              ) : status === "Approved by Manager" ? (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonSecondary title='Kembali' onclick={onClose} />
                  <ButtonPrimary title='Terima Permohonan' />
                </Flex>
              ) : status === "Approved by Admin" ? (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonSecondary title='Kembali' onclick={onClose} />
                  <ButtonPrimary title='Ajukan Pengembalian' />
                </Flex>
              ) : (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonSecondary
                    title='Tolak'
                    onclick={onClose}
                    isDisabled={true}
                  />
                  <ButtonPrimary title='Terima Permohonan' isDisabled={true} />
                </Flex>
              )
            ) : status === "Waiting approval" ? (
              <Flex gap='10px' justifyContent='end'>
                <ButtonSecondary
                  title='Tolak'
                  onclick={onClose}
                  isDisabled={true}
                />
                <ButtonPrimary title='Terima Permohonan' isDisabled={true} />
              </Flex>
            ) : status === "Approved by Manager" ? (
              <Flex gap='10px' justifyContent='end'>
                <ButtonSecondary title='Kembali' onclick={onClose} />
                <ButtonPrimary title='Terima Permohonan' />
              </Flex>
            ) : status === "Approved by Admin" ? (
              <Flex gap='10px' justifyContent='end'>
                <ButtonSecondary title='Kembali' onclick={onClose} />
                <ButtonPrimary title='Ajukan Pengembalian' />
              </Flex>
            ) : (
              <Flex gap='10px' justifyContent='end'>
                <ButtonSecondary
                  title='Tolak'
                  onclick={onClose}
                  isDisabled={true}
                />
                <ButtonPrimary title='Terima Permohonan' isDisabled={true} />
              </Flex>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
