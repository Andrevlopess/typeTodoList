import { Avatar, Box, Button, Center, Container, Divider, Flex, Heading, ModalOverlay, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faList,
  faListCheck,
  faPlus,
  faList12,
  faCircleExclamation,
  faUserMinus,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'

import FormModal from '../Components/FormModal'
import { AuthContextType, TaskContextType } from '../types/Task'
import { TasksContext } from '../Contexts/TaskContext'
import { AuthContext } from '../Contexts/Auth/AuthContext'

type Props = {}

const Header = (props: Props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { currentUser, cleanUser } = useContext(AuthContext) as AuthContextType
  const {tasks} = useContext(TasksContext) as TaskContextType

  return (
    <Flex w='20vw' minW='250px' bgColor='layoutBg' m='20px' borderRadius='20px' flexDirection='column'>
      <Flex w='100%' p='10px' alignItems='center' >

        <Flex w='100%' justifyContent='space-between' alignItems='center' px='10px'>

          <Flex alignItems='center'>
            <Avatar
              name={`${currentUser && currentUser.displayName}`}
              src={`${currentUser && currentUser.photoURL}`} />
            <Text color='txtColor' mx='10px'>{currentUser && currentUser.displayName}</Text>
          </Flex>

          <FontAwesomeIcon icon={faUserMinus as IconProp} color='#d1d1d1' onClick={cleanUser}/>
        </Flex>

      </Flex>
      <Divider />
      <VStack my='50px' spacing={6}>
        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'

         // onClick={() => { defineCurrentTasks('AllTasks') }}
        >
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faList as IconProp} color='#d1d1d1' fontSize='20px' />
            <Text fontWeight='bold' color='txtColor' ml='10px'>All tasks</Text>
          </Flex>

          <Text color='grey'>{`(${tasks.length})`}</Text>
        </Flex>
        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px'
          justifyContent='space-between'
          //onClick={() => { defineCurrentTasks('doneTasks') }}
        >
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faListCheck as IconProp} color='#d1d1d1' fontSize='20px' />
            <Text fontWeight='bold' color='txtColor' ml='10px'>Done Tasks</Text>
          </Flex>


          <Text color='grey'>{`(99)`}</Text>

        </Flex>
        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'
         // onClick={() => { defineCurrentTasks('pendingTasks') }}
        >
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faList12 as IconProp} color='#d1d1d1' fontSize='20px' />
            <Text fontWeight='bold' color='txtColor' ml='10px'>Pending Tasks</Text>
          </Flex>


          <Text color='grey'>{`(99)`}</Text>
        </Flex>

        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'
         // onClick={() => { defineCurrentTasks('ImportantTasks') }}
        >
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faCircleExclamation as IconProp} color='#d1d1d1' fontSize='20px' />
            <Text fontWeight='bold' color='txtColor' ml='10px'>Important Tasks</Text>
          </Flex>


          <Text color='grey'>{`(99)`}</Text>
        </Flex>
        <Divider />
        <Text fontWeight='bold' color='txtColor' ml='10px'>Create a new Task for Today</Text>

        <Center w='90%' h='100px' bgColor='txtColor' px='20px' py='10px' borderRadius='10px'
          onClick={() => onOpen()}
         >

          <FontAwesomeIcon icon={faPlus as IconProp} color='#292929' fontSize='20px' />
        </Center>
      </VStack>
      <Divider />
      <Flex flexDirection='column' justifyContent='center' w='100%' mb='30px' px='10px'>
        {!!tasks.length &&
          tasks.map((task) => {
            return (
              <Box key={task.id}>
                <Flex p='10px' alignItems='baseline'  >

                  <Text color='txtColor' fontSize='2xl'>{tasks.findIndex(tsk => tsk.id === task.id) + 1}</Text>
                  <Text color='txtColor' px='10px' w='90%'>{task.title}</Text>
                  {task.type === "Important" &&
                    <FontAwesomeIcon icon={faCircleExclamation as IconProp} color='#d1d1d1' fontSize='20px' />
                  }
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