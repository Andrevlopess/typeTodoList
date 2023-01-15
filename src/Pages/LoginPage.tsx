import React, { useContext, useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { auth } from '../Services/Firebase';
import { Button, Center, Container, Flex, Heading, Image, Input, Show, Text } from '@chakra-ui/react';
import { AuthContext } from '../Contexts/Auth/AuthContext';
import { AuthContextType } from '../types/Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import GoogleLogo from '../Images/GoogleLogo.png';
import SimpleYList from '../Images/SimpleYList';
import ListLoginIMG from '../Images/ListLoginIMG';
import { useNavigate } from 'react-router-dom';
type Props = {}

const LoginPage = (props: Props) => {


    const { signInWithGoogle } = useContext(AuthContext) as AuthContextType

    const navigate = useNavigate()

    return (
        <Container maxW='none' w='100%' minH='100vh' bgColor='desktopBg' m='0' p='0'>
            <Flex w='100%' justifyContent='space-between' mb='-100px'>
                <Flex w='100%' p='50px' onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faChevronLeft} color='#fff' fontSize='50px' />
                </Flex>
                <ListLoginIMG />
            </Flex>

            <Flex w='100%' flexWrap='wrap' justifyContent='center'>
                <Flex flexDirection='column' >
                    <Flex flexDirection='column' px='80px'>
                        <Heading fontSize='5rem' color='txtY' fontWeight='800' mb='60px'>Sign in</Heading>
                        <Text fontSize='30px' color='txtColor' fontWeight='800' mb='80px'>Login to access your tasks</Text>
                    </Flex>


                </Flex>
                <Flex flexDirection='column' bgColor='compBg' borderRadius='25px' p='60px' ml='200px' maxH='480px' mx='30px' z-index={999}>
                    <Text color='txtColor' fontSize='30px'>Sign in</Text>
                    <form>
                        <Flex flexDirection='column' my='15px' >
                            <Text color='txtColor' pl='6px' py='10px'>Email</Text>
                            <Input type='text' color='txtColor' border='none' bgColor='desktopBg' />
                        </Flex>
                        <Flex flexDirection='column' my='15px' >
                            <Text color='txtColor' pl='6px' py='10px'>Password</Text>
                            <Input type='password' color='txtColor' border='none' bgColor='desktopBg' />
                        </Flex>
                        <Text textAlign='center' color='txtColor'>or</Text>

                        <Flex my='15px' bgColor='desktopBg' p='10px' px='20px' borderRadius='15px' alignItems='center' onClick={signInWithGoogle} cursor='pointer'>
                            <Image src={GoogleLogo} boxSize='40px' />
                            <Text color='txtColor' pl='15px'>Sign in with Google</Text>
                        </Flex>
                    </form>
                </Flex>
            </Flex>
            <Flex mt='20px'>
                <SimpleYList />
            </Flex>
        </Container>
    )
}

export default LoginPage