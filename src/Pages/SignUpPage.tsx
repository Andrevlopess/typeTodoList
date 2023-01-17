import React, { useContext, useState } from "react";
import {
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Show,
  Spinner,
  Text,
} from "@chakra-ui/react";
import GoogleLogo from "../Images/GoogleLogo.png";
import SimpleYList from "../Images/SimpleYList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faEnvelope, faEye, faEyeSlash, faHome, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ListLoginIMG from "../Images/ListLoginIMG";
import { useFormik } from "formik";
import { AuthContext } from "../Contexts/Auth/AuthContext";
import { AuthContextType } from "../types/Task";
import { log } from "console";
import { useQueries, useQuery } from "react-query";
import { create } from "domain";
import SimpleListIMG from "../Images/SimpleListIMG";
import CheckListIMG from "../Images/CheckListIMG";
type Props = {};

const SignUpPage = (props: Props) => {
  const navigate = useNavigate();

  const { createUser, newUserError, newUserLoading } = useContext(AuthContext) as AuthContextType;

  const [confirmPassError, setconfirmPassError] = useState<boolean>(false)
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      if (values.password === values.confirmPassword) {
        createUser(values.email, values.password);
      } else {
        setconfirmPassError(true)
      }
    },
  });


  return (
    <Container
      maxW="none"
      w="100%"
      minH="100vh"
      bgColor="desktopBg"
      m="0"
      bgPosition="center"
      bgRepeat="no-repeat"
      p="0"
    >
      <Flex w="100%" alignItems='center' py='30px'>
        <Flex w="150px" p='10px' px='20px' mx='30px' onClick={() => navigate("/")} justifyContent='space-between' alignItems='center' bgColor='compBg' borderRadius='10px' h='fit-content'>
          <FontAwesomeIcon icon={faChevronLeft} color="#fff" fontSize="40px" />
          <Text color='txtColor' fontSize='20px'>Sign in</Text>
        </Flex>
      </Flex>
      <Flex w="100%" flexWrap="wrap" justifyContent="center">
        <Flex flexDirection="column">
          <Flex flexDirection="column" px="80px">
            <Text fontSize="5rem" color="txtY" fontWeight="900" mb="60px">
              Sign Up
            </Text>
            <Text fontSize="30px" color="txtColor" fontWeight="800" mb="80px">
              Register now!
            </Text>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          bgColor="compBg"
          borderRadius="25px"
          p="60px"
          ml="200px"
          maxH="500px"
          mx="30px"
        >
          <Text color="txtColor" fontSize="30px">
            Sign Up
          </Text>
          {/* // * FORM //////////////////////////////////////////////////////////////////////////////////// */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <FormControl

              isInvalid={
                newUserError === 'auth/email-already-in-use'
                || newUserError === 'auth/invalid-email'}>


              <Flex flexDirection="column" my="15px">
                <Text color="txtColor" pl="6px" py="10px">
                  Email
                </Text>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<FontAwesomeIcon icon={faEnvelope} color='#d1d1d1' />} />
                  <Input
                    required
                    color="txtColor"
                    border="none"
                    bgColor="desktopBg"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </InputGroup>

                {newUserError === 'auth/email-already-in-use' &&
                  <FormErrorMessage>Email already in use</FormErrorMessage>}
                {newUserError === 'auth/invalid-email' &&
                  <FormErrorMessage>Invalid email</FormErrorMessage>}

              </Flex>
            </FormControl>
            <FormControl isInvalid={newUserError === 'auth/weak-password'}>
              <Flex flexDirection="column" my="15px">
                <Text color="txtColor" pl="6px" py="10px">
                  Password
                </Text>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<FontAwesomeIcon icon={faLock} color='#d1d1d1' />}
                  />
                  <Input
                    id="passoword"
                    name="password"
                    type={show ? 'text' : 'password'}
                    autoComplete='on'
                    required
                    color="txtColor"
                    border="none"
                    bgColor="desktopBg"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <InputRightElement bgColor='transparent' onClick={handleClick}>

                    {show ?
                      <FontAwesomeIcon icon={faEyeSlash} color='#d1d1d1' />
                      : <FontAwesomeIcon icon={faEye} color='#d1d1d1' />}

                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage>Weak password</FormErrorMessage>
              </Flex>
            </FormControl>
            <FormControl isInvalid={confirmPassError}>
              <Flex flexDirection="column" my="15px">
                <Text color="txtColor" pl="6px" py="10px">
                  Confirm password
                </Text>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<FontAwesomeIcon icon={faLock} color='#d1d1d1' />}
                  />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={show ? 'text' : 'password'}
                    autoComplete='on'
                    required
                    color="txtColor"
                    border="none"
                    bgColor="desktopBg"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  <InputRightElement bgColor='transparent' onClick={handleClick}>

                    {show ?
                      <FontAwesomeIcon icon={faEyeSlash} color='#d1d1d1' />
                      : <FontAwesomeIcon icon={faEye} color='#d1d1d1' />}

                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>The password isn't the same</FormErrorMessage>
              </Flex>
            </FormControl>


            <Divider />
            <Button
              bgColor="desktopBg"
              color="txtColor"
              w="100%"
              py="5px"
              my="10px"
              _hover={{}}
              type="submit"
            >
              {newUserLoading ?
                <Spinner color='txtColor' boxSize='25px' />
                :
                'Create account'
              }
            </Button>


          </form>
        </Flex>
      </Flex>
    </Container>
  );
};

export default SignUpPage;
