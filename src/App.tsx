import * as React from "react"
import { LightTheme } from './Themes/LightTheme'
import './App.css'
import { TasksContext, TasksProvider } from "./Contexts/TaskContext"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider, Toast } from "@chakra-ui/react";
import TasksPage from "./Pages/TasksPage";
import LoginPage from "./Pages/LoginPage";
import { AuthProvider } from "./Contexts/Auth/AuthContext";
import RequireAuth from "./Contexts/Auth/RequireAuth";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./Pages/SignUpPage";

const queryClient = new QueryClient()

export const App = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={LightTheme}>
        <AuthProvider>
          <TasksProvider>
            <Toaster position="bottom-center" reverseOrder={true} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signUp' element={<SignUpPage />} />
              <Route path='/myTasks' element={<RequireAuth><TasksPage /></RequireAuth>} />
            </Routes>
          </TasksProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </Router>

)
