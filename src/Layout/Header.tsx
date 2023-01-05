import { Center, Container, Heading } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
  <Container maxW='none' w='100%' bgColor='layoutBg' h='20vh'>
    <Center w='100%' h='100%'>
        <Heading as='h1' color='fontColor'>TodoList + TS</Heading>
    </Center>
    
  </Container>
  )
}

export default Header