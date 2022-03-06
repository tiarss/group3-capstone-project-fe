import React from "react";
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
import { ButtonPrimary, ButtonSecondary } from "../Button";
import moment from "moment";
import { historyModalProps } from "../../types";

export const HistoryModal = ({
  dataHistory,
  isOpen,
  onClose,
}: historyModalProps) => {
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
                  backgroundImage: `${
                    dataHistory !== undefined
                      ? `url(${dataHistory?.asset_image})`
                      : `url(https://capstone-group3.s3.ap-southeast-1.amazonaws.com/asset-8-1645751450.png)`
                  }`,
                }}>
                <Text
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='9px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  {dataHistory !== undefined
                    ? moment(dataHistory.request_date).format(
                        "h:mm A, DD MMM YYYY"
                      )
                    : `13:24 PM, 14 Feb 2022`}
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
                  {dataHistory !== undefined
                    ? dataHistory.asset_name.length > 40
                      ? `${dataHistory?.asset_name.substring(0, 40)}+...`
                      : `${dataHistory?.asset_name}`
                    : "None"}
                </Text>
              </Box>
              <Flex mt='20px'>
                <Box w='50%'>
                  <Text fontSize='12px' fontWeight='bold'>
                    Waktu Pengajuan
                  </Text>
                  <Text fontSize='12px'>
                    {dataHistory !== undefined
                      ? moment(dataHistory.request_date).format(
                          "h:mm A, DD MMM YYYY"
                        )
                      : `13:24 PM, 14 Feb 2022`}
                  </Text>
                  <Text fontSize='12px' fontWeight='bold'>
                    Waktu Pengembalian
                  </Text>
                  <Text fontSize='12px'></Text>
                  <Text fontSize='12px' fontWeight='bold'>
                    Sisa Waktu
                  </Text>
                  <Text fontSize='12px'>-</Text>
                  <Text fontSize='12px' fontWeight='bold'>
                    Deskripsi Keperluan
                  </Text>
                  <Text fontSize='12px'></Text>
                </Box>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonSecondary title='Kembali' onclick={onClose} />
            <ButtonPrimary title='Ajukan Peminjaman Ulang' />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
