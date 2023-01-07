import { Center, Container, Flex, SimpleGrid, Spacer } from '@chakra-ui/react'
import React, { useContext } from 'react'
import AddForm from '../Components/AddForm'
import TaskCard from '../Components/TaskCard'
import { TasksContext } from '../Contexts/TaskContext'
import { ITask, TaskContextType } from '../types/Task'

type Props = {}

const Main = (props: Props) => {

    const { tasks } = useContext(TasksContext) as TaskContextType

    return (
        <Container maxW='none' w='60vw' bgColor='layoutBg' minH='100vh'>
            <Flex w='100%' h='100%' py='30px' alignItems='flex-start' justifyContent='space-between' flexDirection='column'>
                <AddForm />

                <Flex flexDirection='column' w='100%'>
                    {tasks &&
                        tasks.map((task: ITask) => {
                            return (
                                <TaskCard task={task} key={task.id} />
                            )
                        })
                    }
                </Flex>


            </Flex>
        </Container>
    )
}

export default Main