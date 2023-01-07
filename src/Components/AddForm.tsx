import { Button, Flex, FormControl, Input, Spacer, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { TasksContext } from '../Contexts/TaskContext'
import { ITask, TaskContextType } from '../types/Task'

type Props = {}

const AddForm = (props: Props) => {

    const {saveTasks} = useContext(TasksContext) as TaskContextType

    const [taskData, setTaskData] = useState<ITask | {}>()


    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setTaskData({
            ...taskData,
            [e.currentTarget.id]: e.currentTarget.value,
        }); 
      
    }
    const handleSaveTodo = (e: React.FormEvent, taskData: ITask | any) => {
        e.preventDefault();
        saveTasks(taskData);
      };


    return (
        <form onSubmit={ (e) => handleSaveTodo(e, taskData)}>
            <Flex w='50vw' h='40vh'
                bgColor='fontColor'
                flexDirection='column'
                p='20px'
                alignItems='center'
                justifyContent='center'>

                <Text color='compBg' fontSize='xl'>Task Title</Text>
                <Input variant='filled' onChange={handleForm} id="title" isRequired />
                <Spacer />

                <Text color='compBg' fontSize='xl'>Task Difficulty</Text>
                <Input variant='filled' type='number' onChange={handleForm} id="difficulty" isRequired/>

                <Spacer />

                <Button w='40%' type='submit' disabled={ taskData === undefined ? true : false} >Add Task</Button>
            </Flex>
        </form>

    )
}

export default AddForm