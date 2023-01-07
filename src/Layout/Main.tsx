import { Center, Container, Flex, SimpleGrid, Spacer } from '@chakra-ui/react'
import React, { useContext } from 'react'
import TaskCard from '../Components/TaskCard'
import { TasksContext } from '../Contexts/TaskContext'
import { ITask, TaskContextType } from '../types/Task'

type Props = {}

const Main = (props: Props) => {

    const { tasks } = useContext(TasksContext) as TaskContextType

    return (
        <Container maxW='none' w='100%' bgColor='layoutBg' m='20px' borderRadius='20px'>

                <SimpleGrid  minChildWidth='200px' spacing={8} p='30px'>
                    {!tasks.length && <h1> no tasks</h1>}
                    {tasks &&
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