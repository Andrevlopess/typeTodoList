import {
    Box,
    ChakraProvider,
    Container,
    Flex,
    Grid,
    Image,
    Show,
    SimpleGrid,
    useMediaQuery,
} from "@chakra-ui/react"
import Header from "../Layout/Header"
import Main from "../Layout/Main"
import QueryHeader from "../Layout/QueryHeader"

type Props = {}

const TasksPage = (props: Props) => {
    return (

        <Container
            maxW='none'
            w='100%'
            minH='100vh'
            bgColor='desktopBg'
            m='0'
            p='0'
        >
            <Show breakpoint="(min-width: 500px)">
                <Flex w='100%'>
                    <Header />
                    <Main />
                </Flex>

            </Show>

            <Show breakpoint="(max-width: 500px)">
                <Flex w='100%' flexWrap='wrap'>
                    <QueryHeader />
                    <Main />
                </Flex>

            </Show>





        </Container>
    )
}

export default TasksPage