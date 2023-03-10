import { useContext, useState } from "react";
import {
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Spinner,
    Text,
} from "@chakra-ui/react";
import { AuthContext } from "../Contexts/Auth/AuthContext";
import { AuthContextType } from "../types/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faEnvelope, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import GoogleLogo from "../Images/GoogleLogo.png";
import SimpleYList from "../Images/SimpleYList";
import ListLoginIMG from "../Images/ListLoginIMG";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

type Props = {};

const LoginPage = (props: Props) => {

    const { signInWithGoogle, signInWithEmail, signInLoading, signInError } = useContext(AuthContext) as AuthContextType;

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            signInWithEmail(values.email, values.password);
        },
    });

    return (
        <Container
            maxW="none"
            w="100%"
            minH="100vh"
            bgColor="desktopBg"
            m="0"
            p="0"
        >
            <Flex w="100%" justifyContent="space-between" mb="-100px">
                <Flex w="100%" p="50px" onClick={() => navigate("/")}>
                    <FontAwesomeIcon icon={faChevronLeft} color="#fff" fontSize="50px" />
                </Flex>
                <ListLoginIMG />
            </Flex>

            <Flex w="100%" flexWrap="wrap" justifyContent="center">
                <Flex flexDirection="column">
                    <Flex flexDirection="column" px="80px" alignItems='center'>
                        <Heading fontSize="5rem" color="txtY" fontWeight="800" mb="60px">
                            Sign in
                        </Heading>
                        <Text fontSize="30px" color="txtColor" fontWeight="800" mb="40px">
                            Login to access your tasks
                        </Text>
                    </Flex>
                    <Flex
                        bgColor="desktopBg"
                        p="10px"
                        px="20px"
                        mb='20px'
                        borderRadius="15px"
                        alignItems="center"
                        cursor="pointer"
                        justifyContent="center"
                        flexDirection='column'
                    >
                        <Text color='txtColor'>Dont have an account?</Text>
                        <Button bgColor='compBg' color='txtColor' my='10px'
                            onClick={() => navigate('/signUp')}
                        >Create account</Button>
                    </Flex>
                </Flex>
                <Flex
                    flexDirection="column"
                    bgColor="compBg"
                    borderRadius="25px"
                    p="60px"
                    ml="200px"
                    mx="30px"
                >
                    <Text color="txtColor" fontSize="30px">
                        Sign in
                    </Text>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit(e);
                        }}
                    >
                        <Flex flexDirection="column" my="15px">

                            <FormControl
                                isInvalid={signInError === 'auth/invalid-email'
                                    || signInError === 'auth/user-not-found'}>

                                <Text color="txtColor" pl="6px" py="10px">
                                    Email
                                </Text>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<FontAwesomeIcon icon={faEnvelope} color='#d1d1d1' />} />
                                    <Input
                                        required
                                        id='email'
                                        name='email'
                                        type="text"
                                        color="txtColor"
                                        border="none"
                                        bgColor="desktopBg"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                </InputGroup>

                                {signInError === 'auth/invalid-email' &&
                                    <FormErrorMessage>Invalid email</FormErrorMessage>
                                }
                                {signInError === 'auth/user-not-found' &&
                                    <FormErrorMessage>User not found</FormErrorMessage>
                                }
                            </FormControl>
                        </Flex>
                        <Flex flexDirection="column" my="15px">
                            <FormControl isInvalid={signInError === 'auth/wrong-password'}>
                                <Text color="txtColor" pl="6px" py="10px">
                                    Password
                                </Text>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<FontAwesomeIcon icon={faLock} color='#d1d1d1' />}
                                    />
                                    <Input
                                        required
                                        id='password'
                                        name='password'
                                        type={show ? "text" : "password"}
                                        color="txtColor"
                                        border="none"
                                        bgColor="desktopBg"
                                        autoComplete="on"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />
                                    <InputRightElement bgColor='transparent' onClick={handleClick}>
                                        {show ?
                                            <FontAwesomeIcon icon={faEyeSlash} color='#d1d1d1' />
                                            : <FontAwesomeIcon icon={faEye} color='#d1d1d1' />}
                                    </InputRightElement>
                                </InputGroup>


                                {signInError === 'auth/wrong-password' &&
                                    <FormErrorMessage>Wrong password</FormErrorMessage>
                                }
                            </FormControl>

                        </Flex>
                        <Flex flexDirection="column" my="15px">
                            <Button type="submit">
                                {signInLoading ?
                                    <Spinner color='desktopBg' boxSize='25px' />
                                    :
                                    "Sign in"
                                }
                            </Button>
                        </Flex>
                        <Text textAlign="center" color="txtColor">
                            or
                        </Text>
                        <Flex
                            my="15px"
                            bgColor="desktopBg"
                            p="10px"
                            px="20px"
                            borderRadius="15px"
                            alignItems="center"
                            onClick={signInWithGoogle}
                            cursor="pointer"
                        >
                            <Image src={GoogleLogo} boxSize="40px" />
                            <Text color="txtColor" pl="15px">
                                Sign in with Google
                            </Text>
                        </Flex>
                    </form>
                </Flex>
            </Flex>
            <Flex mt="20px">
                <SimpleYList />
            </Flex>
        </Container>
    );
};

export default LoginPage;
