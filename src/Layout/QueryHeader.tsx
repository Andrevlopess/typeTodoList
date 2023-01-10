import { Avatar, Box, Center, Container, Divider, Flex, Grid, Heading, ModalOverlay, SimpleGrid, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
    faList,
    faListCheck,
    faPlus,
    faList12,
    faCircleExclamation,
    faC
} from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
import EuImg from '../imgs/euimg.jpeg'
import FormModal from '../Components/FormModal'
import { TaskContextType } from '../types/Task'
import { TasksContext } from '../Contexts/TaskContext'

type Props = {}

const QueryHeader = (props: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const {
        defineCurrentTasks,
    } = useContext(TasksContext) as TaskContextType



    return (
        <Flex w='100%' bgColor='layoutBg' m='20px' borderRadius='20px' flexDirection='column' alignItems='center'
     p='10px' >
            <Flex alignItems='center' py='40px' justifyContent='space-between'>
                <Avatar name='Andre v Lopes' src={EuImg} size='lg' />
                <Text color='txtColor' fontWeight='bold' ml='10px' fontSize='2xl'>Andre V Lopes</Text>
            </Flex>
            <Flex w='100%' alignItems='center' justifyContent='center'>
                <SimpleGrid columns={2} spacing={4}>

                    <Flex w='100%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'
                        onClick={() => { defineCurrentTasks('AllTasks') }}
                    >
                        <Flex alignItems='center'>
                            <FontAwesomeIcon icon={faList as IconProp} color='#d1d1d1' fontSize='20px' />
                            <Text fontWeight='bold' color='txtColor' ml='10px'>All Tasks</Text>
                        </Flex>
                    </Flex>
                    <Flex w='100%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'
                        onClick={() => { defineCurrentTasks('doneTasks') }}
                    >
                        <Flex alignItems='center'>
                            <FontAwesomeIcon icon={faListCheck as IconProp} color='#d1d1d1' fontSize='20px' />
                            <Text fontWeight='bold' color='txtColor' ml='10px'>Done tasks</Text>
                        </Flex>
                    </Flex>
                    <Flex w='100%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'
                        onClick={() => { defineCurrentTasks('pendingTasks') }}
                    >
                        <Flex alignItems='center'>
                            <FontAwesomeIcon icon={faList12 as IconProp} color='#d1d1d1' fontSize='20px' />
                            <Text fontWeight='bold' color='txtColor' ml='10px'>Pending</Text>
                        </Flex>
                    </Flex>
                    <Flex w='100%' bgColor='compBg' px='20px' py='10px' alignItems='center' borderRadius='10px' justifyContent='space-between'
                        onClick={() => { defineCurrentTasks('ImportantTasks') }}
                    >
                        <Flex alignItems='center'>
                            <FontAwesomeIcon icon={faCircleExclamation as IconProp} color='#d1d1d1' fontSize='20px' />
                            <Text fontWeight='bold' color='txtColor' ml='10px'>Important</Text>
                        </Flex>
                    </Flex>
                </SimpleGrid>
            </Flex>
            <Center w='100%' h='100px' bgColor='desktopBg' px='20px' my='20px' borderRadius='10px'
                onClick={() => onOpen()}>

                <FontAwesomeIcon icon={faPlus as IconProp} color='white' fontSize='20px' />
            </Center>

            <FormModal open={isOpen} close={onClose} />
        </Flex>

    )
}

export default QueryHeader
