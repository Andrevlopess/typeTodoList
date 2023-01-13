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
    Spinner,
} from '@chakra-ui/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import TaskCard from '../Components/TaskCard'
import { TasksContext } from '../Contexts/TaskContext'
import { ITask, TaskContextType } from '../types/Task'

type Props = {}

const Main = (props: Props) => {

    const { tasks, isLoading } = useContext(TasksContext) as TaskContextType

    return (
        <Container maxW='none' w='100%' bgColor='layoutBg' m='20px' borderRadius='20px'>
            <Flex w='100%' justifyContent='space-between' my='20px' alignItems='center' p='10px'>

                <Heading fontWeight='bold' color='txtColor' size='3xl'>My tasks</Heading>
                {!!tasks.length &&
                    <Popover placement='bottom-start'>
                        <PopoverTrigger>
                            <Button bgColor='compBg' color='txtColor' _hover={{ color: 'compBg', bgColor: 'txtColor' }}>
                                <FontAwesomeIcon icon={faTrash as IconProp} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent bgColor='compBg' color='txtColor' border='none'>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Confirm to clear all the Tasks</PopoverHeader>
                            <PopoverBody>
                                <Button bgColor='txtColor' color='compBg' w='100%'
                                    _hover={{ color: 'txtColor', bgColor: 'compBg' }}
                                //</PopoverBody> onClick={clearTasks} 
                                >
                                    <FontAwesomeIcon icon={faTrash as IconProp} />
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                }


            </Flex>

            <SimpleGrid minChildWidth='200px' spacing={8} p='30px'>
                {isLoading &&
                    <Center h='400px'>
                        <Spinner color='txtColor' boxSize='100px' thickness='5px' speed='.6s' />
                    </Center>
                }

                {tasks && !isLoading &&
                    tasks.map((task: ITask) => {
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