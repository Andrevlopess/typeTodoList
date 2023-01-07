import { Avatar, Center, Container, Divider, Flex, Heading, ModalOverlay, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faList,
  faListCheck,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import EuImg from '../imgs/euimg.jpeg'
import FormModal from '../Components/FormModal'
type Props = {}

const Header = (props: Props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <Flex w='20vw' minW='250px' bgColor='layoutBg' m='20px' borderRadius='20px' flexDirection='column'>
      <Flex w='100%' h='10%' px='10px' alignItems='center' >
        <Avatar name='dedeLopes' src={EuImg} />
        <Text color='txtColor' mx='10px'>Andre V Lopes</Text>
      </Flex>
      <Divider />
      <VStack my='50px' spacing={6}>
        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px'>
          <FontAwesomeIcon icon={faList as IconProp} color='#d1d1d1' fontSize='20px' />
          <Text fontWeight='bold' color='txtColor' ml='10px'>All tasks</Text>
        </Flex>
        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px'>
          <FontAwesomeIcon icon={faListCheck as IconProp} color='#d1d1d1' fontSize='20px' />
          <Text fontWeight='bold' color='txtColor' ml='10px'>Done tasks</Text>
        </Flex>
        <Divider />
        <Text fontWeight='bold' color='txtColor' ml='10px'>Create a new Task for Today</Text>

        <Center w='90%' h='100px' bgColor='compBg' px='20px' py='10px' borderRadius='10px'
          onClick={() => onOpen()}>
       
          <FontAwesomeIcon icon={faPlus as IconProp} color='#d1d1d1' fontSize='20px' />
        </Center>
      </VStack>

      <FormModal open={isOpen} close={onClose}/>
    </Flex>

  )
}

export default Header