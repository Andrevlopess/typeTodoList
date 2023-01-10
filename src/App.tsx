import * as React from "react"
import { LightTheme } from './Themes/LightTheme'
import './App.css'
import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Show,
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
          <Flex flexWrap='wrap'>
            <Show breakpoint="(min-width: 400px)">
              <Header />
            </Show>

            <Show breakpoint="(max-width: 400px)">
              <QueryHeader />
            </Show>

            <Main />
          </Flex>



        </Container>
      </TasksProvider>

    </ChakraProvider>
  </div>

)
