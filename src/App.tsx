import * as React from "react"
import { LightTheme } from './Themes/LightTheme'
import './App.css'
import {
  Box,
  ChakraProvider,
  Container,
} from "@chakra-ui/react"
import Header from "./Layout/Header"
import AddForm from "./Components/AddForm"
import Main from "./Layout/Main"
import { TasksContext, TasksProvider } from "./Contexts/TaskContext"

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
          display='flex'
        >

          <Header />
          <Main />

        </Container>
      </TasksProvider>

    </ChakraProvider>
  </div>

)
