import * as React from "react"
import { LightTheme } from './Themes/LightTheme'
import './App.css'
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
import Header from "./Layout/Header"
import Main from "./Layout/Main"
import { TasksContext, TasksProvider } from "./Contexts/TaskContext"
import QueryHeader from "./Layout/QueryHeader"

export const App = () => (

  <div className="App">
    <ChakraProvider theme={LightTheme}>
      <TasksProvider>
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
      </TasksProvider>

    </ChakraProvider>
  </div>

)
