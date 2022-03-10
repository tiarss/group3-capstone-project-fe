import {
  Box,
  Text,
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
import { procureModalProps } from "../../types";

export const ModalProcure = ({
  data,
  role,
  isOpen,
  onClose,
  handleAcceptReqProcure,
  handleRejectReqProcure,
}: procureModalProps) => {

  let status = "";

  if (data !== undefined) {
    status = data?.status;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detail Pengajuan Aset</ModalHeader>
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
                  backgroundImage: `url(https://capstone-group3.s3.ap-southeast-1.amazonaws.com/${data?.image})`,
                }}>
                <Text
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='9px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  {moment(data?.request_time).format("h:mm A, DD MMM YYYY")}
                </Text>
              </Box>
              <Flex mt='20px'>
                <Box w='50%'>
                  <Text fontSize='12px' fontWeight='bold'>
                    Pemohon
                  </Text>
                  <Text fontSize='12px'>{data?.User.name}</Text>
                  <Text fontSize='12px' fontWeight='bold'>
                    Divisi
                  </Text>
                  <Text fontSize='12px'>{data?.User.division}</Text>
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
                    {data?.status === "Waiting approval from Manager"
                      ? "Menunggu Persetujuan"
                      : status === "Approved by Manager"
                      ? "Disetujui Manager"
                      : "Ditolak Manager"}
                  </Text>
                </Box>
                <Box w='50%'>
                  <Text fontSize='12px' fontWeight='bold'>
                    Waktu Pengajuan
                  </Text>
                  <Text fontSize='12px'>
                    {moment(data?.request_time).format("h:mm A, DD MMM YYYY")}
                  </Text>
                  <Text fontSize='12px' fontWeight='bold'>
                    Deskripsi Keperluan
                  </Text>
                  <Text
                    fontSize='12px'
                    minHeight='199px'
                    maxHeight='200px'
                    overflowY='auto'>
                    {data?.description}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            {role === 2 ? (
              status === "Waiting approval from Manager" ? (
                <>
                  <ButtonPrimary title='Kembali' onclick={onClose} />
                </>
              ) : (
                <>
                  <ButtonPrimary
                    title='Kembali'
                    onclick={onClose}
                  />
                </>
              )
            ) : status === "Waiting approval from Manager" ? (
              <Flex gap="10px">
                <ButtonSecondary title='Tolak Permintaan' onclick={handleRejectReqProcure} />
                <ButtonPrimary title='Terima Permintaan' onclick={handleAcceptReqProcure} />
              </Flex>
            ) : status === "Aprroved by Manager" ? (
              <ButtonPrimary title='Kembali' onclick={onClose} />
            ) : (
              <ButtonPrimary title='Kembali' onclick={onClose} />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
