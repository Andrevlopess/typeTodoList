import * as React from "react"
import { LightTheme } from './Themes/LightTheme'
import './App.css'
import { TasksContext, TasksProvider } from "./Contexts/TaskContext"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import TasksPage from "./Pages/TasksPage";
import LoginPage from "./Pages/LoginPage";
import { AuthProvider } from "./Contexts/Auth/AuthContext";
import RequireAuth from "./Contexts/Auth/RequireAuth";

export const App = () => (

  <Router>
    <ChakraProvider theme={LightTheme}>
      <AuthProvider>
        <TasksProvider>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/tasks' element={<RequireAuth><TasksPage/></RequireAuth>} />
          </Routes>
        </TasksProvider>
      </AuthProvider>
    </ChakraProvider>
  </Router>

)
