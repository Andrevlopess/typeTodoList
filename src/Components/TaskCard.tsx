import React, { useContext } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Text, Flex, Button, VStack, HStack, useDisclosure, IconProps, Center, Spacer, Divider, Fade, Badge } from '@chakra-ui/react'
import { ITask, TaskContextType } from '../types/Task'
import { TasksContext } from '../Contexts/TaskContext'
import UpdateModal from './UpdateModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
    faCheck,
    faCircleExclamation,
    faPenToSquare,
    faTrash
} from '@fortawesome/free-solid-svg-icons'

type Props = {
    task: ITask
}
const TaskCard = ({ task }: Props) => {

    const { tasks, deleteTask } = useContext(TasksContext) as TaskContextType
    const { isOpen, onOpen, onClose } = useDisclosure()

    // function handleConcludeTask(id: number) {
    //     concludeTasks(id)
    // }
    // function handleDeleteTask(id: number) {
    //     deleteTask(id)
    // }

    return (
        <>
            <Card bgColor={task.color} borderRadius='15px' _hover={{ transform: 'scale(1.1)' }} transition='250ms'
                boxShadow={task.done ? '0 0 10px green' : '0 5px 30px black'}
                filter='auto' brightness={task.done ? '60%' : '100%'}
            >
                <CardBody>
                    <Flex alignItems='flex-start' justifyContent='space-between'>
                        <Text color='txtColor' fontSize='4xl'>{tasks.findIndex(tsk => tsk.id === task.id) + 1}</Text>
                        {task.type === "Important" &&

                            <FontAwesomeIcon icon={faCircleExclamation as IconProp} color='#d1d1d1' fontSize='25px' />
                        }
                    </Flex>

                    <Text color='txtColor' fontSize='xl' mx='5px'>{task.title}</Text>

                    <Divider my='10px' />
                    <Text color='descColor' as='i'>
                        {task.description && `"${task.description}"`}
                    </Text>
                </CardBody>
                <CardFooter>
                    <Flex w='100%'>
                        {!task.done &&
                            <Center bgColor='compBg' p='10px' borderRadius='5px'
                               // onClick={() => handleConcludeTask(task.id)}
                            >
                                <FontAwesomeIcon icon={faCheck as IconProp} color='#5F8D4E' />
                            </Center>
                        }

                        <Spacer />

                        {!task.done &&
                            <Center bgColor='compBg' p='10px' borderRadius='5px' mr='10px'
                                onClick={() => { onOpen() }}>
                                <FontAwesomeIcon icon={faPenToSquare as IconProp} color='#D1D1D1' />
                            </Center>
                        }


                        <Center bgColor='compBg' p='10px' borderRadius='5px'
                           onClick={() => deleteTask(task.id)}
                        >
                            <FontAwesomeIcon icon={faTrash as IconProp} color='#B73E3E'
                            />
                        </Center>

                    </Flex>

                </CardFooter>
            </Card>
            <UpdateModal close={onClose} open={isOpen} task={task} />
        </>
    )
}

export default TaskCard