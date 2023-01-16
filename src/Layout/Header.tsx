import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Avatar, Box, Button, Center, Container, Divider, Flex, Heading, ModalOverlay, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faList,
  faListCheck,
  faPlus,
  faList12,
  faCircleExclamation,
  faUserMinus,
  faUser,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'

import FormModal from '../Components/FormModal'
import { AuthContextType, TaskContextType } from '../types/Task'
import { TasksContext } from '../Contexts/TaskContext'
import { AuthContext } from '../Contexts/Auth/AuthContext'
import AccountSettingDrawer from '../Components/AccountSettingsDrawer'

type Props = {}

const Header = (props: Props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { currentUser, cleanUser } = useContext(AuthContext) as AuthContextType

  const {
    tasks,
    getTasks,
    getFilterTasks } = useContext(TasksContext) as TaskContextType

  return (
    <Flex w='20vw' minW='250px' bgColor='layoutBg' m='20px' borderRadius='20px' flexDirection='column' >
      <Flex w='100%' p='10px' alignItems='center' >

        <Flex w='100%' justifyContent='space-between' alignItems='center' px='10px'>

          <Flex alignItems='center'>
            <Avatar
              name={`${currentUser && currentUser.displayName}`}
              src={`${currentUser && currentUser.photoURL}`} />
            <Text color='txtColor' mx='10px'>{currentUser && currentUser.displayName}</Text>
          </Flex>

          <AccountSettingDrawer/>
        </Flex>

      </Flex>
      <Divider />
      <VStack my='50px' spacing={6}>
        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'
          onClick={() => getTasks()}
        >
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faList as IconProp} color='#d1d1d1' fontSize='20px' />
            <Text fontWeight='bold' color='txtColor' ml='10px'>All tasks</Text>
          </Flex>

        </Flex>
        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px'
          justifyContent='space-between'
          onClick={() => { getFilterTasks("Done") }}
        >
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faListCheck as IconProp} color='#d1d1d1' fontSize='20px' />
            <Text fontWeight='bold' color='txtColor' ml='10px'>Done Tasks</Text>
          </Flex>




        </Flex>
        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'
          onClick={() => { getFilterTasks("Pending") }}
        >
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faList12 as IconProp} color='#d1d1d1' fontSize='20px' />
            <Text fontWeight='bold' color='txtColor' ml='10px'>Pending Tasks</Text>
          </Flex>



        </Flex>

        <Flex w='90%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'
          onClick={() => { getFilterTasks("Important") }}
        >
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faCircleExclamation as IconProp} color='#d1d1d1' fontSize='20px' />
            <Text fontWeight='bold' color='txtColor' ml='10px'>Important Tasks</Text>
          </Flex>



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
      <Flex flexDirection='column' justifyContent='center' w='100%' mb='30px' px='10px' my='20px'>
        <Accordion allowMultiple>
          <AccordionItem bgColor='desktopBg' borderRadius='5px' border='none'>
           
              <AccordionButton w='100%' display='flex' justifyContent='space-between' >
                <Text color='txtColor'>My Tasks</Text>
                <FontAwesomeIcon icon={faChevronDown} color='#d1d1d1' />
              </AccordionButton>
            {!!tasks.length &&
              tasks.map((task) => {
                return (
                  <AccordionPanel display='flex' alignItems='center' borderTop='1px' borderColor='txtColor' py='8px' key={task.id}>
                    <Text color='txtColor' fontSize='2xl'>{tasks.findIndex(tsk => tsk.id === task.id) + 1}</Text>
                    <Text color='txtColor' px='10px' w='90%'>{task.title}</Text>
                    {task.type === "Important" &&
                      <FontAwesomeIcon icon={faCircleExclamation as IconProp} color='#d1d1d1' fontSize='20px' />
                    }
                  </AccordionPanel>


                )
              })
            }
            </AccordionItem>
        </Accordion>
      </Flex>

      <FormModal open={isOpen} close={onClose} />
    </Flex>

  )
}

export default Header