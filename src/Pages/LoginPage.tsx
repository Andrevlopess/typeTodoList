import React, { useContext, useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { auth } from '../Services/Firebase';
import { Button, Center } from '@chakra-ui/react';
import { AuthContext } from '../Contexts/Auth/AuthContext';
import { AuthContextType } from '../types/Task';

type Props = {}

const LoginPage = (props: Props) => {

   
    const {signInWithGoogle} = useContext(AuthContext) as AuthContextType

    return (
        <Center w='100%' h='100vh'>
            <Button onClick={signInWithGoogle}>
                login with google
            </Button>
        </Center>
    )
}

export default LoginPage