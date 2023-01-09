import { Avatar, Box, Center, Container, Divider, Flex, Heading, ModalOverlay, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faList,
  faListCheck,
  faPlus,
  faList12
} from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
import EuImg from '../imgs/euimg.jpeg'
import FormModal from '../Components/FormModal'
import { TaskContextType } from '../types/Task'
import { TasksContext } from '../Contexts/TaskContext'

type Props = {}

const Header = (props: Props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    defineCurrentTasks,
    getAllTasks,
    getDoneTasks,
    getPendingTasks
  } = useContext(TasksContext) as TaskContextType



  return (
    <Flex w='20vw' minW='250px' bgColor='layoutBg' m='20px' borderRadius='20px' flexDirection='column'>
      <Flex w='100%' p='10px' alignItems='center' >
        <Avatar name='dedeLopes' src={EuImg} />
        <Text color='txtColor' mx='10px'>Andre V Lopes</Text>
      </Flex>
      <Divider />
      <VStack my='50px' spacing={6}>
        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'

          onClick={() => { defineCurrentTasks('AllTasks') }}
        >
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faList as IconProp} color='#d1d1d1' fontSize='20px' />
            <Text fontWeight='bold' color='txtColor' ml='10px'>All tasks</Text>
          </Flex>

          <Text color='grey'>{`(${getAllTasks().length})`}</Text>
        </Flex>
        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px'
          justifyContent='space-between'
          onClick={() => { defineCurrentTasks('doneTasks') }}
        >
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faListCheck as IconProp} color='#d1d1d1' fontSize='20px' />
            <Text fontWeight='bold' color='txtColor' ml='10px'>Done tasks</Text>
          </Flex>


          <Text color='grey'>{`(${getDoneTasks().length})`}</Text>

        </Flex>
        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'
          onClick={() => { defineCurrentTasks('pendingTasks') }}
        >
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faList12 as IconProp} color='#d1d1d1' fontSize='20px' />
            <Text fontWeight='bold' color='txtColor' ml='10px'>Pending Tasks</Text>
          </Flex>


          <Text color='grey'>{`(${getPendingTasks().length})`}</Text>
        </Flex>
        <Divider />
        <Text fontWeight='bold' color='txtColor' ml='10px'>Create a new Task for Today</Text>

        <Center w='90%' h='100px' bgColor='txtColor' px='20px' py='10px' borderRadius='10px'
          onClick={() => onOpen()}>

          <FontAwesomeIcon icon={faPlus as IconProp} color='#292929' fontSize='20px' />
        </Center>
      </VStack>
      <Divider/>
      <Flex flexDirection='column' justifyContent='center' w='100%' mb='30px' px='10px'>
        {!!getAllTasks().length &&
          getAllTasks().map((task) => {
            return (
              <Box key={task.id}>
                <Flex p='10px' alignItems='baseline' >
                  <Text color='txtColor' fontSize='2xl'>{getAllTasks().findIndex(tsk => tsk.id === task.id) + 1}</Text>
                  <Text color='txtColor' px='10px' w='90%'>{task.title}</Text>
                </Flex>

                <Divider />
              </Box>

            )
          })

        }
      </Flex>

      <FormModal open={isOpen} close={onClose} />
    </Flex>

  )
}

export default Header