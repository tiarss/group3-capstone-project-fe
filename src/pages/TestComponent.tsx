import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { ButtonPrimary, ButtonSecondary, ButtonTertier } from '../components/Button'
import CardDetail from '../components/DetailCard'
import { InputText } from '../components/Input'
import ModalDetailAsset from '../components/Modal/detail-asset'
import ModalAddAssets from '../components/Modal/tambah-asset'
import { ModalActivity } from '../components/ModalActivity'
import { RequestModal } from '../components/RequestModal'

export const TestComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex gap="20px">
      <Button onClick={onOpen}>Open Modal</Button>
      <ModalDetailAsset isOpen={isOpen} onClose={onClose}/>
      <CardDetail/>
       <ButtonPrimary title='Ajukan Permohonan' />
       <ButtonSecondary title='Kembali' />
       <ButtonTertier title='Kirim Permohonan' />
       <Box>
          <InputText title='Name'/>
          <InputText title='Password'/>
       </Box>
       <RequestModal />
       {/* <ModalActivity /> */}
    </Flex>
  )
}
