import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { ButtonPrimary, ButtonSecondary, ButtonTertier } from '../components/Button'
import { InputText } from '../components/Input'
import ModalDetailAsset from '../components/Modal/detail-asset'
import ModalAddAssets from '../components/Modal/tambah-asset'

export const TestComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex gap="20px">
      <Button onClick={onOpen}>Open Modal</Button>
      <ModalDetailAsset isOpen={isOpen} onClose={onClose}/>
    </Flex>
  )
}
