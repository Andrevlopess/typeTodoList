import { Container } from '@chakra-ui/react'
import React from 'react'
import AddForm from '../Components/AddForm'

type Props = {}

const Main = (props: Props) => {
  return (
    <Container  maxW='none' w='100%' bgColor='mainBg'>
        <AddForm/>
       
    </Container>
  )
}

export default Main