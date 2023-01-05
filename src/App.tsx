import * as React from "react"
import { LightTheme } from './Themes/LightTheme'

import {
  Box,
  ChakraProvider,
} from "@chakra-ui/react"
import Header from "./Layout/Header"
import Footer from "./Layout/Footer"
import AddForm from "./Components/AddForm"
import Main from "./Layout/Main"

export const App = () => (
  <ChakraProvider theme={LightTheme}>
    <Header />
    <Main />
    <Footer />
  </ChakraProvider>
)
