import {
    Button, Center, Container, Flex, SimpleGrid, Spacer,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Heading,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import TaskCard from '../Components/TaskCard'
import { TasksContext } from '../Contexts/TaskContext'
import { ITask, TaskContextType } from '../types/Task'

type Props = {}

const Main = (props: Props) => {

    const { currentTasks, clearTasks } = useContext(TasksContext) as TaskContextType

    return (
        <Container maxW='none' w='100%' bgColor='layoutBg' m='20px' borderRadius='20px'>
            <Flex w='100%' justifyContent='space-between' my='20px' alignItems='center' p='10px'>

                <Heading fontWeight='bold' color='txtColor' size='3xl'>My tasks</Heading>

                {!!currentTasks.length &&
                    <Popover placement='left-start'>
                        <PopoverTrigger>
                            <Button bgColor='compBg' color='txtColor' _hover={{ color: 'compBg', bgColor: 'txtColor' }}>Clear tasks</Button>
                        </PopoverTrigger>
                        <PopoverContent bgColor='compBg' color='txtColor' border='none'>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Confirm to clear all the Tasks</PopoverHeader>
                            <PopoverBody>
                                <Button bgColor='txtColor' color='compBg' w='100%'
                                    _hover={{ color: 'txtColor', bgColor: 'compBg' }}
                                    onClick={clearTasks} >Clear tasks</Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                }


            </Flex>
            {!currentTasks.length &&
                <Center mt='200px' >
                    <Heading color='txtColor'>You have no tasks for today</Heading>
                </Center>
            }
            <SimpleGrid minChildWidth='200px' spacing={8} p='30px'>

                {currentTasks &&
                    currentTasks.map((task: ITask) => {
                        return (
                            <TaskCard task={task} key={task.id} />
                        )
                    })
                }
            </SimpleGrid>

        </Container>
    )
}

export default Main



//                 