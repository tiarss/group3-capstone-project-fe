import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { ButtonPrimary, ButtonSecondary, ButtonTertier } from '../components/Button'
import { InputText } from '../components/Input'
import ModalAddAssets from '../components/Modal'

export const TestComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex gap="20px">
      <Button onClick={onOpen}>Open Modal</Button>
      <ModalAddAssets isOpen={isOpen} onClose={onClose}/>
    </Flex>
  )
}
