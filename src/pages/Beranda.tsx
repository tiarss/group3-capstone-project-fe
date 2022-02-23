import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { ButtonPrimary, ButtonSecondary, ButtonTertier } from "../components/Button";
import { Header } from "../components/Header";
import { ResumeCard } from "../components/ResumeCard";
import SliderImage from "../components/Slider";

export const Beranda = () => {
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
        <Box>
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
            <Flex alignItems="center" justifyContent="space-between" mb='20px'>
              <Text
                fontSize='16px'
                fontWeight='semibold'
                textAlign='left'>
                Permohonan Terbaru
              </Text>
              <Flex gap="10px">
                <ButtonSecondary title="Pengajuan Aset Baru" />
                <ButtonPrimary title="Peminjaman Aset" />
              </Flex>
            </Flex>
            <Table size='sm' borderRadius='20px'>
              <Thead bgColor='teal.200'>
                <Tr>
                  <Th>No</Th>
                  <Th>Tanggal</Th>
                  <Th>Jenis Aktivitas</Th>
                  <Th>Kategori Aset</Th>
                  <Th>Barang</Th>
                  <Th></Th>
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
          </Box>
        </Box>
      </Box>
    </div>
  );
};
