import { Button, Center, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Contexts/Auth/AuthContext'
import { TasksContext } from '../Contexts/TaskContext'
import { AuthContextType, TaskContextType } from '../types/Task'

type Props = {}

const Home = (props: Props) => {

    const { currentUser } = useContext(AuthContext) as AuthContextType
   

    return (
        <Container maxW='none' w='100%' minH='100vh' bgColor='desktopBg'>
            <Flex flexDirection='column' w='100%' alignItems='center'>
                <Heading color='txtColor' size='4xl' fontWeight='bold'>Home</Heading>
                {currentUser &&
                    <Text color='txtColor'>{currentUser.displayName}</Text>
                }

                <Button>
                    <Link to='/myTasks'>
                        Get Started
                    </Link>
                </Button>
                {!currentUser &&
                    <Button>
                        <Link to='/myTasks'>
                            Login
                        </Link>
                    </Button>
                }
            </Flex>



        </Container>
    )
}

export default Home