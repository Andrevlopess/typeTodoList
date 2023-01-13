import React, { useContext } from 'react'
import LoginPage from '../../Pages/LoginPage'
import TasksPage from '../../Pages/TasksPage'
import { AuthContextType } from '../../types/Task'
import { AuthContext } from './AuthContext'

type Props = {}

const RequireAuth = ({ children }: { children: JSX.Element }) => {

  const { currentUser } = useContext(AuthContext) as AuthContextType

  
  if (!currentUser) {
    return <LoginPage />
  }

  return children
}

export default RequireAuth