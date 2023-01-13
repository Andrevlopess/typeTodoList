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
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

export const App = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={LightTheme}>
        <AuthProvider>
          <TasksProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/privatePage' element={<RequireAuth><TasksPage /></RequireAuth>} />
            </Routes>
          </TasksProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </Router>

)
