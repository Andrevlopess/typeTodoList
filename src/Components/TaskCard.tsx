import React, { useContext, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Text, Flex, Button, VStack, HStack, useDisclosure, IconProps, Center, Spacer, Divider, Fade, Badge, Spinner } from '@chakra-ui/react'
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
import { isDeleteExpression } from 'typescript'

type Props = {
    task: ITask
}
const TaskCard = ({ task }: Props) => {

    const { tasks,
        deleteTask,
        concludeTask,
        isDeleteTaskLoading,
        isConcludeTaskLoading,
    } = useContext(TasksContext) as TaskContextType
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [deletingCard, setDeletingCard] = useState<number>()
    const [concludingCard, setConcludingCard] = useState<number>()

    function handleConcludeTask(id: number) {
        setConcludingCard(id)
        concludeTask(id)
    }
    function handleDeleteTask(id: number) {
        setDeletingCard(id)
        deleteTask(id)
    }

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
                                onClick={() => handleConcludeTask(task.id)}
                            >
                                {isConcludeTaskLoading && concludingCard === task.id ?

                                    <Spinner color='#54B435' thickness='3px' />
                                    :
                                    <FontAwesomeIcon icon={faCheck as IconProp} color='#54B435' />
                                }

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
                            onClick={() => handleDeleteTask(task.id)}
                        >

                            {isDeleteTaskLoading && deletingCard === task.id ?

                                <Spinner color='#B73E3E' thickness='3px' />
                                :
                                <FontAwesomeIcon icon={faTrash as IconProp} color='#B73E3E' />
                            }

                        </Center>

                    </Flex>

                </CardFooter>
            </Card>
            <UpdateModal close={onClose} open={isOpen} task={task} />
        </>
    )
}

export default TaskCard