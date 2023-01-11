import * as React from "react"
import { LightTheme } from './Themes/LightTheme'
import './App.css'
import { TasksContext, TasksProvider } from "./Contexts/TaskContext"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import TasksPage from "./Pages/TasksPage";

export const App = () => (

    <Router>
      <ChakraProvider theme={LightTheme}>
        <TasksProvider>
        <Routes>
          <Route path='/' element={<TasksPage/>}/>
        </Routes>
        </TasksProvider>
      </ChakraProvider>
    </Router>

)
