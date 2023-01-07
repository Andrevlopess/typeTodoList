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
        <Container maxW='none' w='100%' bgColor='layoutBg' m='20px' borderRadius='20px'>
                {/* <AddForm /> */}

                <SimpleGrid columns={4} spacing={8} p='30px'>
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