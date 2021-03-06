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
  Tag,
} from "@chakra-ui/react";
import { ButtonPrimary, ButtonSecondary } from "../Button";
import moment from "moment";
import { requestModalProps } from "../../types";

export const ModalActivity = ({
  dataActivities,
  data,
  role,
  isOpen,
  onClose,
  handleToManager,
  handleAcceptReqManager,
  handleAcceptReqAdmin,
  handleRejectReqEmployee,
  handleReturnEmployee,
  handleAjukanPengembalian,
  handleAcceptReturn,
  handleRejectReqManager,
  handleRejectReqAdmin,
}: requestModalProps) => {
  let status = "";

  if (role === 1) {
    if (dataActivities !== undefined) {
      status = dataActivities?.status;
    }
  } else {
    if (data !== undefined) {
      status = data?.status;
    }
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
                  backgroundImage: `${
                    role === 1
                      ? `url(${dataActivities?.asset_image})`
                      : data !== undefined
                      ? `url(https://capstone-group3.s3.ap-southeast-1.amazonaws.com/${data.Asset.image})`
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
                  {role === 1 ? (
                    moment(dataActivities?.request_date).format(
                      "h:mm A, DD MMM YYYY"
                    )
                  ) : (
                    <>
                      {data !== undefined
                        ? moment(data.request_time).format(
                            "h:mm A, DD MMM YYYY"
                          )
                        : `13:24 PM, 14 Feb 2022`}
                    </>
                  )}
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
                  {role === 1
                    ? dataActivities !== undefined
                      ? dataActivities?.asset_name.length > 40
                        ? `${dataActivities?.asset_name.substring(0, 40)}+...`
                        : `${dataActivities?.asset_name}`
                      : "tidak ada barang"
                    : data !== undefined
                    ? data?.Asset.name.length > 40
                      ? `${data?.Asset.name.substring(0, 40)}+...`
                      : `${data?.Asset.name}`
                    : "tidak ada barang"}
                </Text>
              </Box>
              <Flex mt='20px'>
                <Box w='50%'>
                  <Text fontSize='12px' fontWeight='bold'>
                    Pemohon
                  </Text>
                  <Text fontSize='12px'>
                    {role === 1
                      ? dataActivities !== undefined
                        ? dataActivities.user_name
                        : "Guest"
                      : data !== undefined
                      ? data.User.name === ""
                        ? "-"
                        : data.User.name
                      : "Guest"}
                  </Text>
                  <Text
                    fontSize='12px'
                    fontWeight='bold'
                    display={role === 1 ? "none" : "block"}>
                    Divisi
                  </Text>
                  <Text fontSize='12px' display={role === 1 ? "none" : "block"}>
                    {data !== undefined
                      ? data.User.division === ""
                        ? "-"
                        : data.User.division
                      : "-"}
                  </Text>
                  <Text fontSize='12px' fontWeight='bold'>
                    Status Pengajuan
                  </Text>
                  <Tag
                    mt='5px'
                    size='sm'
                    variant='subtle'
                    colorScheme={
                      status.includes("Waiting")
                        ? "orange"
                        : status.includes("Approved")
                        ? "green"
                        : "red"
                    }>
                    {role === 1
                      ? dataActivities !== undefined
                        ? dataActivities?.activity === "Borrow"
                          ? status === "Waiting approval"
                            ? "Menunggu Persetujuan"
                            : status === "Approved by Manager"
                            ? "Diterima Manager"
                            : status === "Rejected by Manager"
                            ? "Ditolak Manager"
                            : status === "Approved by Admin"
                            ? "Diterima"
                            : status === "Rejected by Admin"
                            ? "Ditolak Admin"
                            : "Dibatalkan"
                          : dataActivities?.activity === "Return"
                          ? status === "Waiting approval"
                            ? "Proses Pengembalian"
                            : "Dikembalikan"
                          : status === "Approved by Admin"
                          ? "Permintaan Pengembalian"
                          : "Dikembalikan"
                        : "test"
                      : role === 2
                      ? data?.activity === "Borrow"
                        ? status === "Waiting approval from Manager" ||
                          status === "Waiting approval from Admin"
                          ? "Menunggu Persetujuan"
                          : status === "Approved by Admin"
                          ? "Diterima"
                          : status === "Approved by Manager"
                          ? "Disetujui Manager"
                          : status === "Rejected by Manager"
                          ? "Ditolak Manager"
                          : status === "Rejected by Admin"
                          ? "Ditolak Admin"
                          : "Dibatalkan"
                        : data?.activity === "Return"
                        ? status === "Waiting approval"
                          ? "Menunggu Persetujuan Pengembalian"
                          : "Dikembalikan"
                        : status === "Approved by Admin"
                        ? "Permohonan Pengembalian"
                        : "Dikembalikan"
                      : status === "Waiting approval from Manager"
                      ? "Menunggu Persetujuan Manager"
                      : status === "Approved by Manager"
                      ? "Diterima Manager"
                      : "Ditolak Manager"}
                  </Tag>
                </Box>
                <Box w='50%'>
                  <Text fontSize='12px' fontWeight='bold'>
                    Waktu Pengajuan
                  </Text>
                  <Text fontSize='12px'>
                    {role === 1 ? (
                      moment(dataActivities?.request_date).format(
                        "h:mm A, DD MMM YYYY"
                      )
                    ) : (
                      <>
                        {data !== undefined
                          ? moment(data.request_time).format(
                              "h:mm A, DD MMM YYYY"
                            )
                          : `13:24 PM, 14 Feb 2022`}
                      </>
                    )}
                  </Text>
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
                    {role === 1 ? (
                      moment(dataActivities?.request_date).format(
                        "h:mm A, DD MMM YYYY"
                      )
                    ) : (
                      <>
                        {data !== undefined
                          ? moment(data.return_time).format(
                              "h:mm A, DD MMM YYYY"
                            ) === `6:59 AM, 01 Jan 10000`
                            ? "Belum Dikembalikan"
                            : moment(data.return_time).format(
                                "h:mm A, DD MMM YYYY"
                              )
                          : `13:24 PM, 14 Feb 2022`}
                      </>
                    )}
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
                    {dataActivities === undefined
                      ? data?.description
                      : dataActivities.description}
                  </Text>
                </Box>
              </Flex>
              <Flex
                display={role === 1 ? "none" : role === 2 ? "flex" : "none"}
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
                    {data !== undefined
                      ? data.User.division === "Store"
                        ? "Bahtiar Subrata"
                        : data.User.division === "Finance"
                        ? "Mohammad Pramudiono"
                        : data.User.division === "Legal"
                        ? "Bagus Brahmantya"
                        : data.User.division === "Human Capital"
                        ? "Salmaa"
                        : "Yahya Zakaria"
                      : "-"}
                  </Text>
                </Box>
                <Box display={data?.activity === "Borrow" ? "block" : "none"}>
                  {status === "Waiting approval from Manager" ? (
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
                  ) : status === "Waiting approval from Admin" ? (
                    <Text
                      cursor='pointer'
                      onClick={handleToManager}
                      fontSize='12px'
                      fontWeight='bold'
                      color='#2296CB'>
                      Minta Persetujuan
                    </Text>
                  ) : (
                    <Text fontSize='12px' fontWeight='bold' color='#2296CB'>
                      Disetujui
                    </Text>
                  )}
                </Box>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            {role === 1 ? (
              dataActivities?.activity === "Borrow" ? (
                status === "Waiting approval" ? (
                  <Flex gap='10px' justifyContent='end'>
                    <ButtonSecondary
                      title='Batalkan Pengajuan'
                      onclick={handleRejectReqEmployee}
                    />
                    <ButtonPrimary title='Kembali' onclick={onClose} />
                  </Flex>
                ) : status === "Approved by Manager" ? (
                  <Flex gap='10px' justifyContent='end'>
                    <ButtonSecondary
                      title='Batalkan Pengajuan'
                      onclick={handleRejectReqEmployee}
                      isDisabled={true}
                    />
                    <ButtonPrimary title='Kembali' onclick={onClose} />
                  </Flex>
                ) : status === "Approved by Admin" ? (
                  <Flex gap='10px' justifyContent='end'>
                    <ButtonSecondary title='Kembali' onclick={onClose} />
                    <ButtonPrimary
                      title='Ajukan Pengembalian'
                      onclick={handleReturnEmployee}
                    />
                  </Flex>
                ) : status === "Cancelled" ? (
                  <Flex gap='10px' justifyContent='end'>
                    <ButtonSecondary title='Kembali' onclick={onClose} />
                  </Flex>
                ) : (
                  <Flex gap='10px' justifyContent='end'>
                    <ButtonSecondary title='Kembali' onclick={onClose} />
                    <Box display='none'>
                      <ButtonPrimary
                        title='Ajukan Pengembalian'
                        onclick={handleReturnEmployee}
                      />
                    </Box>
                  </Flex>
                )
              ) : dataActivities?.activity === "Return" ? (
                status === "Waiting approval" ? (
                  <Flex gap='10px' justifyContent='end'>
                    <ButtonPrimary title='Kembali' onclick={onClose} />
                  </Flex>
                ) : (
                  <ButtonPrimary title='Kembali' onclick={onClose} />
                )
              ) : status === "Approved by Admin" ? (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonSecondary title='Kembali' onclick={onClose} />
                  <Box>
                    <ButtonPrimary
                      title='Ajukan Pengembalian'
                      onclick={handleReturnEmployee}
                    />
                  </Box>
                </Flex>
              ) : (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonPrimary title='Kembali' onclick={onClose} />
                </Flex>
              )
            ) : role === 2 ? (
              data?.activity === "Borrow" ? (
                status === "Waiting approval from Admin" ? (
                  <Flex gap='10px' justifyContent='end'>
                    <ButtonSecondary
                      title='Tolak'
                      onclick={onClose}
                      isDisabled={true}
                    />
                    <ButtonPrimary
                      title='Terima Permohonan'
                      isDisabled={true}
                    />
                  </Flex>
                ) : status === "Approved by Manager" ? (
                  <Flex gap='10px' justifyContent='end'>
                    <ButtonSecondary
                      title='Tolak Permohonan'
                      onclick={handleRejectReqAdmin}
                    />
                    <ButtonPrimary
                      title='Terima Permohonan'
                      onclick={handleAcceptReqAdmin}
                    />
                  </Flex>
                ) : status === "Approved by Admin" ? (
                  <Flex gap='10px' justifyContent='end'>
                    <ButtonSecondary title='Kembali' onclick={onClose} />
                    <ButtonPrimary
                      title='Ajukan Pengembalian'
                      onclick={handleAjukanPengembalian}
                    />
                  </Flex>
                ) : (
                  <Flex gap='10px' justifyContent='end'>
                    <ButtonSecondary
                      title='Tolak'
                      onclick={onClose}
                      isDisabled={true}
                    />
                    <ButtonPrimary
                      title='Terima Permohonan'
                      isDisabled={true}
                    />
                  </Flex>
                )
              ) : data?.activity === "Return" ? (
                status === "Waiting approval from Admin" ? (
                  <Flex gap='10px' justifyContent='end'>
                    {/* <ButtonSecondary
                    title='Kemb'
                    onclick={onClose}
                    isDisabled={true}
                  /> */}
                    <ButtonPrimary
                      title='Terima Permohonan'
                      onclick={handleAcceptReturn}
                    />
                  </Flex>
                ) : (
                  <Flex gap='10px' justifyContent='end'>
                    <ButtonSecondary title='Kembali' onclick={onClose} />
                    <ButtonPrimary
                      title='Terima Permohonan'
                      isDisabled={true}
                    />
                  </Flex>
                )
              ) : status === "Approved by Admin" ? (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonSecondary title='Kembali' onclick={onClose} />
                  <ButtonPrimary
                    title='Ajukan Pengembalian'
                    isDisabled={true}
                  />
                </Flex>
              ) : (
                <Flex gap='10px' justifyContent='end'>
                  <ButtonSecondary title='Kembali' onclick={onClose} />
                  <ButtonPrimary
                    title='Ajukan Pengembalian'
                    isDisabled={true}
                  />
                </Flex>
              )
            ) : // Punya manajer
            status === "Waiting approval from Manager" ? (
              <Flex gap='10px' justifyContent='end'>
                <ButtonSecondary
                  title='Tolak'
                  onclick={handleRejectReqManager}
                />
                <ButtonPrimary
                  title='Terima Permohonan'
                  onclick={handleAcceptReqManager}
                />
              </Flex>
            ) : status === "Approved by Manager" ? (
              <Flex gap='10px' justifyContent='end'>
                <ButtonPrimary title='Tutup' onclick={onClose} />
              </Flex>
            ) : status === "Approved by Admin" ? (
              <Flex gap='10px' justifyContent='end'>
                <ButtonPrimary title='Tutup' onclick={onClose} />
              </Flex>
            ) : (
              <Flex gap='10px' justifyContent='end'>
                <ButtonPrimary title='Tutup' onclick={onClose} />
              </Flex>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
