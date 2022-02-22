import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { ButtonPrimary, ButtonSecondary, ButtonTertier } from '../components/Button'
import { InputText } from '../components/Input'

export const TestComponent = () => {
  return (
    <Flex gap="20px">
       <ButtonPrimary title='Ajukan Permohonan' />
       <ButtonSecondary title='Kembali' />
       <ButtonTertier title='Kirim Permohonan' />
       <Box>
          <InputText title='Name'/>
          <InputText title='Password'/>
       </Box>
    </Flex>
  )
}
