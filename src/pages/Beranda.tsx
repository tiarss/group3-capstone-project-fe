import {
  Box,
  Flex,
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
import { useState } from "react";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonTertier,
} from "../components/Button";
import { Header } from "../components/Header";
import { ModalActivity } from "../components/ModalActivity";
import { ResumeCard } from "../components/ResumeCard";
import SliderImage from "../components/Slider";

export const Beranda = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(1);
  const [activePage, setPage] = useState(1);
  const handlePage = (value: number) => {
    console.log(value);
    setPage(value);
  };
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <Header />
      <Box
        padding='50px 100px'
        bgColor='#EFEFEF'
        display='flex'
        flexDir='column'
        gap='20px'>
        <Box display='flex' gap='20px'>
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
            height='200px'
            minW='249px'
            maxW='250px'
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
            <Flex alignItems='center' justifyContent='space-between' mb='20px'>
              <Text fontSize='16px' fontWeight='semibold' textAlign='left'>
                Permohonan Terbaru
              </Text>
              <Flex gap='10px'>
                <ButtonSecondary title='Pengajuan Aset Baru' />
                <ButtonPrimary title='Peminjaman Aset' />
              </Flex>
            </Flex>
            {role === 1 || role === 2 ? (
              <Table size='sm' borderRadius='20px'>
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
                  <Tr>
                    <Td>1</Td>
                    <Td>12:22 WIB, 11 Jan 2022</Td>
                    <Td>Peminjaman Aset</Td>
                    <Td>Headphone</Td>
                    <Td>dBe DJ80 Foldable DJ...</Td>
                    <Td>
                      <ButtonTertier title='Details' onclick={handleOpen} />
                    </Td>
                  </Tr>
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
                      <ButtonTertier title='Details' onclick={handleOpen} />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>1</Td>
                    <Td>12:22 WIB, 11 Jan 2022</Td>
                    <Td>Bahtiar Subrata</Td>
                    <Td>Headphone</Td>
                    <Td>dBe DJ80 Foldable DJ...</Td>
                    <Td>
                      <Tag colorScheme='green'>Disetujui</Tag>
                    </Td>
                    <Td>
                      <ButtonTertier title='Details' onclick={handleOpen} />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>1</Td>
                    <Td>12:22 WIB, 11 Jan 2022</Td>
                    <Td>Bahtiar Subrata</Td>
                    <Td>Headphone</Td>
                    <Td>dBe DJ80 Foldable DJ...</Td>
                    <Td>
                      <Tag colorScheme='red'>Ditolak</Tag>
                    </Td>
                    <Td>
                      <ButtonTertier title='Details' onclick={handleOpen} />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            )}
            <Flex mt='10px' justifyContent='center'>
              <Pagination
                total={Math.ceil(20 / 5)}
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
        activity='history'
        role={1}
        status='Approved by Admin'
      />
    </div>
  );
};
