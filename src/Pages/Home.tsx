import { Button,  Container, Flex, Heading, Highlight, Show, SimpleGrid, Text } from '@chakra-ui/react'
import { faCircleExclamation, faList, faList12, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Contexts/Auth/AuthContext'
import { AuthContextType } from '../types/Task'
import CheckListIMG from '../Images/CheckListIMG'
import TasksCardsIMG from '../Images/TasksCardsIMG'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { MobileTasksCard } from '../Images/MobileTasksCards'

type Props = {}

const Home = (props: Props) => {

    const navigate = useNavigate()


    return (
        <Container maxW='none' w='100%' minH='100vh' bgColor='desktopBg' m='0' p='0'>
            <Flex w='100%' p='20px' alignItems='center' justifyContent='flex-end'>
                <Flex>

                    <Button bgColor='compBg' color='txtColor' mx='5px' _hover={{}}
                        onClick={() => navigate('/myTasks')}>My Tasks</Button>

                    <Button bgColor='compBg' color='txtColor' mx='5px' _hover={{}}
                        onClick={() => navigate('/myTasks')}>Sign In</Button>

                </Flex>
            </Flex>
            <Flex w='100%' justifyContent='space-between'>
                <Flex flexDirection='column' w='100%' p='60px'>
                    <Heading color='txtColor' fontWeight='900' fontSize='4.8em' mb='30px'>
                        <Highlight query='Todo' styles={{ color: 'txtY', fontWeight: '900' }}>TypeTodo</Highlight>
                    </Heading>
                    <Text color='txtColor' fontSize='25px'>Your website to manage your daily tasks!</Text>
                </Flex>

                <CheckListIMG />
            </Flex>

            <Show breakpoint='(min-width: 500px)'>
                <Flex justifyContent='center' my='-200px'>
                    <TasksCardsIMG />
                </Flex>
            </Show>
            <Show breakpoint='(max-width: 500px)'>
                <Flex w='100%' mx='0' px='0' my='-500px'>
                    <MobileTasksCard />
                </Flex>
            </Show>

            <Flex px='50px' py='150px' w='100%' justifyContent='space-between' flexWrap='wrap' alignItems='center'>
                <Heading color='txtColor' fontWeight='700' fontSize='60px' maxW='400px' mb='30px'>
                    <Highlight query="customize" styles={{ color: 'txtY' }}>
                        Create and customize your tasks
                    </Highlight>
                </Heading>
                <SimpleGrid minChildWidth='300px' w='100%' maxW='800px' spacing={10} py='10px'>

                    <Flex w='100%' bgColor='compBg' p='20px' alignItems='center' borderRadius='10px' justifyContent='space-between'
                    >
                        <Flex alignItems='center'>
                            <FontAwesomeIcon icon={faList as IconProp} color='#d1d1d1' fontSize='35px' />
                            <Text fontWeight='bold' color='txtColor' ml='10px' fontSize='30px'>All Tasks</Text>
                        </Flex>
                    </Flex>
                    <Flex w='100%' bgColor='compBg' p='30px' alignItems='center' borderRadius='10px' justifyContent='space-between'

                    >
                        <Flex alignItems='center'>
                            <FontAwesomeIcon icon={faListCheck as IconProp} color='#d1d1d1' fontSize='35px' />
                            <Text fontWeight='bold' color='txtColor' ml='10px' fontSize='30px'>Done tasks</Text>
                        </Flex>
                    </Flex>
                    <Flex w='100%' bgColor='compBg' p='30px' alignItems='center' borderRadius='10px' justifyContent='space-between'

                    >
                        <Flex alignItems='center'>
                            <FontAwesomeIcon icon={faList12 as IconProp} color='#d1d1d1' fontSize='35px' />
                            <Text fontWeight='bold' color='txtColor' ml='10px' fontSize='30px'>Pending</Text>
                        </Flex>
                    </Flex>
                    <Flex w='100%' bgColor='compBg' p='20px' alignItems='center' borderRadius='10px' justifyContent='space-between'

                    >
                        <Flex alignItems='center'>
                            <FontAwesomeIcon icon={faCircleExclamation as IconProp} color='#d1d1d1' fontSize='35px' />
                            <Text fontWeight='bold' color='txtColor' ml='10px' fontSize='30px'>Important</Text>
                        </Flex>
                    </Flex>
                </SimpleGrid>
            </Flex>
            <Flex justifyContent='center' w='100%' p='50px'>
                <Text color='txtColor'>andre v lopes</Text>
            </Flex>

        </Container>
    )
}

export default Home
